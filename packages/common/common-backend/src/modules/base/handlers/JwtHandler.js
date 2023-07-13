import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

class JWT {
    static #secretKey
    static #expirationTime
    constructor(){
        if (!process.env.JWT_SECRET_KEY || !process.env.JWT_REFRESHTOKEN_EXPIRED_IN) {
            throw new Error('JWT secret key or expiration time is missing or invalid')
        }
        JWT.#secretKey = process.env.JWT_SECRET_KEY
        JWT.#expirationTime = process.env.JWT_REFRESHTOKEN_EXPIRED_IN
    }

    generateToken(payload){
        if(typeof payload != 'object') throw new Error('jwt must be an object literal.')
        return jwt.sign(payload, JWT.#secretKey, { expiresIn: JWT.#expirationTime })
    }

    verifyToken(token){
        if(!token) throw new Error('jwt token is not provided.')
        try {
            const decoded = jwt.verify(token, JWT.#secretKey)
            return decoded
        } catch (error) {
            throw new Error('Invalid token')
        }
    }
}

export default JWT