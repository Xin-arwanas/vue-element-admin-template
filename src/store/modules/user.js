import { login, getNodeList } from '@/api/user'
import { getToken, setToken, removeToken, setUserInfo, getUserInfo, removeUserInfo, setRole, getRole, removeRole } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: (getUserInfo() || {}).USER_ZHNAME || '',
    avatar: '',
    role: getRole() || ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ dispatch, commit }, userInfo) {
    const { username, password, ticket, randstr } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), userpwd: password, ticket: ticket, randstr: randstr }).then(response => {
        const { data } = response
        const { USER_ZHNAME } = data.userinfo
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', USER_ZHNAME)
        commit('SET_ROLE', data.role)
        setToken(data.token)
        setUserInfo(data.userinfo)
        setRole(data.role)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getNodeList({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      getNodeList().then(response => {
        dispatch('permission/generateRoutes', response.data, { root: true }).then(accessRoutes => {
          resolve(accessRoutes)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserInfo()
      removeRole()
      resetRouter()
      commit('RESET_STATE')
      commit('permission/RESET_ROUTES', [], { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

