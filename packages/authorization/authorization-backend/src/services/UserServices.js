import dotenv from 'dotenv'
dotenv.config()

import { BaseService, JWT } from "@vuelders/common-backend";
import UserRepository from "../repositories/UserRepository.js";
import bcrypt from 'bcrypt'


class UserService extends BaseService {
    static #repository
    constructor(repository, filters){
        super(repository, filters)
        UserService.#repository = repository
    }

    async createOne({username, email, password}){
        const cryptPassword = await bcrypt.hash(password, 10)
        await UserService.#repository.create({
            username,
            email,
            password: cryptPassword
        })
    }

    async loguinUserService({username, email, password}){
        let query = {}
        if(username) query = {username}
        if(email) query = {email}
        const user = await UserService.#repository.findOne(query)
        if(await bcrypt.compare(password, user.password)){
            const jwt = new JWT()
            const token = jwt.generateToken({
                id: user._id,
                username: user.username,
                email: user.email
            })
            return token
        }
        throw new Error('Invalid Credentials.')
    }

    async getRoleFromUserTokenService(token){
        const jwt = new JWT()
        const {_id} = jwt.verifyToken(token)
        const user = await this.findById(_id)
        return user.role
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
    getRoleFromUserTokenService,
    loguinUserService,
} = new UserService(UserRepository)