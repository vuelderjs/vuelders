import { userCreateOneService, userFindService, createRole, createManyPermissions, assignPermissionToRole, assignRoleToUser, findRoleByName } from "@vuelder.js/authorization-backend";
import {
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    SHOW_USERS,
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    SHOW_ROLES,
    CREATE_PERMISSION,
    UPDATE_PERMISSION,
    DELETE_PERMISSION,
    SHOW_PERMISSIONS
} from '@vuelder.js/authorization-backend'

export const initAdminUser = async () => {
    if(!(await findRoleByName("ADMIN"))){
        await createRole("ADMIN")
    }

    const permissions = [CREATE_USER, UPDATE_USER, DELETE_USER, SHOW_USERS, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE, SHOW_ROLES, CREATE_PERMISSION, UPDATE_PERMISSION, DELETE_PERMISSION, SHOW_PERMISSIONS]

    await createManyPermissions(permissions)

    for(let i = 0; i < permissions.length; i ++){
        await assignPermissionToRole({permission: permissions[i], role: "ADMIN"})
    }

    if(!(await userFindService({username: 'root'}))[0]){
        await userCreateOneService({
            username: "root",
            email: "root@root.com",
            password: "root.123"
        })

    }
    
    await assignRoleToUser({role: "ADMIN", username: "root"})
}