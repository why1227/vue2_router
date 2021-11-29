import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/components/MyLogin.vue';
import Home from '@/components/MyHome.vue';
import Users from '@/components/menus/MyUsers.vue';
import Goods from '@/components/menus/MyGoods.vue';
import Orders from '@/components/menus/MyOrders.vue';
import Rights from '@/components/menus/MyRights.vue';
import Settings from '@/components/menus/MySettings.vue';
import UserDetail from '@/components/user/MyUserDetail.vue';

import pathArr from '@/router/pathArr.js';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/home/users',
      children: [
        { path: 'users', component: Users },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'rights', component: Rights },
        { path: 'settings', component: Settings },
        // 用户详情页的路由规则
        { path: 'UserInfo/:id', component: UserDetail, props: true }
      ]
    }
  ]
});

// 全局前置守卫
router.beforeEach(function(to, from, next) {
  if (pathArr.indexOf(to.path) != -1) {
    const token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
