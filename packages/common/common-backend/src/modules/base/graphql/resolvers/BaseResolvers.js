class BaseQueries{
    static #name
    constructor(name, input, middlewares){
        if(!name) throw new Error('Name is not provided')
        if(!input) throw new Error('input is not provided')
        if(typeof input !== 'object' || !Object.keys(input).includes('fetchService') || !Object.keys(input).includes('findByIdService') || !Object.keys(input).includes('paginateService'))
            throw new Error('input must be a object with keys ["fetchService", "findByIdService", "paginateService"]')
        const {fetchService, findByIdService, paginateService} = input
        BaseQueries.#name = name
        
        this[`${BaseQueries.#name}FindById`] = async (_, {id}, req) => {
            if(middlewares && middlewares.findByIdMiddleware) await middlewares.findByIdMiddleware(req)
            return await findByIdService(id)
        }

        this[`${BaseQueries.#name}Fetch`] = async (_, __, req) => {
            if(middlewares && middlewares.fetchMiddleware) await middlewares.fetchMiddleware(req)
            return await fetchService()
        }

        this[`${BaseQueries.#name}Paginate`] = async (_, {input}, req) => {
            if(middlewares && middlewares.paginateMiddleware) await middlewares.paginateMiddleware(req)
            return await paginateService(input)
        }
    }

    get name(){
        return BaseQueries.#name
    }
}

class BaseMutations{
    static #name
    constructor(name, input, middlewares){
        if(!name) throw new Error('Name is not provided')
        if(!input) throw new Error('input is not provided')
        if(typeof input !== 'object' || !Object.keys(input).includes('createOneService') || !Object.keys(input).includes('updateService') || !Object.keys(input).includes('deleteByIdService'))
            throw new Error('input must be a object with keys ["createOneService", "updateService", "deleteByIdService"]')
        const {createOneService, updateService, deleteByIdService} = input
        BaseMutations.#name = name
        
        this[`${BaseMutations.#name}CreateOne`] = async (_, {input}, req) => {
            if(middlewares && middlewares.createOneMiddleware) await middlewares.createOneMiddleware(req)
            return await createOneService(input)
        }

        this[`${BaseMutations.#name}Update`] = async (_,{id, upgrade}, req) => {
            if(middlewares && middlewares.updateMiddleware) await middlewares.updateMiddleware(req)
            return await updateService(id, upgrade)
        }

        this[`${BaseMutations.#name}DeleteById`] = async (_, {id}, req) => {
            if(middlewares && middlewares.deleteByIdMiddleware) await middlewares.deleteByIdMiddleware(req)
            return await deleteByIdService(id)
        }
    }

    get name(){
        return BaseMutations.#name
    }
}

export {
    BaseQueries, BaseMutations
}