import {errorCreateOneService} from '../services/ErrorServices.js'

class ValidationError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "ValidationError"
        this.code = "VALIDATION_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 422,
            code: "VALIDATION_ERROR",
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

export default ValidationError