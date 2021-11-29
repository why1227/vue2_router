// src/router/index.js就是当前项目的路由模块
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home.vue';
import Movie from '@/components/Movie.vue';
import About from '@/components/About.vue';

// 调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter);

// 创建路由的实例对象
const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About }
  ]
});

// 向外共享路由的实例对象
export default router;
