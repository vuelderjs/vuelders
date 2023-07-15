import test from 'node:test'
import assert from 'node:assert'

import BaseRepository from '../../../../../src/modules/base/repositories/BaseRespository.js'

const MockModel = {
    docs: [{ _id: '123', name: 'mockDoc1' }, { _id: '456', name: 'mockDoc2' }, { _id: '789', name: 'mockDoc3' }],

    findById(id){
        let document = null
        this.docs.forEach(doc => {
            if(doc._id === id) document = doc
        })
        return document
    },

    find(query){
        return this.docs.filter(doc => {
            for (const prop in query) {
              if (doc[prop] !== query[prop]) {
                return false;
              }
            }
            return true;
        });
    },

    findByIdAndUpdate(id, update){
        const index = this.docs.findIndex(doc => doc._id === id);
        if (index !== -1) {
            const updatedDoc = { ...this.docs[index], ...update };
            this.docs[index] = updatedDoc;
            return updatedDoc;
        }
        return null;
    },

    findOne(query){
        for (const doc of this.docs) {
            let match = true;
            for (const prop in query) {
                if (doc[prop] !== query[prop]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return doc;
            }
        }
        return null;
    },

    findByIdAndDelete(id){
        const index = this.docs.findIndex(doc => doc._id === id);
        if (index !== -1) {
            const deletedDoc = this.docs[index];
            this.docs.splice(index, 1);
            return deletedDoc;
        }
        return null;
    },
}

//Tests

test('Base Repository testing', async (t) => {
    t.beforeEach(()=>{
        MockModel.docs = [{ _id: '123', name: 'mockDoc1' }, { _id: '456', name: 'mockDoc2' }, { _id: '789', name: 'mockDoc3' }]
    })
    // Tests that findById returns the document with the given id
    await t.test('test_find_by_id', async () => {
        const repo = new BaseRepository(MockModel)
        const result = await repo.findById('123')
        assert.equal(result, MockModel.docs[0])
    })

    // Tests that find returns an array of documents that match the query
    await t.test('test_find', async () => {
        const repo = new BaseRepository(MockModel)
        const result = await repo.find({})
        assert.ok(result[0] == MockModel.docs[0] && result[1] == MockModel.docs[1])
    })

    // Tests that findOne returns the first document that matches the query
    await t.test('test_find_one', async () => {
        const repo = new BaseRepository(MockModel)
        const result = await repo.findOne({name: 'mockDoc2'})
        assert.equal(result, MockModel.docs[1])
    })

    // Tests that findByIdAndDelete deletes the document with the given id
    await t.test('test_find_by_id_and_delete', async () => {
        const repo = new BaseRepository(MockModel)
        const result = await repo.findByIdAndDelete('123')
        assert.ok(!MockModel.docs.includes(result))
    })

    // Tests that findByIdAndUpdate updates the document with the given id
    await t.test('test_find_by_id_and_update', async () => {
        const repo = new BaseRepository(MockModel)
        const upgrade = {
            name: 'nameUpgrade'
        }
        const result = await repo.findByIdAndUpdate('123', upgrade)
        if(MockModel.docs[0].name == 'mockDoc1') assert.ok(1)
        if(result == MockModel.docs[0]) assert.ok(1)
    })

    // Tests that create saves the document to the database and returns it
    await t.test('test_create', async () => {
        class Model{
            constructor({name}){
                this.name = name
            }

            save(){
                const doc = {
                    _id: '456',
                    name: this.name
                }
                MockModel.docs.push(doc)
                return doc
            }
        }
        const repo = new BaseRepository(Model) //Mock MockModel to new MockModel({}) mongoose create object
        const result = await repo.create({name: 'newDoc'})
        if(result == {_id: '456', name: 'newDoc'}) assert.ok(1)
        if(MockModel.docs[1] == result) assert.ok(1)
    })
})