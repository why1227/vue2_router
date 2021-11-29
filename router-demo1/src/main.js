import Vue from 'vue';
import App from './App2.vue';

// 导入路由模块，目的：拿到路由的实例对象
// 在进行模块花导入的时候，如果给定的是文件夹，
// 则默认发哦如这个文件夹下，名字叫做index.js的文件
import router from './router';

// 导入 bootstrap 样式
import 'bootstrap/dist/css/bootstrap.min.css';
// 全局样式
import '@/assets/global.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // 挂载路由模块
  router: router
}).$mount('#app');
