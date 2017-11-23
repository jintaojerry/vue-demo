import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Topic from '@/pages/topic'
import User from '@/pages/user'
import NotFound from '@/pages/notFound'


import IndexHome from '@/components/IndexHome'
import IndexMessage from '@/components/IndexMessage'
import IndexMy from '@/components/IndexMy'
import IndexPublish from '@/components/IndexPublish'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect: '/index',
      name:'index'
    },
    {
      path: '/index',
      component: Index,
      // 主页面的四个嵌套路由
      children:[
        {
          path:'/index',
          redirect: '/index/home',
        },
        {
          path:'home',
          component:IndexHome
        },
        {
          path:'message',
          component:IndexMessage
        },
        {
          path:'my',
          component:IndexMy
        },
        {
          path:'publish',
          component:IndexPublish
        },
      ]
    },
    {
      path:'/login',
      component:Login,
      name:'login'
    },
    {
      path:'/topic',
      component:Topic,
    },
    {
      path:'/user',
      component:User
    },
   {
     path:'/not',
     component:NotFound
   }
  ]
})
