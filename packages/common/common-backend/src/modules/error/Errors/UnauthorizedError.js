import {errorCreateOneService} from '../services/ErrorServices.js'

class UnauthorizedError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "UnauthorizedError"
        this.errorCode = "UNAUTHORIZED_ERROR"
        this.statusCode = 401
        this.author = author ? author : 'non-author'
        this.message = message
        if(save) this.save()
    }

    save(){
        errorCreateOneService({
            statusCode: this.statusCode,
            errorCode: this.errorCode,
            author: this.author,
            name: this.name,
            stack: this.stack,
            message: this.message
        })
    }
    
}

export default UnauthorizedError