const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/RegisterPage')
    }
]

export default routes