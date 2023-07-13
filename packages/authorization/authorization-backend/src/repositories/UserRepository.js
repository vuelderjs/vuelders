import { BaseRepository } from "@vuelders/common-backend";
import User from '../models/User.js'

class UserRepository extends BaseRepository{
    static #Model
    constructor(Model){
        super(Model)
        UserRepository.#Model = Model
    }
}

export default new UserRepository(User)