import test from 'node:test'
import assert from 'node:assert'

import { BaseQueries, BaseMutations } from '../../../../../../src/modules/base/graphql/resolvers/BaseResolvers.js'

test('BaseQueries testing', async (t) => {

    // Tests that the 'FindOne' method returns the expected result
    await t.test('test_find_one_returns_expected_result', async () => {
        const name = 'testName';
        const fetchService = () => {}
        const findByIdService = () => ({id: 1, name: 'test'})
        const paginateService = ()=>{}
        const baseQueries = new BaseQueries(name, {fetchService, findByIdService, paginateService});
        const result = await baseQueries.testNameFindById(null, {id: 1});
        assert.equal(result.id, 1)
        assert.equal(result.name, 'test')
    });

    // Tests that the 'Fetch' method returns the expected result
    await t.test('test_fetch_returns_expected_result', async () => {
        const name = 'testName';
        const fetchService = () => [{id: 1, name: 'test'}]
        const findByIdService = () => {}
        const paginateService = () => {}
        const baseQueries = new BaseQueries(name, {fetchService, findByIdService, paginateService});
        const result = await baseQueries.testNameFetch();
        assert.equal(JSON.stringify(result), JSON.stringify([{id: 1, name: 'test'}]))
    });

    // Tests that the 'Paginate' method returns the expected result
    await t.test('test_paginate_returns_expected_result', async () => {
        const name = 'testName';
        const fetchService = () => {}
        const findByIdService = () => {};
        const paginateService = () => [{id: 1, name: 'test'}]
        const baseQueries = new BaseQueries(name, {fetchService, findByIdService, paginateService});
        const result = await baseQueries.testNamePaginate(null, {input: {page: 1, limit: 10}});
        assert.equal(JSON.stringify(result), JSON.stringify([{id: 1, name: 'test'}]))
    });

})


test('BaseMutations testing', async (t) => {BaseMutations

    // Tests that the createOne mutation returns the expected result
    await t.test('test_createOne_returns_expected_result', async () => {
        const name = 'TestName';
        const expectedResult = 'createOneResult'
        const createOneService = () => expectedResult;
        const updateService = () => {};
        const deleteByIdService = () => {};
        const baseMutations = new BaseMutations(name, {createOneService, updateService, deleteByIdService});
        const result = await baseMutations.TestNameCreateOne(null, {input: 'input'});
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
    });

    // Tests that the update mutation returns the expected result
    await t.test('test_update_returns_expected_result', async () => {
        const name = 'TestName';
        const expectedResult = 'expectedResult'
        const createOneService = () => {};
        const updateService = () => expectedResult;
        const deleteByIdService = () => {};
        const baseMutations = new BaseMutations(name, {createOneService, updateService, deleteByIdService});
        const result = await baseMutations.TestNameUpdate(null, {id: 'id', upgrade: 'upgrade'});
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
    });

    // Tests that the deleteById mutation returns the expected result
    await t.test('test_deleteById_returns_expected_result', async () => {
        const name = 'TestName';
        const expectedResult = 'expectedResult'
        const createOneService = () => {};
        const updateService = () => {};
        const deleteByIdService = () => expectedResult;
        const baseMutations = new BaseMutations(name, {createOneService, updateService, deleteByIdService});
        const result = await baseMutations.TestNameDeleteById(null, {id: 'id'});
        assert.equal(JSON.stringify(result), JSON.stringify(expectedResult));
    });

    // Tests that the constructor throws an error if name is not provided
    await t.test('test_constructor_throws_error_if_name_not_provided', () => {
        const createOneService = () => {};
        const updateService = () => {};
        const deleteByIdService = () => {};
        assert.throws(()=>new BaseMutations(null, {createOneService, updateService, deleteByIdService}), new Error('Name is not provided'))
    });

    // Tests that the createOne mutation throws an error if input is not provided
    await t.test('test_createOne_throws_error_if_input_not_provided', async () => {
        const name = 'TestName';
        assert.throws(()=>new BaseMutations(name, null), new Error('input is not provided'))
    });

    // Tests that the createOne mutation throws an error if inpu is not provided
    await t.test('test_createOne_throws_error_if_input_not_is_an_base_service_object', async () => {
        const name = 'TestName';
        assert.throws(()=>new BaseMutations(name, {}), new Error('input must be a object with keys ["createOneService", "updateService", "deleteByIdService"]'))
    });
})