// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Goods from 'components/goods/goods.vue';
import Ratings from 'components/ratings/ratings.vue';
import Seller from 'components/seller/seller.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
// my：原生的new Vue代码不能满足router的要求
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// });

// my：应该这么写
// Vue.use(VueRouter);// 上方引入过，此处不再引入
const routes = [
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
];

const router = new VueRouter({
  routes
});

/*eslint-disable */
//suppress all warnings between comments
// my:挂载到#app的标签上
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
/*eslint-enable */

// my：设置默认跳转到goods路由
router.push({path: '/goods'});
