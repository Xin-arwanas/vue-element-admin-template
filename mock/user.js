const Mock = require('mockjs')
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/login/userlogin',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: {
          role: 1,
          token: '123',
          userinfo: {
            USER_ZHNAME: '超级管理员'
          }
        }
      }
    }
  },
  {
    url: '/system/getSystemNodeList',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: [
          {
            jump: 'Person',
            title: '111',
            list: [
              {
                jump: 'TeacherManagement',
                title: '教师管理'
              }
            ]
          },
          {
            jump: 'Park',
            title: '园所管理',
            list: [
              {
                jump: 'ParkManagement',
                title: '园所管理'
              }
            ]
          },
          {
            jump: 'Setting',
            title: '设置',
            list: [
              {
                jump: 'Node',
                title: '栏目'
              }

            ]
          }
        ]
      }
    }
  },
  {
    url: '/school/getschoolcode',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: [
          {
            name: '111',
            code: '111'
          }
        ]
      }
    }
  },
  {
    url: '/school/getClassCode',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: [
          {
            class_name: '222',
            class_id: '222'
          }
        ]
      }
    }
  },
  {
    url: '/user/getTeacherList',
    type: 'post',
    response: config => {
      return {
        code: 0,
        count: 1,
        data: [
          {
            name: '哈哈',
            phone: '13888888888',
            class_name: '班级',
            role_name: '院长',
            relation: [
              {
                relationName: '456',
                relationType: 1
              }
            ],
            sex: '1',
            role_id: '5',
            school_code: '111',
            c_id: '222'
          }
        ]
      }
    }
  },
  {
    url: '/util/getnationality',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: []
      }
    }
  },
  {
    url: '/util/getRegionList',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: [
          {
            title: '北京市',
            id: Mock.mock('@integer(300, 5000)'),
            isLast: false
          }
        ]
      }
    }
  },
  {
    url: '/system/getAllNodes',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: [
          {
            title: '园所管理',
            sort: '1',
            jump: 'Park'
          }
        ]
      }
    }
  },
  {
    url: '/user/getAgentUuid',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: [
          {
            name: 'qqq',
            uuid: '456'
          }
        ]
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
