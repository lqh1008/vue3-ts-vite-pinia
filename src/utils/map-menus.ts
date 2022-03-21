import type { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null

const mapMenusToRoutes = (userMenus: any): RouteRecordRaw[] => {
  console.log('userMenus: ', userMenus)
  const routes: RouteRecordRaw[] = []

  // 1.先加载所有的

  const allRoutes: RouteRecordRaw[] = []
  // const routesFiles = import.meta.glob('../router/main/**/*.ts')
  const routesFiles = import.meta.globEager('../router/main/**/*.ts')

  // Object.keys有问题

  for (const key in routesFiles) {
    if (Object.prototype.hasOwnProperty.call(routesFiles, key)) {
      const element = routesFiles[key]
      allRoutes.push(element.default)
    }
  }
  console.log('allRoutes: ', allRoutes)

  //2.根据菜单获取需要的routes
  const _recurseGetRoute = (menus: any[]) => {
    console.log(2222)
    for (const item of menus) {
      if (item.type === 2) {
        const route = allRoutes.find((route) => route.path === item.url)
        routes.push(route as RouteRecordRaw)
        if (!firstMenu) {
          firstMenu = item
        }
      } else {
        _recurseGetRoute(item.children)
      }
    }
  }

  userMenus && _recurseGetRoute(userMenus)
  console.log(routes, 22222222)
  return routes
}

const pathMapToMenu = (userMenus: any[], currentPath: string): any => {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { mapMenusToRoutes, pathMapToMenu, firstMenu }
