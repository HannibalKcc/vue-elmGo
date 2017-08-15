<template>
  <div class="shopcartList" v-show="isShow">
    <div class="contentBox">
      <div class="title">
        <span class="text">购物车</span>
        <span class="clearList" @click="clearList">清空</span>
      </div>
      <ul>
        <li class="foodsdetail" v-for="details in foodList">
          <span class="name">{{details.name}}</span>
          <span class="price">¥{{details.price}}</span>
          <panel :details="details"></panel>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import panel from '../panel/panel.vue';
  import Bus from '../../../common/js/bus.js';
  export default {
    components: {
      panel
    },
    created () {
      let self = this;
      Bus.$on('toggle-shopcart-list-show', function () {
        self.isShow = !self.isShow;
      });
    },
    data () {
      return {
        isShow: false
      };
    },
    computed: {
      foodList () {
        return this.$store.state.foodList;
      }
    },
    methods: {
      clearList: function () {
        this.$store.commit('clear');
      }
    }
  };
</script>

<style scoped rel="stylesheet/less" type="text/less" lang="less">
  .shopcartList {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, .6);
    backdrop-filter: blur(10px); // 只支持ios端
    z-index: 49;
    .contentBox {
      width: 100%;
      max-height: 611px;
      position: fixed;
      bottom: 96px;
      left: 0;
      background: rgb(255, 255, 255);
      .title {
        padding: 0 36px;
        overflow: hidden;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        .text {
          float: left;
          font-size: 28px;
          font-weight: 200;
          line-height: 80px;
          color: rgb(7, 17, 27);
        }
        .clearList {
          float: right;
          font-size: 24px;
          line-height: 80px;
          color: rgb(0, 160, 220);
        }
      }
      ul {
        max-height: 531px;
        overflow: auto;
        .foodsdetail { // li
          position: relative;
          height: 48px;
          padding: 24px 36px;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
          .name {
            font-size: 28px;
            line-height: 48px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            top: 24px;
            right: 204px;
            float: right;
            font-size: 28px;
            font-weight: 700;
            line-height: 48px;
            color: rgb(240, 153, 159);
          }
        }
      }
    }
  }
</style>
