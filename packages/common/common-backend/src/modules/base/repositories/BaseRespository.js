class BaseRepository{
    static #Model
    static #populate

    constructor(Model, populate = []){
        BaseRepository.#Model = Model
        if(!Array.isArray(populate)) throw new Error('populate Params must been an array')
        BaseRepository.#populate = populate ? populate : []
    }

    async findById(id){
        if(typeof id == 'object') throw new Error('Cant findById with query options.')
        if(!BaseRepository.#Model || !BaseRepository.#Model.findById) throw new Error('Invalid Model.')
        let docFindedById = BaseRepository.#Model.findById(id)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            docFindedById = docFindedById.populate(BaseRepository.#populate[i])
        }
        return await docFindedById
    }

    async find(query){
        let docFetch = BaseRepository.#Model.find(query)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            docFetch = docFetch.populate(BaseRepository.#populate[i])
        }
        return await docFetch
    }

    async findOne(query){
        let doc = BaseRepository.#Model.findOne(query)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            doc = doc.populate(BaseRepository.#populate[i])
        }
        return await doc
    }

    async findByIdAndDelete(id){
        let docDeleted = BaseRepository.#Model.findByIdAndDelete(id)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            docDeleted = docDeleted.populate(BaseRepository.#populate[i])
        }
        return await docDeleted
    }

    async findByIdAndUpdate(id, upgrade){
        let updatedDoc = BaseRepository.#Model.findByIdAndUpdate(id, upgrade, {new: true})
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            updatedDoc = updatedDoc.populate(BaseRepository.#populate[i])
        }
        return await updatedDoc
    }

    async paginate(query, options){
        options.populate = BaseRepository.#populate

        const paginate = await BaseRepository.#Model.paginate(query, options)

        return {
            docs: paginate.docs,
            totalDocs: paginate.totalDocs,
            limit: paginate.limit,
            totalPages: paginate.totalPages,
            page: paginate.page,
            hasPrevPage: paginate.hasPrevPage,
            hasNextPage: paginate.hasNextPage
        }
    }

    async create(doc){
        const docCreated = new BaseRepository.#Model(doc)
        return await docCreated.save()
    }
}

export default BaseRepository