import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


import { userLoginStore } from "@/stores/userLogin";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register/index.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  // 1. 获取 Pinia Store（在守卫内部调用，确保 Pinia 已初始化）
  const store = userLoginStore();

  // 2. 定义“无需登录即可访问的白名单页面”
  const whiteList = ['/login','/register'];
  if (to.path === '/login' && store.token) {
    next('/'); // 直接跳转到主页
  }

  // 3. 判断：如果是白名单页面，直接放行
  if (whiteList.includes(to.path)) {
    next();
    return; // 必须 return，避免后续代码执行
  }

  // 4. 非白名单页面：检查 token
  if (!store.token) {
    // 无 token，跳转到登录页
    next('/login');
  } else {
    // 有 token，正常放行
    next();
  }
});
export default router
