import {errorCreateOneService} from '../services/ErrorServices.js'

class ConflictError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "ConflictError"
        this.code = "CONFLICT_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 409,
            code: "CONFLICT_ERROR",
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

export default ConflictError