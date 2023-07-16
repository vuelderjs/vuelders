import {
    fetchRoles,
    fetchPermissions,
    findRoleById,
    findPermissionById,
    createRole,
    assignPermissionToRole,
    unassignPermissionToRole,
    assignRoleToUser,
    deleteRole
} from '../../services/RoleAndPermissionsServices.js'

import {
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    SHOW_ROLES,
    SHOW_PERMISSIONS,
    UPDATE_USER
} from '../../permissions/index.js'

import { checkInternalServerError, checkPermissions } from '../../middlewares/permissionMiddlewares.js'

class RoleAndPermissionsQueries {
    async fetchRoles(_, __, req){
        try {
            await checkPermissions(req, [SHOW_ROLES])
            return await fetchRoles()
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }

    async fetchPermissions(_, __, req){
        try {
            await checkPermissions(req, [SHOW_PERMISSIONS])
            return await fetchPermissions()
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }

    async findRoleById(_, {id}, req){
        try {
            await checkPermissions(req, [SHOW_ROLES])
            return await findRoleById(id)
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }

    async findPermissionById(_, {id}, req){
        try {
            await checkPermissions(req, [SHOW_PERMISSIONS])
            return await findPermissionById(id)
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }
}

class RoleAndPermissionsMutations {
    async createRole(_, {role}, req){
        try {
            await checkPermissions(req, [CREATE_ROLE])
            return await createRole(role)
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }

    async assignPermissionToRole(_, {permission, role}, req){
        try {
            await checkPermissions(req, [UPDATE_ROLE])
            return await assignPermissionToRole({permission, role})
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }

    async unassignPermissionToRole(_, {permission, role}, req){
        try {
            await checkPermissions(req, [UPDATE_ROLE])
            return await unassignPermissionToRole({permission, role})
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }

    async assignRoleToUser(_, {role, username}, req){
        try {
            await checkPermissions(req, [UPDATE_USER])
            return await assignRoleToUser({role, username})
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }

    async deleteRole(_, {role}, req){
        try {
            await checkPermissions(req, [DELETE_ROLE])
            return await deleteRole({role})
        } catch (error) {
            return await checkInternalServerError(req, error)
        }
    }
}

export default {
    Query: new RoleAndPermissionsQueries(),
    Mutation: new RoleAndPermissionsMutations()
}