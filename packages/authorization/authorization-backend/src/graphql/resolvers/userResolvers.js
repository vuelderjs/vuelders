import { GraphQLScalarType } from "graphql";

import { BaseMutations, BaseQueries, InternalServerError } from "@vuelder.js/common-backend";

import {
    userFindByIdService as findByIdService,
    userPaginateService as paginateService,
    userFetchService as fetchService,
    userUpdateService as updateService,
    userDeleteByIdService as deleteByIdService,
    userCreateOneService as createOneService,
    loginUserService,
    registerUserService
} from '../../services/UserServices.js'

import {
    findByIdMiddleware,
    paginateMiddleware,
    fetchMiddleware,
    updateMiddleware,
    deleteByIdMiddleware,
    createOneMiddleware
} from '../../middlewares/userMiddlewares.js'

class UserQueries extends BaseQueries{
    constructor(){
        super('user', {findByIdService, paginateService, fetchService}, {findByIdMiddleware, paginateMiddleware, fetchMiddleware})
    }
    
    async loginUser(_, {input: {email = null, username = null, password = null } }){
        return await loginUserService({email, username, password})
    }
}

class UserMutations extends BaseMutations{
    constructor(){
        super('user', {updateService, deleteByIdService, createOneService}, {updateMiddleware, deleteByIdMiddleware, createOneMiddleware})
    }

    async registerUser(_, {input: {username, email, password, completeName = null, dateBirth = null, phone = null}}){
        return await registerUserService({username, email, password, completeName, dateBirth, phone})
    }
}

export default {
    Query: new UserQueries(),
    Mutation: new UserMutations(),
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    })
}
