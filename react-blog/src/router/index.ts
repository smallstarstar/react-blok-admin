import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes: any = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/pages/login/index.vue')
  // },
  {
    path: '/',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/article-detail',
    name: 'article-detail',
    component: () => import('@/components/article-detail/index.vue')
  },
  {
    path: '/my-center',
    component: () => import('@/views/my-center/index.vue'),
    children: [
      {
        path: '',
        redirect: 'user-info'
      },
      {
        path: 'user-info',
        name: 'user-info',
        component: () => import('@/components/user-info/index.vue')
      },
      {
        path: 'user-care',
        name: 'user-care',
        component: () => import('@/components/user-care/index.vue')
      },
      {
        path: 'my-articles',
        name: 'my-articles',
        component: () => import('@/components/my-articles/index.vue') 
      }
    ]
  }
]

const router: any = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
});


/**
 * 添加路由守卫
 */
router.beforeEach((to: any, from: any, next: any) => {
  const token = localStorage.getItem('userInfoOfBlok') ? true : false;
  if (to.path === '/') {
    next();
  } else {
    token ? next() : next('/');  
  }
})

export default router
