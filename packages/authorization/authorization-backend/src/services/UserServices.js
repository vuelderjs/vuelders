import dotenv from 'dotenv'
dotenv.config()

import { BadRequestError, BaseService, ForbiddenError, InternalServerError, JWT, NotFoundError } from "@vuelder.js/common-backend";
import UserRepository from "../repositories/UserRepository.js";
import bcrypt from 'bcrypt'


class UserService extends BaseService {
    constructor(repository, filters){
        super(repository, filters)
        
        this.update = async(id, upgrade) => {
            try {
                if(upgrade.password) upgrade.password = await bcrypt.hash(upgrade.password, 10)
                return await repository.findByIdAndUpdate(id, upgrade)
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
        this.createOne = async ({username, email, password}) => {
            try {
                const cryptPassword = await bcrypt.hash(password, 10)
                return await repository.create({
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
        this.loginUserService = async ({username, email, password}) => {
            try {
                let query = {}
                if(username) query = {username}
                if(email) query = {email}
                const user = await repository.findOne(query)
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
        this.getUserFromToken = async (token) => {
            try {
                const jwt = new JWT()
                const {id} = jwt.verifyToken(token)
                return await repository.findById(id)
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
        this.getPermissionsFromUserToken = async (token) => {
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

        this.registerUserService = async ({username, email, password, completeName, phone}) => {
            const author = 'A custom user in register.'
            try {
                if(!/^[A-Za-z0-9]+$/.test(username)) 
                    throw new BadRequestError({message: 'invalid username.', author})
        
                if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
                    throw new BadRequestError({message: 'invalid email.', author})

                if(completeName && !/^[A-Za-z\s]+$/.test(completeName))
                    throw new BadRequestError({message: 'invalid completeName', author})

                const cryptPassword = await bcrypt.hash(password, 10)
                return await repository.create({
                    username,
                    email,
                    password: cryptPassword,
                    completeName,
                    phone
                })
            } catch (error) {
                if(error instanceof BadRequestError) throw error
                if(error instanceof repository.ValidationError) throw error
                throw new InternalServerError({message: error.message, author, save: true})
            }
        }
    }
}

export const {
    find : userFindService,
    findById : userFindByIdService,
    paginate: userPaginateService,
    fetch: userFetchService,
    update: userUpdateService,
    deleteById: userDeleteByIdService,
    createOne: userCreateOneService,
    getPermissionsFromUserToken,
    getUserFromToken,
    loginUserService,
    registerUserService
} = new UserService(UserRepository)