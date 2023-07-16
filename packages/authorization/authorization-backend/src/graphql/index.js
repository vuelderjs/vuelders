import path from 'path'
import { fileURLToPath } from 'url'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import userResolvers from './resolvers/userResolvers.js'
import roleAndPermissionsResolvers from './resolvers/roleAndPermissionsResolvers.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const typeDefsArray = loadFilesSync(path.join(__dirname, './types'))

const mergedTypes = mergeTypeDefs(typeDefsArray)

const mergedResolvers = mergeResolvers([userResolvers, roleAndPermissionsResolvers])

export const types = mergedTypes
export const resolvers = mergedResolvers