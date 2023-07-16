import {errorCreateOneService} from '../services/ErrorServices.js'

class InternalServerError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "InternalServerError"
        this.code = "INTERNAL_SERVER_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 500,
            code: "INTERNAL_SERVER_ERROR",
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

export default InternalServerError