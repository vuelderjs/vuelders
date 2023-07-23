import merge from 'deepmerge'

import { routes as errorRoutes } from '../modules/error/index.js'

const routes = merge.all([errorRoutes])

export default routes;