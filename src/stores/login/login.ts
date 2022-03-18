// Pinia Store
import { defineStore } from 'pinia'
import type { IAccount } from '@/service/login/types'
import { accountLoginRequest, requestUserInfoById } from '@/service/login/login'
import LocalCache from '@/utils/cache'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: ''
  }),
  getters: {},
  actions: {
    changeToken(token: string) {
      this.token = token
      LocalCache.setCache('token', this.token)
    },

    async accountLoginAction(account: IAccount) {
      // console.log(account)
      const loginResult = await accountLoginRequest(account)
      const { id, token } = loginResult.data
      this.changeToken(token)

      const userInfoResult = await requestUserInfoById(id)
      console.log('userInfoResult: ', userInfoResult)
      // console.log('loginResult: ', loginResult)
    }
  }
})
