import mongoose from 'mongoose'

class BaseRepository{
    constructor(Model, populate = []){
        if(!Model) throw new Error('BaseRepository must need a Model to be functional.')
        if(!Array.isArray(populate)) throw new Error('populate Params must been an array')
        populate = populate ? populate : []

        this.ValidationError = mongoose.Error.ValidationError

        this.findById = async (id) => {
            if(typeof id == 'object') throw new Error('Cant findById with query options.')
            if(!Model || !Model.findById) throw new Error('Invalid Model.')
            let docFindedById = Model.findById(id)
            for(let i = 0; i < populate.length; i++){
                docFindedById = docFindedById.populate(populate[i])
            }
            return await docFindedById 
        }

        this.find = async (query) => {
            let docFetch = Model.find(query)
            for(let i = 0; i < populate.length; i++){
                docFetch = docFetch.populate(populate[i])
            }
            return await docFetch
        }

        this.findOne = async (query) => {
            let doc = Model.findOne(query)
            for(let i = 0; i < populate.length; i++){
                doc = doc.populate(populate[i])
            }
            return await doc
        }

        this.findByIdAndDelete = async () => {
            let docDeleted = Model.findByIdAndDelete(id)
            for(let i = 0; i < populate.length; i++){
                docDeleted = docDeleted.populate(populate[i])
            }
            return await docDeleted
        }

        this.findByIdAndUpdate = async (id, upgrade) => {
            let updatedDoc = Model.findByIdAndUpdate(id, upgrade, {new: true})
            for(let i = 0; i < populate.length; i++){
                updatedDoc = updatedDoc.populate(populate[i])
            }
            return await updatedDoc
        }

        this.paginate = async (query, options) => {
            options.populate = populate

            const paginate = await Model.paginate(query, options)
    
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

        this.create = async (doc) => {
            const docCreated = new Model(doc)
            return await docCreated.save()
        }
    }
}

export default BaseRepository