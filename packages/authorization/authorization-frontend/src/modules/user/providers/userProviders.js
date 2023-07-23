import {gql} from 'graphql-tag'

import registerUser from './gql/registerUser.graphql'
import loginUser from './gql/loginUser.graphql'

class UserProviders{
    constructor(){
        this.graphqlClient = null
    }

    setGraphqlClient(gql){
        this.graphqlClient = gql
    }

    registerUser(input){
        return this.graphqlClient.mutate({
            mutation: gql`${registerUser}`,
            variables: {input}
        })
    }

    loginUser(input){
        return this.graphqlClient.query({
            query: gql`${loginUser}`,
            variables: {input}
        })
    }
}

export default new UserProviders()