<template>
  <div class="shopcart">
    <div class="shopWrap">
      <span class="icon-shopping_cart" :class="{setBlue: allPrice}" @click="toggleListShow"></span>
      <span class="price">¥{{allPrice}}</span>
      <span class="fee">另需配送费¥{{deliveryPrice}}元</span>
    </div>
    <input type="button" class="sendWrap" :class="{setGreen: enableSend}" :value="sendText" :disabled="enableSend">
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../../common/js/bus.js';
  export default {
    data () {
      return {
        shoplist: [],
        enableSend: false
      };
    },
    props: {
      minPrice: '',
      deliveryPrice: ''
    },
    computed: {
      allPrice: function () {
        return this.$store.getters.totalPrice;
      },
      sendText: function () {
        if (this.allPrice >= this.minPrice) {
          this.enableSend = true;
          return '结算';
        } else {
          this.enableSend = false;
          return '￥' + this.minPrice + '起送';
        }
      }
    },
    methods: {
      toggleListShow () {
        Bus.$emit('toggle-shopcart-list-show');
      }
    }
  };
</script>

<style scoped rel="stylesheet/less" type="text/less" lang="less">
  .shopcart {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 96px;
    z-index: 50;
    background: #141d27;
    .shopWrap {
      flex-grow: 1;
      .icon-shopping_cart {
        display: inline-block;
        position: absolute;
        bottom: 4px;
        left: 24px;
        width: 88px;
        height: 88px;
        margin-top: 24px;
        border: 12px solid #141d27;
        border-radius: 50%;
        background: rgb(43, 52, 60);
        color: rgb(128, 138, 138);
        &:before {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -25px 0 0 -25px;
          font-size: 50px;
        }
      }
      .setBlue {
        background: rgb(0, 160, 220);
        color: rgb(255, 255, 255);
      }
      .price {
        display: inline-block;
        margin-top: 24px;
        margin-left: 160px;
        padding-right: 24px;
        border-right: 2px solid rgba(255, 255, 255, 0.1);
        font-size: 32px;
        font-weight: 700;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.4);
      }
      .fee {
        display: inline-block;
        margin-left: 24px;
        font-size: 24px;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .sendWrap {
      flex: 0 0 210px;
      width: 210px;
      border: 0;
      background: rgba(255, 255, 255, 0.2);
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);
    }
    .setGreen {
      background: rgb(1, 180, 60);
    }
  }
</style>
