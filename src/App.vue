<template>
  <div id="app">
    <my-header :seller="seller"></my-header>
    <div class="tab">
      <div class="tabItem">
        <!--router-link渲染为a标签，利用to属性指定路由-->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tabItem">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tabItem">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import myHeader from 'components/header/header.vue';
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      // vue-resource 发出网络请求
      this.$http.get('/api/seller').then((response) => {
        // right callback
        response = response.body;
        if (response.errno === 0) {
          this.seller = response.data;
//          console.log(this.seller.data.name);
        }
      }, response => {
        // error callback
      });
    },
    components: {
      myHeader
    }
  };
</script>

<!--这里type必须写text/less 编译器方能不报错-->
<style scoped rel="stylesheet/less" type="text/less" lang="less">
  .tab {
    display: flex;
    height: 80px;
    line-height: 80px;
    box-sizing: border-box;
    border-top: 1px solid black;
    border-bottom: 0.5px solid black;
    .tabItem {
      flex-grow: 1;
      text-align: center;
      .router-link-active {
        color: rgb(240, 20, 20);
      }
    }
    a, a:visited, a:active, a:link {
      display: block;
      font-size: 28px;
      color: rgb(77, 85, 93);
      text-decoration: none;
    }
  }
</style>
