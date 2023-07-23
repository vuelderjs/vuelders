import { createRouter, createWebHistory } from 'vue-router'
import childrenRoutes from './routes'

const routes = [
    {
        path: '/',
        component: () => import('@/modules/base/layouts/default/Default.vue'),
        children: childrenRoutes,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({x: 0, y: 0})
            }, 100)
        })
    }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.

      store.dispatch('checkAuth')

      if (!store.getters.isAuth) {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      } else {
          if (to.meta.role && !store.getters.hasRole(to.meta.role)) {
              next({path: '/', query: {redirect: to.fullPath}})
          } else if (to.meta.permission && !store.getters.hasPermission(to.meta.permission)) {
              //console.warn("PERMISO DENEGADO", to.meta.permission)
              next({path: '/', query: {redirect: to.fullPath}})
          } else {
              next()
          }
      }
  }else {
      next() // make sure to always call next()!
  }
})

export default router
