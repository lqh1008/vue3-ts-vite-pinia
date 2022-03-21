// Pinia Store
import { defineStore } from 'pinia'
import type { IAccount } from '@/service/login/types'
import router from '@/router/index'

import { mapMenusToRoutes } from '@/utils/map-menus'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuById
} from '@/service/login/login'
import LocalCache from '@/utils/cache'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: '',
    userInfo: {},
    userMenu: []
  }),
  getters: {},
  actions: {
    changeToken(token: string) {
      this.token = token
      LocalCache.setCache('token', this.token)
    },

    changeUserInfo(userInfo: any) {
      this.userInfo = userInfo
      LocalCache.setCache('userInfo', this.userInfo)
    },

    changeUserMenu(userMenu: any) {
      this.userMenu = userMenu
      LocalCache.setCache('userMenu', this.userMenu)
      const routes = mapMenusToRoutes(this.userMenu)
      console.log('routes: ', routes)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // console.log('router: ', router)
    },

    // 登录请求
    async accountLoginAction(account: IAccount) {
      // 1.登录账号请求
      const loginResult = await accountLoginRequest(account)
      const { id, token } = loginResult.data
      this.changeToken(token)

      // 2.根据id获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log('userInfoResult: ', userInfoResult)
      this.changeUserInfo(userInfoResult.data)

      // 3.根据id获取用户菜单
      const userMenuResult = await requestUserMenuById(id)
      console.log('userMenuResult: ', userMenuResult)

      this.changeUserMenu(userMenuResult.data)
      router.push('/main')

      // console.log(LocalCache.getAllCache())
    },

    // 刷新页面将数据存入pinia
    loadLoginInfo() {
      const { token, userInfo, userMenu } = LocalCache.getAllCache()

      token ?? (this.token = token)
      userInfo ?? (this.userInfo = userInfo)
      userMenu ?? (this.userMenu = userMenu)
      // this.changeUserMenu(userMenu)
    }
  }
})
