const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    name: '@word(10, 20)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/select/getSelect',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: items
      }
    }
  }
]
