<template>
  <transition-group name="animJump" tag="div" class="ballsBox"
                    @before-enter="init"
                    @enter="move"
                    @after-enter="noshow"
  >
    <div v-for="ball in balls" v-show="ball.show" :key="ball" class="animBalls icon-add_circle"></div>
  </transition-group>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../../common/js/bus.js';
  export default {
    created () {
      Bus.$on('jump', (posXY) => {
        this.posXY = posXY;
        this.go();
      });
    },
    data () {
      return {
        balls: [
          // {show: true}
        ],
        posXY: {}
      };
    },
    watch: {
      count (val) {
        if (val >= 3) this.count = 0;
      }
    },
    methods: {
      go () {
        this.balls.push({show: true});
      },
      init (d) {  // before-enter
        d.style.left = `${this.posXY.left}px`;
        d.style.bottom = `${1334 - this.posXY.bottom}px`;
      },
      move (d) { // 绑定enter钩子
        this.$nextTick(() => {
          d.style.left = '68px';
          d.style.bottom = '36px';
        });
      },
      noshow (d) {  // 绑定after-enter钩子
        this.balls.shift();
        d.style.display = 'none';
      }
    }
  };
</script>

<style scoped rel="stylesheet/less" type="text/less" lang="less">
  .animJump-enter-active, .animJump-leave-active {
    transition: all .7s linear, bottom .7s cubic-bezier(.09,-0.43,.91,.38);
  }

  .animJump-enter-to {
  }

  /*组件*/
  .ballsBox {
    .animBalls {
      display: inline-block;
      vertical-align: middle;
      line-height: 48px;
      font-size: 48px;
      color: rgb(0, 160, 220);
      z-index: 100;
      position: fixed;
      left: 0;
      bottom: 0;
    }
  }
</style>
