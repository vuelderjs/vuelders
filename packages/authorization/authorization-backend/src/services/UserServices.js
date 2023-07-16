import dotenv from 'dotenv'
dotenv.config()

import { BadRequestError, BaseService, InternalServerError, JWT, NotFoundError } from "@vuelder.js/common-backend";
import UserRepository from "../repositories/UserRepository.js";
import bcrypt from 'bcrypt'


class UserService extends BaseService {
    static #repository
    constructor(repository, filters){
        super(repository, filters)
        UserService.#repository = repository
    }

    async update(id, upgrade){
        try {
            if(upgrade.password) upgrade.password = await bcrypt.hash(upgrade.password, 10)
            return await super.update(id, upgrade)
        } catch (error) {
            if(!(error instanceof InternalServerError)) throw error
            throw new InternalServerError({message: error.message, save: true})
        }
    }

    /**
     * Creates a new record in the database with the given username, email, and password.
     *
     * @param {Object} params - The parameters for creating the record.
     * @param {string} params.username - The username for the new record.
     * @param {string} params.email - The email for the new record.
     * @param {string} params.password - The password for the new record.
     * @return {Promise<Object>} A promise that resolves to the created record.
     */
    async createOne({username, email, password}){
        try {
            const cryptPassword = await bcrypt.hash(password, 10)
            return await super.createOne({
                username,
                email,
                password: cryptPassword
            })    
        } catch (error) {
            if(!(error instanceof InternalServerError)) throw error
            throw new InternalServerError({message: error.message, save: true})
        }
    }

    
    /**
     * Logs in a user and generates a token.
     *
     * @param {Object} user - An object containing the user's information.
     *                        - username (string): The username of the user.
     *                        - email (string): The email of the user.
     *                        - password (string): The password of the user.
     * @return {string} The generated token if the credentials are valid.
     * @throws {Error} If the credentials are invalid.
     */
    async loguinUserService({username, email, password}){
        try {
            let query = {}
            if(username) query = {username}
            if(email) query = {email}
            const user = await UserService.#repository.findOne(query)
            if(!user) throw new NotFoundError({message: 'User not found.'})
            if(await bcrypt.compare(password, user.password)){
                const jwt = new JWT()
                const token = jwt.generateToken({
                    id: user._id,
                    username: user.username,
                    email: user.email
                })
                return token
            }
            throw new BadRequestError({message: 'Invalid username or password.'})
        } catch (error) {
            if(!(error instanceof InternalServerError)) throw error
            throw new InternalServerError({message: error.message, save: true})
        }
    }
    async getUserFromToken(token){
        try {
            const jwt = new JWT()
            const {id} = jwt.verifyToken(token)
            return await UserService.#repository.findById(id)
        } catch (error) {
            if(!(error instanceof InternalServerError)) throw error
            throw new InternalServerError({message: error.message, save: true})
        }
    }

    /**
     * Retrieves permissions from a user token.
     *
     * @param {string} token - User token.
     * @return {Array} Permissions array.
     */
    async getPermissionsFromUserToken(token){
        try {
            const jwt = new JWT()
            const {id} = jwt.verifyToken(token)
            const user = await UserRepository.findById(id)
            if(!user || !user.role) throw new NotFoundError({message: 'User not found.'})
            return user.role.permissions ? user.role.permissions.map(p => p.name) : []
        } catch (error) {
            if(!(error instanceof InternalServerError)) throw error
            throw new InternalServerError({message: error.message, save: true})
        }
    }
}

export const {
    find : userFindService,
    findOne : userFindOneService,
    findById : userFindByIdService,
    paginate: userPaginateService,
    fetch: userFetchService,
    update: userUpdateService,
    deleteById: userDeleteByIdService,
    createOne: userCreateOneService,
    getPermissionsFromUserToken,
    getUserFromToken,
    loguinUserService,
} = new UserService(UserRepository)