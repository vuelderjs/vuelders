import { BaseRepository } from "@vuelder.js/common-backend";
import User from '../models/User.js'

class UserRepository extends BaseRepository{
    constructor(Model, populate = []){
        super(Model, populate)
    }

    /**
     * Retrieves a user by their username.
     *
     * @param {string} username - The username of the user.
     * @return {Promise} Returns a Promise that resolves to the user object.
     * @throws {Error} Throws an error if the username is not provided or is not a string.
     * @throws {Error} Throws an error if the user is not found.
     */
    async getUserByUsername({username}){
        if(!username || typeof(username) != 'string') throw new Error('username must contain a data of string type.')
        const user = await User.findOne({username}).populate('role').populate({
            path: 'role',
            populate: {
                path: 'permissions',
                model: 'Permission'
            }
        })
        if(!user) throw new Error('User not found.')
        return user
    }

    /**
     * Deletes the specified role from all users who have that role.
     *
     * @param {Object} roleId - The ID of the role to be deleted.
     * @return {Array} An array of updated user objects.
     */
    async deleteRoleInUsersWithRole({roleId}){
        const users = await User.find({role: roleId})
        const updatedUsers = await Promise.all(users.map(async (user) => {
            return await User.findByIdAndUpdate(user._id, {$unset: {role: 1}}, {new: true})
        }))

        return updatedUsers
    }
}

export default new UserRepository(User,[
    'role',
    {
        path: 'role',
        populate: {
            path: 'permissions',
            model: 'Permission'
        }
    }
])

export { UserRepository }