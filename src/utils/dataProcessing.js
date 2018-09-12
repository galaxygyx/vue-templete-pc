// 设置cookie
function setCookie(key, value, time) {
  var exp = new Date()
  exp.setTime(exp.getTime() + time * 1000)
  if (time) {
    document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString()
  } else {
    document.cookie = key + '=' + escape(value)
  }
}

// 删除cookie
function removeCookie(key) {
  setCookie(key, 'null', -999999)
}

// 获取cookie
function getCookie(key) {
  let arr
  let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg)
    return unescape(arr[2])
  } else {
    return null
  }
}

// 用户登陆时候保存用户名到cookie中
function userLogin(token, name) {
  setCookie('login_token', token, 60 * 60 * 24 * 30)
  setCookie('user', name, 60 * 60 * 24 * 30)
}

// 用户注销时候用户名从 coolie 中删除
function userLogout() {
  removeCookie('login_token')
  removeCookie('user')
}

export {
  setCookie,
  removeCookie,
  getCookie,
  userLogin,
  userLogout
}
