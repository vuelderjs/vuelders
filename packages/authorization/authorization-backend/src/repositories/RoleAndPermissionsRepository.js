import Permission from '../models/Permission.js'
import Role from '../models/Role.js'
import userRepository from './UserRepository.js'

class RoleAndPermissionRepository{
    async findRoleByName(name){
        return await Role.findOne({name: name})
    }

    async findPermissionByName(name){
        return await Permission.findOne({name: name})
    }

    async fetchRoles(){
        return await Role.find().populate('permissions')
    }

    async fetchPermissions(){
        return await Permission.find()
    }

    async findRoleById(id){
        return await Role.findById(id).populate('permissions')
    }

    async findPermissionById(id){
        return await Permission.findById(id)
    }

    async createRole(role){
        const roleCreated = new Role({
            name: role
        })

        return await roleCreated.save()
    }

    /**
     * Creates multiple permissions.
     *
     * @param {array} permissions - An array of permission names.
     * @return {array} An array of permissions created.
     */
    async createManyPermissions(permissions = []){

        const permissionsCreated = []

        for(let i = 0; i < permissions.length; i++){
            if(!(await this.findPermissionByName(permissions[i]))){
                const permission = new Permission({
                    name: permissions[i]
                })
    
                await permission.save()
    
                permissionsCreated.push(permission)
            }
        }

        return permissionsCreated
    }

    async createOnePermission(permission){
        const permissionCreated = new Permission({
            name: permission
        })

        return await permissionCreated.save()
    }

    /**
     * Assigns a permission to a role.
     *
     * @param {Object} permission - The permission object to assign.
     * @param {Object} role - The role object to assign the permission to.
     * @throws {Error} If the permission does not exist.
     * @throws {Error} If the role does not exist.
     * @return {Promise} A promise that resolves to the updated role object with the assigned permission.
     */
    async assignPermissionToRole({permission, role}){
        const assignedPermission = await Permission.findOne({ name: permission })
        if(!assignedPermission) throw new Error('Permission has not exist.')
        const assignedRole = await Role.findOne({name: role})
        if(!assignedRole) throw new Error('Role has not exist.')

        if(assignedRole.permissions.includes(assignedPermission._id)) return assignedRole
        
        assignedRole.permissions.push(assignedPermission._id)
        await assignedRole.save()
        return await Role.findById(assignedRole._id).populate('permissions')
    }

    /**
     * Unassigns a permission from a role.
     *
     * @param {Object} options - The options object.
     * @param {string} options.permission - The name of the permission to unassign.
     * @param {string} options.role - The name of the role to unassign the permission from.
     * @throws {Error} If the permission does not exist.
     * @throws {Error} If the role does not exist or does not contain the permission.
     * @return {Promise<Role>} The updated role object with populated permissions.
     */
    async unassignPermissionToRole({permission, role}){
        const unassignPermission = await Permission.findOne({ name: permission })
        if(!unassignPermission) throw new Error('Permission has not exist.')
        const focusRole = await Role.findOne({ name: role, permissions: { $in: [unassignPermission._id] } })
        if(!focusRole) throw new Error(`${role} Role has not exist or not contain ${permission} permission.`)
        focusRole.permissions.splice(focusRole.permissions.indexOf(unassignPermission._id), 1)
        await focusRole.save()
        return await Role.findById(focusRole._id).populate('permissions')
    }

    /**
     * Assigns a role to a user.
     *
     * @param {Object} options - The options for assigning the role.
     * @param {string} options.role - The role to assign to the user.
     * @param {string} options.username - The username of the user.
     * @return {Promise<Object>} The updated user object with the assigned role.
     */
    async assignRoleToUser({role, username}){
        const user = await userRepository.getUserByUsername({username})
        const assignedRole = await Role.findOne({name: role})
        user.role = assignedRole._id
        await user.save()
        return await userRepository.getUserByUsername({username})
    }

    /**
     * Deletes a permission from the database.
     *
     * @param {Object} permission - The permission object to delete.
     * @throws {Error} Throws an error if the permission does not exist.
     * @return {Object} The deleted permission object.
     */
    async deletePermission({permission}){
        const deletedPermission = await Permission.findOneAndDelete({name: permission})
        if(!deletedPermission) throw new Error('Permission has not exist.')
        const rolesWithPermission = await Role.find({permissions: { $in: [deletedPermission._id] }})
        for(let i = 0; i < rolesWithPermission.length; i++){
            rolesWithPermission[i].permissions.splice(
                rolesWithPermission[i].permissions.indexOf(deletedPermission._id),
                1
            )
            await rolesWithPermission[i].save()
        }
        return deletedPermission
    }

    /**
     * Deletes a role from the database.
     *
     * @param {Object} role - The role object to be deleted.
     * @return {Object} - The deleted role object.
     * @throws {Error} - If the role does not exist.
     */
    async deleteRole({role}){
        const deletedRole = await Role.findOneAndDelete({name: role}).populate('permissions')
        if(!deletedRole) throw new Error('Role has not exist.')
        await userRepository.deleteRoleInUsersWithRole({roleId: deletedRole._id})
        return deletedRole
    }
}

export default new RoleAndPermissionRepository()