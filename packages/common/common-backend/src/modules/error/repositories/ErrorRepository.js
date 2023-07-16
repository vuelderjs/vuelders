import BaseRepository from "../../base/repositories/BaseRespository.js"
import Error from "../model/Error.js"

class ErrorRepository extends BaseRepository{
    constructor(model, populate = []){
        super(model, populate)
    }
}

export default new ErrorRepository(Error, ["author"])