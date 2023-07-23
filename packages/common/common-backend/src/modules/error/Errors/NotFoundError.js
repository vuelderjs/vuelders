import {errorCreateOneService} from '../services/ErrorServices.js'

class NotFoundError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "NotFoundError"
        this.errorCode = "NOT_FOUND_ERROR"
        this.statusCode = 404
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

export default NotFoundError