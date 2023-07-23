const routes = [
    {
      path: '/errors-management',
      name: 'errors',
      component: () => import('../pages/CommonErrorsPage.vue')
    },
]

export { routes }