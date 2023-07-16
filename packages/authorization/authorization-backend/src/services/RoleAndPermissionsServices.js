import roleAndPermissionRepository from "../repositories/RoleAndPermissionsRepository.js"

class RoleAndPermissions {
    /**
     * Find a permission by its name.
     *
     * @param {string} name - The name of the permission to find.
     * @return {Promise} - A promise that resolves with the found permission.
     */
    async findPermissionByName(name){
        return await roleAndPermissionRepository.findPermissionByName(name)
    }
    
    /**
     * Finds a role by name.
     *
     * @param {string} name - The name of the role to find.
     * @return {Promise} A promise that resolves to the role object.
     */
    async findRoleByName(name){
        return await roleAndPermissionRepository.findRoleByName(name)
    }

    /**
     * Fetches the roles asynchronously.
     *
     * @return {Promise} The promise that resolves to the fetched roles.
     */
    async fetchRoles(){
        return await roleAndPermissionRepository.fetchRoles()
    }

    /**
     * Fetches permissions asynchronously.
     *
     * @return {Promise} A promise that resolves to the fetched permissions.
     */
    async fetchPermissions(){
        return await roleAndPermissionRepository.fetchPermissions()
    }

    /**
     * Finds a role by its ID.
     *
     * @param {number} id - The ID of the role.
     * @return {Promise} - A promise that resolves to the role with the given ID.
     */
    async findRoleById(id){
        return await roleAndPermissionRepository.findRoleById(id)
    }

    /**
     * Find a permission by its ID.
     *
     * @param {number} id - The ID of the permission.
     * @return {Promise} - A promise that resolves to the permission object.
     */
    async findPermissionById(id){
        return await roleAndPermissionRepository.findPermissionById(id)
    }

    /**
     * Creates a role.
     *
     * @param {type} role - the role to be created
     * @return {Promise} a promise that resolves with the created role
     */
    async createRole(role){
        return await roleAndPermissionRepository.createRole(role)
    }

    /**
     * Creates multiple permissions.
     *
     * @param {Array} permissions - An array of permissions.
     * @return {Promise} A promise that resolves to the created permissions.
     */
    async createManyPermissions(permissions = []){
        return await roleAndPermissionRepository.createManyPermissions(permissions)
    }

    /**
     * Create a new permission.
     *
     * @param {Object} permission - The permission to be created.
     * @return {Promise} - A promise that resolves with the created permission.
     */
    async createOnePermission(permission){
        return await roleAndPermissionRepository.createOnePermission(permission)
    }

/**
 * Assigns a permission to a role asynchronously.
 *
 * @param {Object} permission - The permission to assign.
 * @param {Object} role - The role to assign the permission to.
 * @return {Promise} A promise that resolves when the permission is assigned to the role.
 */
    async assignPermissionToRole({permission, role}){
        return await roleAndPermissionRepository.assignPermissionToRole({permission, role})
    }

    /**
     * Unassigns a permission to a role.
     *
     * @param {object} permission - The permission to unassign.
     * @param {object} role - The role to unassign the permission from.
     * @return {Promise} A promise that resolves when the permission is successfully unassigned.
     */
    async unassignPermissionToRole({permission, role}){
        return await roleAndPermissionRepository.unassignPermissionToRole({permission, role})
    }

    /**
     * Assigns a role to a user.
     *
     * @param {Object} role - The role to be assigned to the user.
     * @param {string} username - The username of the user.
     * @return {Promise} A promise that resolves when the role is successfully assigned to the user.
     */
    async assignRoleToUser({role, username}){
        return await roleAndPermissionRepository.assignRoleToUser({role, username})
    }

    /**
     * Deletes a permission.
     *
     * @param {Object} permission - The permission to be deleted.
     * @return {Promise} A promise that resolves when the permission is deleted.
     */
    async deletePermission({permission}){
        return await roleAndPermissionRepository.deletePermission({permission})
    }

    /**
     * Deletes the specified role.
     *
     * @param {object} role - The role to be deleted.
     * @return {Promise} A promise that resolves when the role is deleted.
     */
    async deleteRole({role}){
        return await roleAndPermissionRepository.deleteRole({role})
    }
}

const {
    findPermissionByName,
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
} = new RoleAndPermissions()

export {
    findPermissionByName,
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

