import test from 'node:test'
import assert from 'node:assert'

import JWT from '../../../../../src/modules/base/handlers/JwtHandler.js'

test('JwtHandler testing', async(t) => {
    t.afterEach(()=>{
        process.env.JWT_SECRET_KEY = "secret_key"
        process.env.JWT_REFRESHTOKEN_EXPIRED_IN = "1d"
    })

    // Tests that create instance of JWT without envs return an error
    await t.test('test_create_instance_without_envs', {skip: true}, () => { //This test is skiped becouse envs modified create conflicts
        process.env.JWT_SECRET_KEY = null
        process.env.JWT_REFRESHTOKEN_EXPIRED_I = null

        let errorMessage = null

        try {
            new JWT()
        } catch (error) {
            errorMessage = error.message ? error.message : error
        }

        assert.equal(errorMessage, 'JWT secret key or expiration time is missing or invalid')
    })

    // Tests that generateToken method generates a valid token with correct payload
    await t.test('test_generate_token_with_valid_payload_and_secret_key', () => {
        const jwt = new JWT()
        const payload = { id: 1, name: 'John Doe' }
        const token = jwt.generateToken(payload)
        const decoded = jwt.verifyToken(token)
        assert.equal(decoded.id, payload.id)
        assert.equal(decoded.name, payload.name)
    })

    // Tests that generateToken method throws an error if payload is not provided
    await t.test('test_generate_token_with_missing_payload', () => {
        const jwt = new JWT()
        assert.throws(()=>{ jwt.generateToken() }, new Error('jwt must be an object literal.'))
    })

    // Tests that verifyToken method throws an error if token is not provided
    await t.test('test_verify_token_with_missing_token', () => {
        const jwt = new JWT()
        assert.throws(()=>{ jwt.verifyToken() }, new Error('jwt token is not provided.'))
    })

    // Tests that verifyToken method throws an error if token is invalid or expired
    await t.test('test_verify_token_with_invalid_token', () => {
        const jwt = new JWT()
        const payload = { id: 1, name: 'John Doe' }
        const token = jwt.generateToken(payload)

        process.env.JWT_SECRET_KEY = 'invalid_secret_key'
        new JWT() // cambio #JWT_SECRET_KEY del privado por el actual env
        assert.throws(()=>{ jwt.verifyToken(token) }, new Error('Invalid token'))
    })
})