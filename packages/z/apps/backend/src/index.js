import GraphqlServer from './apollo-server.js';
import { types, resolvers } from './modules-merge.js'
import dotenv from 'dotenv'
import { mongoConnect } from './mongo-db.js';

import { init } from './init/index.js'

dotenv.config()

await mongoConnect()

await init()

const server = new GraphqlServer()

//define port
const { APP_PORT } = process.env
const port = APP_PORT ? APP_PORT : 4141

server.definePort(port)

//define types
server.defineTypes(types)

//define resolvers
server.defineResolvers(resolvers)

//create server
server.createServer()

//listen
server.listen()