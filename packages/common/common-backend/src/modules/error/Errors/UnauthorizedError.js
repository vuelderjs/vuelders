import {errorCreateOneService} from '../services/ErrorServices.js'

class UnauthorizedError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "UnauthorizedError"
        this.code = "UNAUTHORIZED_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 401,
            code: "UNAUTHORIZED_ERROR",
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

export default UnauthorizedError