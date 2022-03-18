// Pinia Store
import { defineStore } from 'pinia'

import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/service/login/types'

export const useLoginStore = defineStore('login', {
  state: () => ({
    name: 111
  }),
  getters: {},
  actions: {
    async accountLoginAction(account: IAccount) {
      // console.log(account)
      const loginResult = await accountLoginRequest(account)
      console.log('loginResult: ', loginResult)
    }
  }
})
