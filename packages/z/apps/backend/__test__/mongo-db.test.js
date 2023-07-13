import {mongoConnect, connectToMongo, mongoDisconnect} from '../src/mongo-db.js'
import test from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'

const MONGO_URI_TEST = 'mongodb://localhost:7537/test'

test('mongoClose function', async (t) => {
    process.env.MONGO_URI = MONGO_URI_TEST

    t.afterEach(async ()=>{
        await mongoose.disconnect()
    })

    await t.test('test_close_single_connection', async () => {
        await mongoose.connect(process.env.MONGO_URI)
        await mongoDisconnect()
        assert.strictEqual(mongoose.connection.readyState, 0)
    })

    await t.test('test_no_active_connection', async () => {
        // Attempt to close a non-existent connection
        let error = undefined
        try {
            await mongoDisconnect()
        } catch (err) {
            error = err.message ? err.message : err
        }
        assert.equal(error, 'I cant disconnect if havent conection in mongoose')
    })
})

test('Mongo-db testing connection', async (t) => {
    t.beforeEach(()=>{
        process.env.MONGO_URI = MONGO_URI_TEST
    })
    t.afterEach(async ()=>{
        if(mongoose.connection.readyState === 1)
            await mongoDisconnect()
    })

    await t.test('test_happy_path_connection_success', async () => {
        assert.ok(await mongoConnect())
        console.log('termino')
    })

    await t.test('test_happy_path_logs_mongo_open_and_mongo_connected', async () => {
        console.log = (args) => {
            assert.ok(['Mongoose connected', 'MongoDB Open'].includes(args))
        }
        await mongoConnect()
    })

    await t.test('test_edge_case_missing_mongo_uri', async () => {
        delete process.env.MONGO_URI
        let error = undefined
        try {
            await mongoConnect()
        } catch (err) {
            error = err.message ? err.message : err
        }
        assert.equal(error, 'process.env.MONGO_URI not found')
    })

    await t.test('test_general_behaviour_overrides_object_id', async () => {
        await mongoConnect()
        const {ObjectId} = mongoose.Types
        const objectId = new ObjectId()
        assert.equal(objectId.toString(),objectId.valueOf())
    })
})