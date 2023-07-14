import {types, resolvers} from './graphql/index.js'

import {findByIdMiddleware, paginateMiddleware, fetchMiddleware, updateMiddleware, deleteByIdMiddleware, createOneMiddleware} from './middlewares/userMiddlewares.js'

import User from './models/User.js'

import UserRepository from './repositories/UserRepository.js'

import {ADMIN, PREMIUM_USER, COMMON_USER} from './roles/index.js'

const Roles = {ADMIN, PREMIUM_USER, COMMON_USER}

//example fix

import {
    userFindService, 
    userFindOneService, 
    userFindByIdService, 
    userPaginateService, 
    userFetchService, 
    userUpdateService, 
    userDeleteByIdService,
    userCreateOneService,
    getRoleFromUserTokenService,
    loguinUserService } from './services/UserServices.js'

export {
    // TYPES & RESOLVERS
    types, resolvers,

    // MIDDLEWARES
    findByIdMiddleware, paginateMiddleware, fetchMiddleware, updateMiddleware, deleteByIdMiddleware, createOneMiddleware,

    // MODELS
    User,

    // REPOSITORIES
    UserRepository,

    // ROLES
    Roles,

    // SERVICES
    userFindService, 
    userFindOneService, 
    userFindByIdService, 
    userPaginateService, 
    userFetchService, 
    userUpdateService, 
    userDeleteByIdService,
    userCreateOneService,
    getRoleFromUserTokenService,
    loguinUserService
}