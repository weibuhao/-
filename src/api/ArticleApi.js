import axios from '@/utils/request'
// 文章--新闻列表
export const Journalism = ({ channel_id, timestamp }) => {
  return axios({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id: channel_id,
      timestamp: timestamp
    }
  })
}

// 文章--反馈
export const reportAPI = ({ artId, value }) => {
  return axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artId,
      type: value,
      remark: '其他问题 的附加说明'
    }
  })
}

// 文章--文章详情
export const ArticleDetailsAPI = ({ art_id }) => {
  return axios({
    url: `/v1_0/articles/${art_id}`,
    method: 'GET'
  })
}

// 文章--关注用户
export const FollowUserAPI = ({ userID }) => {
  return axios({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userID
    }
  })
}

// 文章--取消关注
export const NOfollowUserAPI = ({ userID }) => {
  return axios({
    url: `/v1_0/user/followings/${userID}`,
    method: 'DELETE'
  })
}

// 文章--点赞
export const LikeArticle = ({ artID }) => {
  return axios({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artID
    }
  })
}

// 文章--取消点赞
export const NolikeArticle = ({ artID }) => {
  return axios({
    url: `/v1_0/article/likings/${artID}`,
    method: 'DELETE'
  })
}

// 文章--文章评论
export const CommentsListAPI = ({ id, offset = null, limit = 10 }) => {
  return axios({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: id,
      offset,
      limit
    }
  })
}

// 文章--发布评论
export const CommentSendAPI = ({ id, content, art_id = null }) => {
  const Obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    Obj.art_id = art_id
  }
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: Obj
  })
}

// 文章--点赞
export const CommentLikAPI = ({ target }) => {
  return axios({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 文章--取消点赞
export const NOCommentLikAPI = ({ target }) => {
  return axios({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
