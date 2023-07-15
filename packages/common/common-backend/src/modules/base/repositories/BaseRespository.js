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
            docFindedById = await docFindedById.populate(BaseRepository.#populate[i])
        }
        return BaseRepository.#populate.length == 0 ? await docFindedById : docFindedById
    }

    async find(query){
        let docFetch = BaseRepository.#Model.find(query)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            docFetch = docFetch.populate(BaseRepository.#populate[i])
        }
        return BaseRepository.#populate.length == 0 ? await docFetch : docFetch
    }

    async findOne(query){
        let doc = BaseRepository.#Model.findOne(query)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            doc = await doc.populate(BaseRepository.#populate[i])
        }
        return BaseRepository.#populate.length == 0 ? await doc : doc
    }

    async findByIdAndDelete(id){
        let docDeleted = BaseRepository.#Model.findByIdAndDelete(id)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            docDeleted = await docDeleted.populate(BaseRepository.#populate[i])
        }
        return BaseRepository.#populate.length == 0 ? await docDeleted : docDeleted
    }

    async findByIdAndUpdate(id, upgrade){
        let updatedDoc = BaseRepository.#Model.findByIdAndUpdate(id, upgrade, {new: true})
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            updatedDoc = await updatedDoc.populate(BaseRepository.#populate[i])
        }
        return BaseRepository.#populate.length == 0 ? await updatedDoc : updatedDoc
    }

    async paginate(query, options){
        let paginateDocs = BaseRepository.#Model.paginate(query, options)
        for(let i = 0; i < BaseRepository.#populate.length; i++){
            paginateDocs = await paginateDocs.populate(BaseRepository.#populate[i])
        }
        return BaseRepository.#populate.length == 0 ? await paginateDocs : paginateDocs
    }

    async create(doc){
        const docCreated = new BaseRepository.#Model(doc)
        return await docCreated.save()
    }
}

export default BaseRepository