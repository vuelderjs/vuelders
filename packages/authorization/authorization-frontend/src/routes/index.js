import merge from 'deepmerge'

import { routes as userRoutes } from '../modules/user/index.js'
//import { routes as rbacRoutes } from '../modules/rbac/index.js'

const routes = merge.all([userRoutes, /*rbacRoutes*/])

export default routes;