import merge from 'deepmerge'

import { routes as baseRoutes } from '@/modules/base'
import { routes as commonRoutes } from '@vuelder.js/common-frontend'
import { routes as authorizationRoutes } from '@vuelder.js/authorization-frontend'

const routes = merge.all([baseRoutes, commonRoutes, authorizationRoutes])

export default routes;