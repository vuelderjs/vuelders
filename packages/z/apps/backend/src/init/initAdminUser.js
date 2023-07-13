import { userCreateOneService, userFindService } from "@vuelders/authorization-backend";

export const initAdminUser = async () => {
    if(!(await userFindService({username: 'root'}))[0]){
        await userCreateOneService({
            username: "root",
            email: "root@root.com",
            password: "root.123"
        })
    }
}