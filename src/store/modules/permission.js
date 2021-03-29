import { asyncRoutes, constantRoutes, notFound } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param nodes 接口调回来的数据
 * @param asyncNodes router中定义的数据
 */
export function filterAsyncRoutes(nodes, asyncNodes = []) {
  const accessedRoutes = []
  nodes.map(node => {
    const asyncNode = { ...(asyncNodes.find(r => r.name == node.jump) || {}), children: [] }
    const asyncNodeChildren = (asyncNodes.find(r => r.name == node.jump) || {}).children
    if (asyncNodes.find(r => r.name == node.jump)) {
      if (node.title) {
        asyncNode.meta.title = node.title
      }
      if (node.list) {
        const childAsyncNode = filterAsyncRoutes(node.list, asyncNodeChildren || [])
        asyncNode.children = childAsyncNode
      } else {
        delete asyncNode.children
      }
      accessedRoutes.push(asyncNode)
    }
  })
  return accessedRoutes
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  RESET_ROUTES: state => {
    state.routes = []
  }
}

const actions = {
  generateRoutes({ commit }, nodes) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(nodes, asyncRoutes)
      accessedRoutes.push(notFound)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
