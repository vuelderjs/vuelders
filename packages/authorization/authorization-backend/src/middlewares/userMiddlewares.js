import {
    getRoleFromUserTokenService
} from '../services/UserServices.js'

export const findByIdMiddleware = async (req) => {
    if(!req || !req.user || !req.user.token) throw Error('Token user is not received in req options')
    if(!['ADMIN'].includes(await getRoleFromUserTokenService(req.user.token))) throw new Error('insufficient permissions')
}

export const paginateMiddleware = async (req) => {
    if(!req || !req.user || !req.user.token) throw Error('Token user is not received in req options')
    if(!['ADMIN'].includes(await getRoleFromUserTokenService(req.user.token))) throw new Error('insufficient permissions')
}

export const fetchMiddleware = async (req) => {
    if(!req || !req.user || !req.user.token) throw Error('Token user is not received in req options')
    if(!['ADMIN'].includes(await getRoleFromUserTokenService(req.user.token))) throw new Error('insufficient permissions')
}

export const updateMiddleware = async (req) => {
    if(!req || !req.user || !req.user.token) throw Error('Token user is not received in req options')
    if(!['ADMIN'].includes(await getRoleFromUserTokenService(req.user.token))) throw new Error('insufficient permissions')
}

export const deleteByIdMiddleware = async (req) => {
    if(!req || !req.user || !req.user.token) throw Error('Token user is not received in req options')
    if(!['ADMIN'].includes(await getRoleFromUserTokenService(req.user.token))) throw new Error('insufficient permissions')
}

export const createOneMiddleware = async (req) => {
    if(!req || !req.user || !req.user.token) throw Error('Token user is not received in req options')
    if(!['ADMIN'].includes(await getRoleFromUserTokenService(req.user.token))) throw new Error('insufficient permissions')
}