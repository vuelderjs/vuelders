import {errorCreateOneService} from '../services/ErrorServices.js'

class NotFoundError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "NotFoundError"
        this.code = "NOT_FOUND_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 404,
            code: "NOT_FOUND_ERROR",
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

export default NotFoundError