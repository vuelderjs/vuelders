import {errorCreateOneService} from '../services/ErrorServices.js'

class ForbiddenError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "ForbiddenError"
        this.errorCode = "FORBIDDEN_ERROR"
        this.statusCode = 403
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

export default ForbiddenError