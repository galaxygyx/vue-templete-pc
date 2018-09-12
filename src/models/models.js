import {
  login
} from '../services/api'

// import md5 from 'js-md5'
// 登录
export async function getLogin(userId, password) {
  // password = md5(password)
  let param = {
    password: password,
    userId: userId
  }
  const data = await login(param)
  return data
}

