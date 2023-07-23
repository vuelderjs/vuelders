import {errorCreateOneService} from '../services/ErrorServices.js'

class InternalServerError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "InternalServerError"
        this.errorCode = "INTERNAL_SERVER_ERROR"
        this.author = author ? author : 'non-author'
        this.statusCode = 500
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

export default InternalServerError