// 此文件用来操作token

const key = 'token'

// 添加token
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 获取token
export const getToken = () => localStorage.getItem(key)

// 删除token
export const removeToken = () => localStorage.removeItem(key)
