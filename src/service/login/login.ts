import hyRequest from '..'

import type { IAccount } from './types'

enum LoginAPI {
  AccountLogin = '/login'
}

const accountLoginRequest = (account: IAccount) => {
  console.log('account: ', account)

  return hyRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export { accountLoginRequest }
