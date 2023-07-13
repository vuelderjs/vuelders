import test from 'node:test'
import assert from 'node:assert'
import GraphqlServer from '../src/apollo-server.js'

test('Graphql Server testing', async (t) => {
    await t.test('test_server_starts_and_listens_on_specified_port', async () => {
        const server = new GraphqlServer()
        server.definePort(4000)
        server.defineTypes(`#graphql
        type Query { hello: String }`)
        server.defineResolvers({ Query: { hello: () => 'Hello world!' } })
        server.createServer()
        await server.listen()
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ hello }' })
        })
        const json = await response.json()
        assert.equal(response.status, 200)
        await server.stop()
    })

    await t.test('test_server_responds_to_graphql_queries', async () => {
        const server = new GraphqlServer()
        server.definePort(4000)
        server.defineTypes(`type Query { hello: String }`)
        server.defineResolvers({ Query: { hello: () => 'Hello world!' } })
        server.createServer()
        await server.listen()
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ hello }' })
        })
        const json = await response.json()
        assert.strictEqual(json.data.hello, 'Hello world!')
        await server.stop()
    })

    await t.test('test_singletone_class', () => {
        const instance1 = new GraphqlServer()
        const instance2 = new GraphqlServer()
        assert.strictEqual(instance1, instance2)
    })

    await t.test('definePort method testing', async (t) => {
        await t.test('test_happy_path_set_port', () => {
            const server = new GraphqlServer()
            server.definePort(3000)
            assert.equal(server.constructor.port, 3000)
        })
    
        await t.test('test_edge_case_null_port', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.definePort(null)
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Port must been declared with definePort method after listen method.')
        })
    
        await t.test('test_edge_case_undefined_port', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.definePort(undefined)
            } catch (err) {
                error = err.message ? err.message : err
            }
    
            assert.strictEqual(error, 'Port must been declared with definePort method after listen method.')
        });
    
        await t.test('test_edge_case_not_number_port', () => {
            const server = new GraphqlServer();
            let error = 'default error'
            try {
                server.definePort('not a number')
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Port must been declared with definePort method after listen method.')
        });
    
        await t.test('test_edge_case_negative_number_port', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.definePort(-3000)
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Port must been declared with definePort method after listen method.')
        })
    
        await t.test('test_edge_case_decimal_number_port', () => {
            const server = new GraphqlServer();
            let error = 'default error'
            try {
                server.definePort(3.14)
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Port must been declared with definePort method after listen method.')
        })
    })

    await t.test('defineTypes testing', async (t) => {
        await t.test('test_happy_path_valid_types', () => {
            const server = new GraphqlServer()
            const types = 'valid types'
            server.defineTypes(types)
            assert.strictEqual(GraphqlServer.types, types)
        })

        await t.test('test_edge_case_undefined_types', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.defineTypes(undefined)
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Types must been a string type.')
        })
        
        await t.test('test_edge_case_non_string_types', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.defineTypes(123)
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Types must been a string type.')
        })

        await t.test('test_edge_case_negative_number_types', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.defineTypes(-1)
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Types must been a string type.')
        })

        await t.test('test_edge_case_non_integer_number_types', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.defineTypes(1.5)
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Types must been a string type.')
        })

        await t.test('test_edge_case_empty_types', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.defineTypes('')
                server.defineTypes([])
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Types must been a string type.')
        })
    })

    await t.test('DefineResolver testing', async (t) => {
        t.beforeEach(()=>{
            const server = new GraphqlServer()
            server.deleteInstance()
        })

        await t.test('test_happy_path_set_resolvers', () => {
            const server = new GraphqlServer()
            const resolvers = {
                Query: {
                    hello: () => 'world'
                }
            }
            server.defineResolvers(resolvers)
            assert.strictEqual(GraphqlServer.resolvers, resolvers)
        })

        await t.test('test_edge_case_no_resolvers_parameter', () => {
            const server = new GraphqlServer()
            let error = 'default error'
            try {
                server.defineResolvers()
            } catch (err) {
                error = err.message ? err.message : err
            }
            assert.strictEqual(error, 'Resolvers must been declared')        
        })

        await t.test('test_edge_case_resolvers_not_object', () => {
            const server = new GraphqlServer()
            assert.throws(() => server.defineResolvers('not an object'), new Error('resolvers must been an object type'))
        })

        await t.test('test_general_behaviour_overwrite_resolvers', () => {
            const server = new GraphqlServer()
            const resolvers1 = {
                Query: {
                    hello: () => 'world'
                }
            }
            const resolvers2 = {
                Query: {
                    goodbye: () => 'world'
                }
            }
            server.defineResolvers(resolvers1)
            server.defineResolvers(resolvers2)
            assert.equal(GraphqlServer.resolvers, resolvers2)
        })

        await t.test('test_general_behaviour_call_order', () => {
            const server = new GraphqlServer()
            assert.throws(() => server.defineResolvers({}), new Error('resolvers musnt be a empty object'))
            server.defineTypes('type Query { hello: String }')
            assert.throws(() => server.createServer(), new Error('Resolvers must been declared with defineResolvers method before createServer method.'))
            server.defineResolvers({
                Query: {
                    hello: () => 'world'
                }
            })
        })
    })
    
    await t.test('CreateServer testing', async (t) => {
        t.beforeEach(()=>{
            const server = new GraphqlServer()
            server.deleteInstance()
        })

        await t.test('test_create_server_with_types_and_resolvers', () => {
            const server = new GraphqlServer()
            const types = `#graphql 
            type Query { hello: String }`
            const resolvers = { Query: { hello: () => 'Hello world!' } }
            server.defineTypes(types)
            server.defineResolvers(resolvers)
            server.createServer()
            assert.ok(GraphqlServer.server)
            assert.equal(GraphqlServer.types, types)
            assert.equal(GraphqlServer.resolvers.Query.hello(), 'Hello world!')
        })

        await t.test('test_create_server_without_types', () => {
            const server = new GraphqlServer()
            assert.throws(() => server.createServer(), new Error('Types must been declared with defineTypes method before createServer method.'))
        })

        await t.test('test_create_server_without_resolvers', () => {
            const server = new GraphqlServer()
            server.defineTypes('type Query { hello: String }')
            assert.throws(() => server.createServer(), new Error('Resolvers must been declared with defineResolvers method before createServer method.'))
        })   
    })

    await t.test('Listen method testing', async(t) => {
        t.beforeEach(()=>{
            const server = new GraphqlServer()
            server.deleteInstance()
        })

        await t.test('test_successful_listen', async () => {
            const server = new GraphqlServer()
            server.definePort(4000)
            server.defineTypes('type Query { hello: String }')
            server.defineResolvers({ Query: { hello: () => 'Hello world!' } })
            server.createServer()
            await server.listen()
            assert.ok(GraphqlServer.httpServer.listening)
            await server.stop()
        })
    })

    await t.test('Stop method testing', async(t) => {
        t.beforeEach(()=>{
            const server = new GraphqlServer()
            server.deleteInstance()
        })

        await t.test('test_stop_server_successfully', async () => {
            const server = new GraphqlServer()
            server.definePort(4000)
            server.defineTypes('type Query { hello: String }')
            server.defineResolvers({ Query: { hello: () => 'Hello world!' } })
            server.createServer()
            await server.listen()
            await server.stop()
            assert.equal(GraphqlServer.httpServer.listening, false)
        })
    })
})