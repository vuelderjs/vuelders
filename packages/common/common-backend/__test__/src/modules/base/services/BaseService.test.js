import test from 'node:test'
import assert from 'node:assert'

import BaseService from '../../../../../src/modules/base/services/BaseService.js'

test('BaseService testing', async (t) => {
    
    // Tests that find() method returns the expected result when given a valid id
    await t.test('test_find_valid_id', async () => {
        const expectResult = {id: 1, name: 'JognDoe'}
        const repository = {
            find: () => expectResult
        }
        const service = new BaseService(repository)
        const result = await service.find(1)
        assert.equal(JSON.stringify(result), JSON.stringify(expectResult))
    })

    // Tests that paginate() method returns the expected result when given valid parameters
    await t.test('test_paginate_valid_parameters', async () => {
        const expectedResult = { docs: [{ id: 1, name: 'John Doe' }], totalDocs: 1, limit: 5, page: 1, totalPages: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null }
        const repository = {
            paginate: () => expectedResult
        }
        const service = new BaseService(repository)
        const result = await service.paginate({ pageNumber: 1, itemsPerPage: 5 })
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult))
    })

    // Tests that fetch() method returns the expected result
    await t.test('test_fetch', async () => {
        const expectedResult = [{ id: 1, name: 'John Doe' }]
        const repository = {
            find: () => expectedResult
        }
        const service = new BaseService(repository)
        const result = await service.fetch()
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult))
    })

    // Tests that update() method returns the expected result when given a valid id and upgrade
    await t.test('test_update_valid_id_and_upgrade', async () => {
        const expectedResult = { id: 1, name: 'John Doe' }
        const repository = {
            findByIdAndUpdate: () => expectedResult
        }
        const service = new BaseService(repository)
        const result = await service.update()
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult))
    })

    // Tests that deleteById() method returns the expected result when given a valid id
    await t.test('test_delete_by_id_valid_id', async () => {
        const expectedResult = { id: 1, name: 'John Doe' }
        const repository = {
            findByIdAndDelete: () => expectedResult
        }
        const service = new BaseService(repository)
        const result = await service.deleteById(1)
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult))
    })

    // Tests that createOne() method returns the expected result when given a valid doc
    await t.test('test_create_one_valid_doc', async () => {
        const expectedResult = { id: 1, name: 'John Doe' }
        const repository = {
            create: () => expectedResult
        }
        const service = new BaseService(repository)
        const result = await service.createOne({ name: 'John Doe' })
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult))
    })
})