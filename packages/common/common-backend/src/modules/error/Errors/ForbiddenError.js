import {errorCreateOneService} from '../services/ErrorServices.js'

class ForbiddenError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "ForbiddenError"
        this.code = "FORBIDDEN_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 403,
            code: "FORBIDDEN_ERROR",
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

export default ForbiddenError