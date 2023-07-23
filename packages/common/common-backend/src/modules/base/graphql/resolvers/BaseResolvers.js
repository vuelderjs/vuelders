class BaseQueries{
    constructor(name, input, middlewares){
        if(!name) throw new Error('Name is not provided')
        if(!input) throw new Error('input is not provided')
        if(typeof input !== 'object' || !Object.keys(input).includes('fetchService') || !Object.keys(input).includes('findByIdService') || !Object.keys(input).includes('paginateService'))
            throw new Error('input must be a object with keys ["fetchService", "findByIdService", "paginateService"]')
        const {fetchService, findByIdService, paginateService} = input
        
        this[`${name}FindById`] = async (_, {id}, req) => {
            try {
                if(middlewares && middlewares.findByIdMiddleware) await middlewares.findByIdMiddleware(req)
                return await findByIdService(id)
            } catch (error) {
                if(!(error instanceof InternalServerError)) throw error
                throw new InternalServerError({message: error.message, save: true})
            }
        }

        this[`${name}Fetch`] = async (_, __, req) => {
            try {
                if(middlewares && middlewares.fetchMiddleware) await middlewares.fetchMiddleware(req)
                return await fetchService()
            } catch (error) {
                if(!(error instanceof InternalServerError)) throw error
                throw new InternalServerError({message: error.message, save: true})
            }
        }

        this[`${name}Paginate`] = async (_, {input}, req) => {
            try {
                if(middlewares && middlewares.paginateMiddleware) await middlewares.paginateMiddleware(req)
                return await paginateService(input)
            } catch (error) {
                if(!(error instanceof InternalServerError)) throw error
                throw new InternalServerError({message: error.message, save: true})
            }
        }
    }
}

class BaseMutations{
    constructor(name, input, middlewares){
        if(!name) throw new Error('Name is not provided')
        if(!input) throw new Error('input is not provided')
        if(typeof input !== 'object' || !Object.keys(input).includes('createOneService') || !Object.keys(input).includes('updateService') || !Object.keys(input).includes('deleteByIdService'))
            throw new Error('input must be a object with keys ["createOneService", "updateService", "deleteByIdService"]')
        const {createOneService, updateService, deleteByIdService} = input
        
        this[`${name}CreateOne`] = async (_, {input}, req) => {
            try {
                if(middlewares && middlewares.createOneMiddleware) await middlewares.createOneMiddleware(req)
                return await createOneService(input)
            } catch (error) {
                if(!(error instanceof InternalServerError)) throw error
                throw new InternalServerError({message: error.message, save: true})
            }
        }

        this[`${name}Update`] = async (_,{id, upgrade}, req) => {
            try {
                if(middlewares && middlewares.updateMiddleware) await middlewares.updateMiddleware(req)
                return await updateService(id, upgrade)
            } catch (error) {
                if(!(error instanceof InternalServerError)) throw error
                throw new InternalServerError({message: error.message, save: true})
            }
        }

        this[`${name}DeleteById`] = async (_, {id}, req) => {
            try {
                if(middlewares && middlewares.deleteByIdMiddleware) await middlewares.deleteByIdMiddleware(req)
                return await deleteByIdService(id)
            } catch (error) {
                if(!(error instanceof InternalServerError)) throw error
                throw new InternalServerError({message: error.message, save: true})
            }
        }
    }
}

export {
    BaseQueries, BaseMutations
}