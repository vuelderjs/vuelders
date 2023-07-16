import {
    getPermissionsFromUserToken
} from '../services/UserServices.js'

import {
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    SHOW_USERS
} from '../permissions/index.js'

import { checkPermissions } from './permissionMiddlewares.js'

/**
 * Finds the user by ID and checks for the user's permissions.
 *
 * @param {object} req - The request object.
 * @param {string} req.token - The user token.
 * @throws {Error} If the token is not received in the request options.
 * @throws {Error} If the user has insufficient permissions.
 */
export const findByIdMiddleware = async (req) => {
    return await checkPermissions(req, [SHOW_USERS])
}

export const paginateMiddleware = async (req) => {
    return await checkPermissions(req, [SHOW_USERS])
}

export const fetchMiddleware = async (req) => {
    return await checkPermissions(req, [SHOW_USERS])
}

export const updateMiddleware = async (req) => {
    return await checkPermissions(req, [UPDATE_USER])
}

export const deleteByIdMiddleware = async (req) => {
    return await checkPermissions(req, [DELETE_USER])
}

export const createOneMiddleware = async (req) => {
    return await checkPermissions(req, [CREATE_USER])
}