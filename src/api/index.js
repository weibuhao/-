
import axios from '@/utils/request'
export * from './ArticleApi'
// token续签
export const getNewTokenAPI = () => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
    }
  })
}

// 频道--用户所有频道
export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
// 频道--用户频道
export const getChannelsAPI = () => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

// 频道--频道更新
export const updateChannelAPI = ({ channels }) => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}

// 频道--删除频道
export const removeChannelAPI = ({ channelId }) => {
  return axios({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}

// 登录-- 用户登录请求
export const loginAPI = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 搜索--搜索建议
export const proposalAPI = ({ keywords }) => {
  return axios({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q: keywords
    }
  })
}

// 搜索--搜索结果
export const SearchResultAPI = () => {
  return axios({
    url: '/v1_0/search',
    method: 'GET'
  })
}

// 搜索--搜索文章
export const SearchArticleAPI = ({ page = 1, per_page = 10, q }) => {
  return axios({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      page,
      per_page,
      q
    }
  })
}

// 用户--个人基本信息详情
export const GetUserinfoAPI = () => {
  return axios({
    url: '/v1_0/user',
    method: 'GET'
  })
}

// 用户--个人详情(编辑页面使用)
export const UserProfileAPI = () => {
  return axios({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 用户--用户头像
export const UsrtImagesAPI = (fd) => {
  return axios({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}

// 用户--编辑个人信息
export const MyinformationAPI = (dataObj) => {
  const Obj = {
    name: '',
    gender: 0,
    birthday: '',
    intro: ''
  }

  for (const prop in Obj) {
    if (dataObj[prop] === undefined) {
      delete Obj[prop]
    } else {
      Obj[prop] = dataObj[prop]
    }
  }

  return axios({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: Obj
  })
}
