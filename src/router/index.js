import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/register', component: () => import('@/views/register/index'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '区域信息',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '区域信息', icon: '区域' }
    }]
  },

  // 社区公告管理
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/table',
    name: '社区公告', // 名字注释
    meta: { title: '社区公告', icon: '公告' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '社区公告',
        component: () => import('@/views/notice/index'), // 点击后要显示的页面路径
        meta: { title: '社区公告', icon: '公告' }
      },
      {
        path: 'edit/:id',
        name: '修改公告',
        component: () => import('@/views/notice/index'),
        meta: { title: '修改公告', icon: '修改' },
        hidden: true
      }
    ]
  },

  // 社员管理
  {
    path: '/members',
    component: Layout, // 布局
    redirect: '/members/table',
    name: '社员管理', // 名字注释
    meta: { title: '社员管理', icon: 'user' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '社员列表',
        component: () => import('@/views/member/List'), // 点击后要显示的页面路径
        meta: { title: '社员列表', icon: '人员列表' }
      },
      {
        path: 'tree',
        name: '添加社员',
        component: () => import('@/views/member/Save'),
        meta: { title: '添加社员', icon: '社员添加' }
      },
      {
        path: 'edit/:id',
        name: '修改社员',
        component: () => import('@/views/member/Save'),
        meta: { title: '修改社员', icon: '修改' },
        hidden: true
      }
    ]
  },

  // 视频管理
  {
    path: '/video',
    component: Layout, // 布局
    redirect: '/video/table',
    name: '视频管理', // 名字注释
    meta: { title: '视频管理', icon: '视频' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '视频列表',
        component: () => import('@/views/vod/VodList'), // 点击后要显示的页面路径
        meta: { title: '视频列表', icon: '视频列表' }
      },
      {
        path: 'add',
        name: '上传视频',
        component: () => import('@/views/vod/VodSave'),
        meta: { title: '上传视频', icon: '视频上传' }
      },
      {
        path: 'edit/:id',
        name: '编辑视频',
        component: () => import('@/views/vod/VodSave'),
        meta: { title: '编辑视频', icon: '修改' },
        hidden: true
      }
    ]
  },

  // 出行体温记录管理
  {
    path: '/temperature',
    component: Layout, // 布局
    redirect: '/temperature/table',
    name: '信息管理', // 名字注释
    meta: { title: '信息管理', icon: '出行记录' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '记录列表',
        component: () => import('@/views/temperature/TempList'), // 点击后要显示的页面路径
        meta: { title: '出行记录', icon: '出行记录' }
      }
    ]
  },

  // 商品管理
  {
    path: '/goods',
    component: Layout, // 布局
    redirect: '/goods/table',
    name: '货物仓库', // 名字注释
    meta: { title: '货物仓库', icon: '货物' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '货物列表',
        component: () => import('@/views/goods/GoodsList'), // 点击后要显示的页面路径
        meta: { title: '货物列表', icon: '列表' }
      },
      {
        path: 'add',
        name: '上架货物',
        component: () => import('@/views/goods/Save'),
        meta: { title: '上架货物', icon: '上架货物' }
      },
      {
        path: 'order',
        name: '需求订单',
        component: () => import('@/views/goods/Order'),
        meta: { title: '需求订单', icon: '需求订单' }
      },
      {
        path: 'edit/:id',
        name: '编辑视频',
        component: () => import('@/views/goods/Save'),
        meta: { title: '编辑货物', icon: '修改' },
        hidden: true
      }
    ]
  },

  // 核酸检测管理
  {
    path: '/nucleic',
    component: Layout, // 布局
    redirect: '/nucleic/table',
    name: '核酸管理', // 名字注释
    meta: { title: '核酸管理', icon: '检测' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '核酸记录',
        component: () => import('@/views/nucleic/NucleicList'), // 点击后要显示的页面路径
        meta: { title: '核酸记录', icon: '检测' }
      }
    ]
  },

  // 社员接种疫苗管理
  {
    path: '/vaccines',
    component: Layout,
    redirect: '/vaccines/table',
    name: '疫苗记录', // 名字注释
    meta: { title: '疫苗记录', icon: '疫苗' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '疫苗记录',
        component: () => import('@/views/vaccines/VaccinesList'), // 点击后要显示的页面路径
        meta: { title: '疫苗记录', icon: '疫苗' }
      }
    ]
  },

  // 返程申请管理
  {
    path: '/apply',
    component: Layout,
    redirect: '/apply/table',
    name: '返程审核', // 名字注释
    meta: { title: '返程审核', icon: '审核' }, // 显示和图标
    children: [
      {
        path: 'table',
        name: '返程审核',
        component: () => import('@/views/apply/apply'), // 点击后要显示的页面路径
        meta: { title: '返程审核', icon: '审核' }
      }
    ]
  },

  // 数据统计及可视化
  {
    path: '/statistics',
    component: Layout, // 布局
    redirect: '/statistics/table',
    name: '数据统计', // 名字注释
    meta: { title: '数据统计', icon: '数据统计' }, // 显示和图标
    children: [
      {
        path: 'personnel',
        name: '感染比例',
        component: () => import('@/views/statistics/Personnel'), // 点击后要显示的页面路径
        meta: { title: '感染比例', icon: '折线图' }
      },
      {
        path: 'trip',
        name: '毒株数目',
        component: () => import('@/views/statistics/Strain'), // 点击后要显示的页面路径
        meta: { title: '毒株数目', icon: '条形图' }
      },
      {
        path: 'vaccination',
        name: '疫苗状况',
        component: () => import('@/views/statistics/Vaccination'), // 点击后要显示的页面路径
        meta: { title: '疫苗状况', icon: '条形图' }
      },
      {
        path: 'vacRatio',
        name: '接种比例',
        component: () => import('@/views/statistics/VaccinationRatio'), // 点击后要显示的页面路径
        meta: { title: '接种比例', icon: '折线图' }
      }
    ]
  }

]

/*
  动态路由
*/
export const asyncRoutes = [

  // 权限管理
  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      }

    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
