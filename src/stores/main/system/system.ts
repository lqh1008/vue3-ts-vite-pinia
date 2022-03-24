import { defineStore } from 'pinia'

import { getPageListData } from '@/service/main/system/system'

export const useSystemStore = defineStore('system', {
  state: () => ({
    userList: [],
    userCount: 0
  }),
  getters: {},
  actions: {
    async getPageListAction(url: string, queryInfo: any) {
      const pageResult = await getPageListData(url, queryInfo)
      this.userList = pageResult.data.list
      console.log('this.userList: ', this.userList)
      this.userCount = pageResult.data.totalCount
      console.log('this.userCount: ', this.userCount)
    }
  }
})
