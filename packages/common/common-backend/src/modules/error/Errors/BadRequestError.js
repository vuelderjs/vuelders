import {errorCreateOneService} from '../services/ErrorServices.js'

class BadRequestError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "BadRequestError"
        this.errorCode = "BAD_REQUEST_ERROR"
        this.statusCode = 400
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

export default BadRequestError