const Mock = require('mockjs')

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      let i = 0
      const _data = []
      const total = 100
      const page = config.query.page // 当前页数
      const pageSize = config.query.rows // 每次返回的条数
      const len = (1000 - pageSize * (page - 1)) < pageSize ? (1000 - pageSize * (page - 1)) : pageSize
      for (i; i < len; i++) {
        _data.push(
          Mock.mock({
            id: '@id',
            title: '@sentence(10, 20)',
            'status|1': ['published', 'draft', 'deleted'],
            author: 'name',
            display_time: '@datetime',
            pageviews: '@integer(300, 5000)',
            url: '@image',
            'imgs|3': ['@image'],
            video_path: {
              origUrl: 'http://vodacewiygf.vod.126.net/vodacewiygf/721c5d35-e4bb-4e6b-a555-518aeb418414.mp4',
              snapshotUrl: 'http://vodacewiygf.nosdn.127.net/67eecba6-0f87-43ce-8f83-00570dae1073.jpg'
            }
          })
        )
      }
      return {
        code: 20000,
        data: {
          total: total,
          items: _data
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/add',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '操作成功'
      }
    }
  },
  {
    url: '/vue-admin-template/table/edit',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '操作成功'
      }
    }
  },
  {
    url: '/vue-admin-template/table/delete',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '操作成功'
      }
    }
  },
  {
    url: '/vue-admin-template/table/upload',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '@image'
      }
    }
  },
  {
    url: '/vue-admin-template/table/video',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '@integer(100, 1000)'
      }
    }
  },
  {
    url: '/vue-admin-template/table/audio',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: '@integer(100, 1000)'
      }
    }
  },
  {
    url: '/vue-admin-template/table/treeTable',
    type: 'post',
    response: config => {
      let i = 0
      const _data = []
      const total = 100
      const page = config.body.page // 当前页数
      const pageSize = config.body.rows // 每次返回的条数
      const len = (1000 - pageSize * (page - 1)) < pageSize ? (1000 - pageSize * (page - 1)) : pageSize
      for (i; i < len; i++) {
        _data.push(
          Mock.mock({
            id: '@id',
            title: '@sentence(10, 20)',
            'status|1': ['published', 'draft', 'deleted'],
            author: 'name',
            display_time: '@datetime',
            pageviews: '@integer(300, 5000)',
            url: '@image',
            'imgs|3': ['@image'],
            video_path: {
              origUrl: 'http://vodacewiygf.vod.126.net/vodacewiygf/721c5d35-e4bb-4e6b-a555-518aeb418414.mp4',
              snapshotUrl: 'http://vodacewiygf.nosdn.127.net/67eecba6-0f87-43ce-8f83-00570dae1073.jpg'
            },
            children: [
              Mock.mock({
                id: '@id',
                title: '@sentence(10, 20)',
                'status|1': ['published', 'draft', 'deleted'],
                author: 'name',
                display_time: '@datetime',
                pageviews: '@integer(300, 5000)',
                url: '@image',
                'imgs|3': ['@image'],
                video_path: {
                  origUrl: 'http://vodacewiygf.vod.126.net/vodacewiygf/721c5d35-e4bb-4e6b-a555-518aeb418414.mp4',
                  snapshotUrl: 'http://vodacewiygf.nosdn.127.net/67eecba6-0f87-43ce-8f83-00570dae1073.jpg'
                }
              }),
              Mock.mock({
                id: '@id',
                title: '@sentence(10, 20)',
                'status|1': ['published', 'draft', 'deleted'],
                author: 'name',
                display_time: '@datetime',
                pageviews: '@integer(300, 5000)',
                url: '@image',
                'imgs|3': ['@image'],
                video_path: {
                  origUrl: 'http://vodacewiygf.vod.126.net/vodacewiygf/721c5d35-e4bb-4e6b-a555-518aeb418414.mp4',
                  snapshotUrl: 'http://vodacewiygf.nosdn.127.net/67eecba6-0f87-43ce-8f83-00570dae1073.jpg'
                }
              })
            ]
          })
        )
      }
      return {
        code: 20000,
        data: {
          total: total,
          items: _data
        }
      }
    }
  }
]
