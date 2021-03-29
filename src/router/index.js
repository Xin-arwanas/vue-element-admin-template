import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: []    1:超级管理员
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/changePwd',
    name: 'User',
    hidden: true,
    children: [{
      path: 'changePwd',
      name: 'ChangePwd',
      component: () => import('@/views/user/changePwd/index'),
      meta: { title: '修改密码' }
    }]
  },
  {
    path: '/',
    component: Layout,
    name: 'Error',
    hidden: true,
    children: [{
      path: '404',
      name: '404',
      component: () => import('@/views/404.vue'),
      meta: { title: '页面不存在' }
    }]
  },
  {
    path: '/',
    component: Layout,
    name: 'test',
    hidden: true,
    redirect: '/test',
    children: [
      {
        path: 'test',
        name: 'test1',
        component: () => import('@/views/test/index.vue'),
        meta: { title: '测试' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/person',
    component: Layout,
    redirect: '/person/teacher',
    alwaysShow: true,
    name: 'Person',
    meta: { title: '人员管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'teacher',
        name: 'TeacherManagement',
        component: () => import('@/views/personManagement/teacherManagement/index'),
        meta: { title: '教师管理' }
      },
      {
        path: 'student',
        name: 'StudentManagement',
        component: () => import('@/views/personManagement/studentManagement/index'),
        meta: { title: '学生管理' }
      },
      {
        path: 'parent',
        name: 'ParentManagement',
        component: () => import('@/views/personManagement/parentManagement/index'),
        meta: { title: '家长管理' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    alwaysShow: true,
    name: 'Member',
    meta: { title: '会员管理', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'index',
        name: 'MemberManagement',
        component: () => import('@/views/memberManagement/index/index'),
        meta: { title: '会员管理' }
      },
      {
        path: 'introduction',
        name: 'introductionManagement',
        component: () => import('@/views/memberManagement/introductionManagement/index'),
        meta: { title: '转介绍管理' }
      }
    ]
  },
  {
    path: '/park',
    component: Layout,
    redirect: '/park/index',
    alwaysShow: true,
    name: 'Park',
    meta: { title: '园区管理', icon: 'el-icon-school' },
    children: [
      {
        path: 'index',
        name: 'ParkManagement',
        component: () => import('@/views/parkManagement/index/index'),
        meta: { title: '园所管理' }
      },
      {
        path: 'class',
        name: 'ClassManagement',
        component: () => import('@/views/parkManagement/classManagement/index'),
        meta: { title: '班级管理' }
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/parkManagement/monitor/index'),
        meta: { title: '监控管理' }
      }
    ]
  },
  {
    path: '/attendance',
    component: Layout,
    redirect: '/attendance/holiday',
    alwaysShow: true,
    name: 'Attendance',
    meta: { title: '考勤管理', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: 'holiday',
        name: 'Holiday',
        component: () => import('@/views/attendanceManagement/holidayManagement/index'),
        meta: { title: '节假日管理' }
      },
      {
        path: 'attendanceSetting',
        name: 'AttendanceSetting',
        component: () => import('@/views/attendanceManagement/attendanceSetting/index'),
        meta: { title: '园所考勤设置' }
      },
      {
        path: 'teacherRecord',
        name: 'TeacherRecord',
        component: () => import('@/views/attendanceManagement/teacherRecord/index'),
        meta: { title: '老师考勤记录' }
      },
      {
        path: 'studentRecord',
        name: 'StudentRecord',
        component: () => import('@/views/attendanceManagement/studentRecord/index'),
        meta: { title: '宝宝考勤记录' }
      },
      {
        path: 'leaveApproval',
        name: 'LeaveApproval',
        component: () => import('@/views/attendanceManagement/leaveApproval/index'),
        meta: { title: '请假审批' }
      }
    ]
  },
  {
    path: '/health',
    component: Layout,
    redirect: '/health/allergen',
    alwaysShow: true,
    name: 'Health',
    meta: { title: '健康管理', icon: 'health' },
    children: [
      {
        path: 'allergen',
        name: 'Allergen',
        component: () => import('@/views/healthManagement/allergen/index'),
        meta: { title: '过敏源' }
      },
      {
        path: 'auditAllergen',
        name: 'AuditAllergen',
        component: () => import('@/views/healthManagement/auditAllergen/index'),
        meta: { title: '待审核过敏源' }
      },
      {
        path: 'recipes',
        name: 'Recipes',
        component: () => import('@/views/healthManagement/recipes/index'),
        meta: { title: '每周食谱' }
      },
      {
        path: 'dailyCheckRecord',
        name: 'DailyCheckRecord',
        component: () => import('@/views/healthManagement/dailyCheckRecord/index'),
        meta: { title: '晨检记录' }
      },
      {
        path: 'napRecord',
        name: 'NapRecord',
        component: () => import('@/views/healthManagement/napRecord/index'),
        meta: { title: '午睡记录' }
      },
      {
        path: 'topic',
        name: 'Topic',
        component: () => import('@/views/healthManagement/topic/index'),
        meta: { title: '健康题库' }
      },
      {
        path: 'topicRecord',
        name: 'TopicRecord',
        component: () => import('@/views/healthManagement/topicRecord/index'),
        meta: { title: '健康打卡记录' }
      }
    ]
  },
  {
    path: '/study',
    component: Layout,
    redirect: '/study/weeklyPlan',
    alwaysShow: true,
    name: 'Study',
    meta: { title: '学习管理', icon: 'study' },
    children: [
      {
        path: 'weeklyPlan',
        name: 'WeeklyPlan',
        component: () => import('@/views/studyManagement/weeklyPlan/index'),
        meta: { title: '周计划' }
      },
      {
        path: 'babyWork',
        name: 'BabyWork',
        component: () => import('@/views/studyManagement/babyWork/index'),
        meta: { title: '宝宝工作' }
      },
      {
        path: 'behaviorRecord',
        name: 'BehaviorRecord',
        component: () => import('@/views/studyManagement/behaviorRecord/index'),
        meta: { title: '工作记录' }
      },
      {
        path: 'workAdemo',
        name: 'WorkAdemo',
        component: () => import('@/views/studyManagement/workAdemo/index'),
        meta: { title: '工作与示范' }
      }
    ]
  },
  {
    path: '/library',
    component: Layout,
    redirect: '/library/index',
    name: 'LibraryManagement',
    meta: { title: '媒体库管理', icon: 'el-icon-picture' },
    children: [
      {
        path: 'index',
        name: 'Library',
        component: () => import('@/views/library/index/index'),
        meta: { title: '媒体库' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/node',
    alwaysShow: true,
    name: 'Setting',
    meta: { title: '设置', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'node',
        name: 'Node',
        component: () => import('@/views/settings/node/index'),
        meta: { title: '栏目' }
      },
      {
        path: 'permissionConfig',
        name: 'PermissionConfig',
        component: () => import('@/views/settings/permissionConfig/index'),
        meta: { title: '权限配置' }
      }
    ]
  }
]
// 404 page must be placed at the end !!!
export const notFound = { path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
