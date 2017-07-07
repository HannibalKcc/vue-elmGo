<template>
  <div class="panel">
    <div class="detailSub icon-remove_circle_outline" v-show="count" @click="subFood"></div>
    <div class="detailCount" v-show="count">{{count}}</div>
    <div class="detailAdd icon-add_circle" @click="addFood"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../../common/js/bus.js';
  export default {
    props: {
      details: {}
    },
    data () {
      return {
        count: 0
      };
    },
    methods: {
      subFood: function () {
        this.count--;
      },
      addFood: function () {
        this.count++;
      }
    },
    watch: {
      count: function () {
        Bus.$emit('update-shoplist', this.details.name, this.details.price, this.count);
      }
    }
  };
</script>

<style scoped rel="stylesheet/less" type="text/less" lang="less">
  .panel {
    /*display: inline-block;*/
    float: right;
    .detailSub {
      display: inline-block;
      vertical-align: middle;
      line-height: 28px;
      font-size: 28px;
      color: blue;
    }
    .detailCount {
      display: inline-block;
      width: 48px;
      vertical-align: middle;
      text-align: center;
      font-size: 20px;
      line-height: 28px;
      color: rgb(143, 157, 159);
    }
    .detailAdd {
      display: inline-block;
      vertical-align: middle;
      line-height: 28px;
      font-size: 28px;
      color: blue;
    }
  }
</style>
