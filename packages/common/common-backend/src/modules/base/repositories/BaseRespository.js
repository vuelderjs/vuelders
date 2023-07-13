import { isObjectType } from "graphql"
import mongoose from "mongoose"

class BaseRepository{
    static #Model
    
    constructor(Model){
        BaseRepository.#Model = Model
    }

    async findById(id){
        if(typeof id == 'object') throw new Error('Cant findById with query options.')
        if(!BaseRepository.#Model || !BaseRepository.#Model.findById) throw new Error('Invalid Model.')
        const docFindedById = await BaseRepository.#Model.findById(id)
        return docFindedById
    }

    async find(query){
        const docFetch = await BaseRepository.#Model.find(query)
        return docFetch
    }

    async findOne(query){
        const doc = await BaseRepository.#Model.findOne(query)
        return doc
    }

    async findByIdAndDelete(id){
        const docDeleted = await BaseRepository.#Model.findByIdAndDelete(id)
        return docDeleted
    }

    async findByIdAndUpdate(id, upgrade){
        const updatedDoc = await BaseRepository.#Model.findByIdAndUpdate(id, upgrade, {new: true})
        return updatedDoc
    }

    async paginate(query, options){
        const paginateDocs = await BaseRepository.#Model.paginate(query, options)
        return paginateDocs
    }

    async create(doc){
        const docCreated = new BaseRepository.#Model(doc)
        const docSaved = await docCreated.save()
        return docSaved 
    }
}

export default BaseRepository