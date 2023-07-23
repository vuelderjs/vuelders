import {types, resolvers} from './graphql/index.js'

import {findByIdMiddleware, paginateMiddleware, fetchMiddleware, updateMiddleware, deleteByIdMiddleware, createOneMiddleware} from './middlewares/userMiddlewares.js'

import User from './models/User.js'
import Role from './models/Role.js'
import Permission from './models/Permission.js'

import UserRepository from './repositories/UserRepository.js'
import RoleAndPermissionsRepository from './repositories/RoleAndPermissionsRepository.js'

import {
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    SHOW_USERS,
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    SHOW_ROLES,
    CREATE_PERMISSION,
    UPDATE_PERMISSION,
    DELETE_PERMISSION,
    SHOW_PERMISSIONS,
} from './permissions/index.js'


import {
    userFindService, 
    userFindByIdService, 
    userPaginateService, 
    userFetchService, 
    userUpdateService, 
    userDeleteByIdService,
    userCreateOneService,
    getPermissionsFromUserToken,
    loginUserService } from './services/UserServices.js'

import {
    findRoleByName,
    fetchRoles,
    fetchPermissions,
    findRoleById,
    findPermissionById,
    createRole,
    createManyPermissions,
    createOnePermission,
    assignPermissionToRole,
    unassignPermissionToRole,
    assignRoleToUser,
    deletePermission,
    deleteRole
} from './services/RoleAndPermissionsServices.js'

export {
    // TYPES & RESOLVERS
    types, resolvers,

    // MIDDLEWARES
    findByIdMiddleware, paginateMiddleware, fetchMiddleware, updateMiddleware, deleteByIdMiddleware, createOneMiddleware,

    // MODELS
    User,
    Role,
    Permission,

    // PERMISSIONS
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    SHOW_USERS,
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    SHOW_ROLES,
    CREATE_PERMISSION,
    UPDATE_PERMISSION,
    DELETE_PERMISSION,
    SHOW_PERMISSIONS,

    // REPOSITORIES
    UserRepository,
    RoleAndPermissionsRepository,

    // SERVICES
    userFindService, 
    userFindByIdService, 
    userPaginateService, 
    userFetchService, 
    userUpdateService, 
    userDeleteByIdService,
    userCreateOneService,
    getPermissionsFromUserToken,
    loginUserService,

    findRoleByName,
    fetchRoles,
    fetchPermissions,
    findRoleById,
    findPermissionById,
    createRole,
    createManyPermissions,
    createOnePermission,
    assignPermissionToRole,
    unassignPermissionToRole,
    assignRoleToUser,
    deletePermission,
    deleteRole
}