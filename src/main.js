// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import App from './App';

import Goods from 'components/goods/goods.vue';
import Ratings from 'components/ratings/ratings.vue';
import Seller from 'components/seller/seller.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
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

const store = new Vuex.Store({
  state: {
    foodList: []
  },
  getters: {
    totalPrice (state) {
      let tmp = 0;
      state.foodList.forEach(function (item) {
        tmp += item.count * item.price;
      });
      return tmp;
    }
  },
  mutations: {
    addFood (state, food) {
      let tmp = {name: food.name, price: food.price, count: 1};
      let arr = state.foodList.map(function (item) {
        return item.name;
      });
      let exeist = arr.indexOf(tmp.name); // 存在位置
      if (exeist >= 0) {
        state.foodList[exeist].count++;// 存在，修改
      } else {
        state.foodList.push(tmp);  // 不存在，新增
      }
    },
    subFood (state, food) {
      let tmp = {name: food.name, price: food.price, count: 1};
      let arr = state.foodList.map(function (item) {
        return item.name;
      });
      let exeist = arr.indexOf(tmp.name); // 存在位置
      if (exeist >= 0) {
        if (state.foodList[exeist].count > 1) {
          state.foodList[exeist].count--;
        } else {
          state.foodList.splice(exeist, 1);
        }
      }
    },
    clear (state) {
      state.foodList = [];
    }
  }
});

/*eslint-disable */
//suppress all warnings between comments
// my:挂载到#app的标签上
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
/*eslint-enable */

// my：设置默认跳转到goods路由
router.push({path: '/goods'});
