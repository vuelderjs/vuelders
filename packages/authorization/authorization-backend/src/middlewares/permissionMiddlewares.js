import { NotFoundError, ForbiddenError, InternalServerError, BadRequestError, ConflictError, TimeoutError, UnauthorizedError, ValidationError } from "@vuelder.js/common-backend"
import { getPermissionsFromUserToken, getUserFromToken } from "../services/UserServices.js"

export const checkPermissions = async (req, permissions = []) => {
    if(!req || !req.token) throw NotFoundError({message: 'Token user is not received in req options.'})
    const user = await getUserFromToken(req.token)
    if(!user) throw NotFoundError({message: 'User not found'})
    for(const permission of permissions){
        if(!(await getPermissionsFromUserToken(req.token)).includes(permission)) throw new ForbiddenError({message: 'insufficient permissions', author: user.id})
    }
    return true
}

export const checkInternalServerError = async (req, error) => {
    if(!req || !req.token) throw NotFoundError({message: 'Token user is not received in req options.'})
    for(const ErrorInsance of [BadRequestError, ConflictError, ForbiddenError, NotFoundError, TimeoutError, UnauthorizedError, ValidationError]){
        if(error instanceof ErrorInsance) throw error
    }
    const user = await getUserFromToken(req.token)
    if(!user) throw new InternalServerError({message: error.message, save: true})
    throw new InternalServerError({message: error.message, author: user.id, save: true})
}