const TokenKey = 'mtsl_admin_token'
const UserInfo = 'mtsl_admin_userinfo'
const Role = 'mtsl_admin_role'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem(TokenKey)
}

export function setUserInfo(userinfo) {
  sessionStorage.setItem(UserInfo, JSON.stringify(userinfo || {}))
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(UserInfo) || '{}')
}

export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfo)
}

export function setRole(role) {
  sessionStorage.setItem(Role, role)
}

export function getRole() {
  return sessionStorage.getItem(Role)
}

export function removeRole() {
  return sessionStorage.removeItem(Role)
}
