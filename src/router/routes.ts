const routesMap = {
  login: () => import('@/views/login/login.vue'),
  main: () => import('@/views/main/main.vue'),
  home: () => import('@/views/main/home/home.vue'),
  test: () => import('@/views/test/test.vue')
}

export default routesMap
