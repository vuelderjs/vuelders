import errorsPaginate from './gql/errorsPaginate.graphql'
import errorsFindById from './gql/errorsFindById.graphql'
import errorsUpdateStatus from './gql/errorsUpdateStatus.graphql'

import { gql } from 'graphql-tag'

class ErrorProvider{
    constructor(){
        this.graphqlClient = null
    }

    setGraphqlClient(gqlc){
        this.graphqlClient = gqlc
    }

    errorsPaginate(input){
        return this.graphqlClient.query({
            query: gql`${errorsPaginate}`,
            fetchPolicy: "network-only",
            variables: { input: input }
        })
    }

    errorsFindById(id){
        return this.graphqlClient.query({
            query: gql`${errorsFindById}`,
            fetchPolicy: "network-only",
            variables: { id: id }
        })
    }

    errorsUpdateStatus(id, status){
        return this.graphqlClient.mutate({
            mutation: gql`${errorsUpdateStatus}`,
            variables: {id, status}
        })
    }
}

export default new ErrorProvider()