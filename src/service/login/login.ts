import hyRequest from '..'

import type { IAccount, ILoginResult, IDataType } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/'
}

const accountLoginRequest = (account: IAccount) => {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

const requestUserInfoById = (id: number) => {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserInfo + id
  })
}

export { accountLoginRequest, requestUserInfoById }
