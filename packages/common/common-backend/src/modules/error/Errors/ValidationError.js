import {errorCreateOneService} from '../services/ErrorServices.js'

class ValidationError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "ValidationError"
        this.errorCode = "VALIDATION_ERROR"
        this.statusCode = 422
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

export default ValidationError