import {errorCreateOneService} from '../services/ErrorServices.js'

class TimeoutError extends Error {
    constructor({message, author, save = false}) {
        super(message)
        this.name = "TimeoutError"
        this.code = "TIMEOUT_ERROR"
        this.author = author ? author : 'non-author'
        this.message = JSON.stringify({
            status: 504,
            code: "TIMEOUT_ERROR",
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

export default TimeoutError