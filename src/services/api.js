import * as api from './apiUrl'
import {post} from '../utils/request'

// 登录
export async function login (param) {
  const data = await post(api.login, param)
  return data
}