import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {GqlErrorLog, GqlResponseLog, DefaultLogger as winston} from "./modules/logger/index.js";
import express from 'express'
import http from 'http'

class GraphqlServer {
  constructor(){
    if(GraphqlServer._instance) return GraphqlServer._instance
    GraphqlServer.app = express()
    GraphqlServer.httpServer = http.createServer(GraphqlServer.app)
    GraphqlServer._instance = this
  }

  deleteInstance(){
    GraphqlServer._instance = null
    GraphqlServer.app = null
    GraphqlServer.httpServer = null
    GraphqlServer.port = null
    GraphqlServer.types = null
    GraphqlServer.resolvers = null
    GraphqlServer.server = null
  }

  definePort(port){
    if(!port || isNaN(port) || port < 0 || port % 1 != 0) throw new Error('Port must been declared with definePort method after listen method.')
    GraphqlServer.port = port
  }
  defineTypes(types){
    if(!types || typeof types != 'object' && typeof types != 'string') throw new Error('Types must been a string type.')
    
    GraphqlServer.types = types
  }
  defineResolvers(resolvers){
    if(!resolvers) throw new Error('Resolvers must been declared')
    if(typeof resolvers != 'object') throw new Error('resolvers must been an object type')
    if(Object.keys(resolvers).length === 0) throw new Error('resolvers musnt be a empty object')
    GraphqlServer.resolvers = resolvers
  }

  createServer(){
    if(!GraphqlServer.types) throw new Error('Types must been declared with defineTypes method before createServer method.')
    if(!GraphqlServer.resolvers) throw new Error('Resolvers must been declared with defineResolvers method before createServer method.')
    GraphqlServer.server = new ApolloServer({
      typeDefs: GraphqlServer.types,
      resolvers: GraphqlServer.resolvers,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: GraphqlServer.httpServer }),
        {
            requestDidStart(requestContext) {
                return {
                    didEncounterErrors(requestContext) {
                        GqlErrorLog(requestContext)
                    },
                    willSendResponse(requestContext) {
                        GqlResponseLog(requestContext)
                    }
                }
            }
        }
    ]
    })
  }

  async listen(){
    if(!GraphqlServer.server) throw new Error('Server must been created with createServer method before listen method.')
    if(!GraphqlServer.port) throw new Error('Port must been declared with definePort method before listen method.')

    await GraphqlServer.server.start()

    GraphqlServer.app.use(
      '/graphql',
      express.json(),
      expressMiddleware(GraphqlServer.server, {
        context: async ({req}) => ({
          token: req.headers.token
        })
      })
    )

    await new Promise((resolve) => GraphqlServer.httpServer.listen({port: GraphqlServer.port}, resolve))

    winston.info(`🚀  Server ready at: http://localhost:${GraphqlServer.port}/graphql`)
  }

  async stop(){
    if(!GraphqlServer.server) throw new Error('Server must been created with createServer method before listen method.')
    if(!GraphqlServer.port) throw new Error('Port must been declared with definePort method before listen method.')

    const stopped = await GraphqlServer.httpServer.close()
  }
}

export default GraphqlServer    