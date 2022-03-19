class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }

  getAllCache() {
    const allStorage = window.localStorage
    const allCache: any = {}
    for (const key in allStorage) {
      if (Object.prototype.hasOwnProperty.call(allStorage, key)) {
        const element = allStorage[key]
        allCache[key] = JSON.parse(element)
      }
    }
    return allCache
  }
}

export default new LocalCache()
