import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { types as authenticationTypes, resolvers as authenticationResolvers } from '@vuelder.js/authorization-backend'
import { types as commonTypes, resolvers as commonResolvers } from '@vuelder.js/common-backend'
//import { types as openaiTypes, resolvers as openaiResolvers } from './modules/openai/index.js'

const mergedTypes = mergeTypeDefs([authenticationTypes, commonTypes])
const mergedResolvers = mergeResolvers([authenticationResolvers, commonResolvers])

export const types = mergedTypes
export const resolvers = mergedResolvers