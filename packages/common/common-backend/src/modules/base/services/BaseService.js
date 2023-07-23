

class BaseService {
    constructor(repository, filters){
        
        if(!repository) throw new Error('Base Service must need a repository at first parameter.')

        filters = filters ? filters : query => query

        this.findById = async (id) => {
            try {
                return await repository.findById(id)
            } catch (error) {
                throw error
            }
        }

        this.find = async (query) => {
            try {
                return await repository.find(query)
            } catch (error) {
                throw error   
            }
        }

        this.paginate = async ({pageNumber = 1, itemsPerPage = 5, search = null, filters = null, orderBy = null, orderDesc = false}) => {
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
        
                return await repository.paginate(query, options)
            } catch (error) {
                throw error
            }
        }

        this.fetch = async () => {
            try {
                return await repository.find({})
            } catch (error) {
                throw error
            }
        }

        this.update = async (id, upgrade) => {
            try {
                return await repository.findByIdAndUpdate(id, upgrade)
            } catch (error) {
                throw error
            }
        }

        this.deleteById = async (id) => {
            try {
                return await repository.findByIdAndDelete(id)
            } catch (error) {
                throw error
            }
        }

        this.createOne = async (doc) => {
            try {
                return await repository.create(doc)
            } catch (error) {
                throw error
            }
        }
    }
}

export default BaseService