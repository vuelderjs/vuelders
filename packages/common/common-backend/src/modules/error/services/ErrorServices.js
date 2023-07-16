import BaseService from "../../base/services/BaseService.js";
import ErrorRepository from "../repositories/ErrorRepository.js";

class ErrorServices extends BaseService {
    constructor(repository, filters){
        super(repository, filters)
    }
}

export const {
    find : errorFindService,
    findOne : errorFindOneService,
    findById : errorFindByIdService,
    paginate: errorPaginateService,
    fetch: errorFetchService,
    update: errorUpdateService,
    deleteById: errorDeleteByIdService,
    createOne: errorCreateOneService,
} = new ErrorServices(ErrorRepository)