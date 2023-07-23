import { errorFindByIdService, errorPaginateService, errorUpdateService } from "../../services/ErrorServices.js"

export default {
    Query: {
        errorsPaginate: async (_, {input: {pageNumber = 1, itemsPerPage = 5, search = null, filters = null, orderBy = null, orderDesc = false}}) => {
            return await errorPaginateService({pageNumber, itemsPerPage, search, filters, orderBy, orderDesc})
        },
        errorsFindById: async (_, {id}) => {
            return await errorFindByIdService(id)
        }
    },
    Mutation: {
        errorsUpdateStatus: async (_, {id, status}) => {
            return await errorUpdateService(id, {status})
        }
    }
}