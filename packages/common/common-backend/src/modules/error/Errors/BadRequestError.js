import {errorCreateOneService} from '../services/ErrorServices.js'

class BadRequestError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "BadRequestError"
        this.code = "BAD_REQUEST_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 400,
            code: "BAD_REQUEST_ERROR",
            message: message
        })
        if(save) this.save()
    }

    save(){
        errorCreateOneService({
            author: this.author,
            name: this.name,
            stack: this.stack,
            message: this.message
        })
    }
    
}

export default BadRequestError