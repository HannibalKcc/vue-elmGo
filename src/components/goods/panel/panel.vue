<template>
  <div class="panel">
    <transition name="animSub">
      <div class="detailSub icon-remove_circle_outline" v-show="count > 0" @click="subFood"></div>
    </transition>
    <div class="detailCount">
      <span v-show="count > 0">{{count}}</span>
    </div>
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
      };
    },
    created () {
      this.$store.watch(
        state => state.foodList,
        function () {
          // do something on data change
        }
      );
    },
    methods: {
      subFood: function () {
        let fix = {name: this.details.name, price: this.details.price};
        this.$store.commit('subFood', fix);
      },
      addFood: function (e) {
        let fix = {name: this.details.name, price: this.details.price};
        this.$store.commit('addFood', fix);
        Bus.$emit('jump', e.target.getBoundingClientRect());
      }
    },
    computed: {
      count () {
        let self = this;
        let tmpCount = this.$store.state.foodList.filter(function (item) {
          return self.details.name === item.name;
        });
        if (tmpCount[0]) {
          return tmpCount[0].count;
        } else {
          return 0;
        }
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

  /*组件样式*/
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
    .icon-add_circle {
      display: inline-block;
      vertical-align: middle;
      line-height: 48px;
      font-size: 48px;
      color: rgb(0, 160, 220);
      z-index: 100;
    }
  }
</style>
