<template>
  <div class="panel">
    <transition name="animSub">
      <div class="detailSub icon-remove_circle_outline" v-show="count > 0" @click="subFood"></div>
    </transition>
    <div class="detailCount">
      <span v-show="count > 0">{{count}}</span>
      <!--<span v-show="details.count > 0">{{details.count}}</span>-->
    </div>
    <div class="detailAdd icon-add_circle" @click="addFood"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../../common/js/bus.js';
  export default {
//    没有设置接受函数
    created () {
      let self = this;
      Bus.$on('update-shoplist', function (foodName, foodPrice, foodCount) {
        if (foodName === self.details.name) {
          self.count = foodCount;
        }
      });
    },
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
//        if (this.details.count > 0) {
//          this.details.count--;
//          this.count = this.details.count;
//          return;
//        }
        if (this.count > 0) this.count--;
      },
      addFood: function () {
//        if (this.details.count > 0) {
//          this.details.count++;
//          this.count = this.details.count;
//          return;
//        }
        this.count++;
      }
    },
    watch: {
      count: function () {
        Bus.$emit('update-shoplist', this.details.name, this.details.price, this.count);
      }
    }
  }
  ;
</script>

<style scoped rel="stylesheet/less" type="text/less" lang="less">
  /*动画效果*/
  .animSub-enter-active, .animSub-leave-active {
    transition: all .3s linear;
  }

  .animSub-enter, .animSub-leave-to {
    transform: translateX(48px) rotate(180deg);
    opacity: 0;
  }

  .panel {
    /*display: inline-block;*/
    float: right;
    vertical-align: middle;
    .detailSub {
      display: inline-block;
      vertical-align: middle;
      line-height: 48px;
      font-size: 48px;
      color: rgb(0, 160, 220);
    }
    .detailCount {
      display: inline-block;
      width: 48px;
      text-align: center;
      span {
        vertical-align: middle;
        font-size: 20px;
        line-height: 48px;
        color: rgb(143, 157, 159);
      }
    }
    .detailAdd {
      display: inline-block;
      vertical-align: middle;
      line-height: 48px;
      font-size: 48px;
      color: rgb(0, 160, 220);
    }
  }
</style>
