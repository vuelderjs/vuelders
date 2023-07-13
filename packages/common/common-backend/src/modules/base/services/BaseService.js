

class BaseService {
    static #repository
    static #filters

    constructor(repository, filters){
        BaseService.#repository = repository
        BaseService.#filters = filters ? filters : query => query
    }

    async findById(id){
        try {
            return await BaseService.#repository.findById(id)
        } catch (error) {
            throw error
        }
    }

    async find(query){
        try {
            return await BaseService.#repository.find(query)
        } catch (error) {
            throw error   
        }
    }

    async paginate({pageNumber = 1, itemsPerPage = 5, search = null, filters = null, orderBy = null, orderDesc = false}){
        try {
            const options = {
                page: pageNumber,
                limit: itemsPerPage,
                sort: orderBy ? { [orderBy]: orderDesc ? - 1 : 1 } : null
            }
    
            let query = {}
    
            if (search){
                query.value = { $regex: search, $options: 'i'  }
            }
    
            if (filters){
                query = BaseService.#filters(query, filters)
            }
    
            return await BaseService.#repository.paginate(query, options)
        } catch (error) {
            throw error
        }
    }

    async fetch(){
        try {
            return await BaseService.#repository.find({})
        } catch (error) {
            throw error
        }
    }

    async update(id, upgrade){
        try {
            return await BaseService.#repository.findByIdAndUpdate(id, upgrade)
        } catch (error) {
            throw error
        }
    }

    async deleteById(id){
        try {
            return await BaseService.#repository.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }

    async createOne(doc){
        try {
            return await BaseService.#repository.createOne(doc)
        } catch (error) {
            throw error
        }
    }
}

export default BaseService