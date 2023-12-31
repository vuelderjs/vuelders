import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { types as authenticationTypes, resolvers as authenticationResolvers } from '@vuelder.js/authorization-backend'
//import { types as clientTypes, resolvers as clientResolvers } from './modules/clients/index.js'
//import { types as openaiTypes, resolvers as openaiResolvers } from './modules/openai/index.js'

const mergedTypes = mergeTypeDefs([authenticationTypes])
const mergedResolvers = mergeResolvers([authenticationResolvers])

export const types = mergedTypes
export const resolvers = mergedResolvers