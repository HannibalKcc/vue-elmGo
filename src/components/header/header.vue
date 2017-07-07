<template>
  <div class="header">
    <div class="contentWrap">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="iconMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <span v-if="seller.supports" class="detail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </span>
    </div>
    <div class="bullentinWrap">
      <div v-if="seller.bulletin" class="text">
        <div class="bullentIcon"></div>
        {{seller.bulletin}}
        <i></i>
      </div>
    </div>
    <div v-if="seller.avatar" class="background">
      <img :src="seller.avatar" alt="">
    </div>
  </div>
</template>
<script text="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        iconMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      };
    },
    created () {
    }
  }
  ;
</script>

<style scoped scoped rel="stylesheet/less" type="text/less" lang="less">
  .header {
    position: relative;
    background: rgba(7, 17, 27, 0.5);
  }

  /*内容区*/
  .contentWrap {
    position: relative;
    font-size: 0;
    .avatar {
      display: inline-block;
      margin: 48px 32px 36px 48px;
      img {
        width: 128px;
        height: 128px;
      }
    }
    .content {
      display: inline-block;
      font-size: 32px;
      color: #fff;
      .title {
        margin: 4px 0 16px;
        font-weight: bold;
        .brand {
          display: inline-block;
          width: 60px;
          height: 36px;
          margin-right: 12px;
          vertical-align: top;
          background: url("../../../resource/img/brand@2x.png");
        }
        .name {
          font-size: 32px;
          line-height: 36px;
        }
      }
      .description {
        margin-bottom: 20px;
        font-size: 24px;
      }
      .support {
        position: relative;
        margin-bottom: 4px;
        font-size: 0;
        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 8px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
        & .decrease {
          background: url("../../../resource/img/decrease_1@2x.png");
        }
        & .discount {
          background: url("../../../resource/img/discount_1@2x.png");
        }
        & .guarantee {
          background: url("../../../resource/img/guarantee_1@2x.png");
        }
        & .invoice {
          background: url("../../../resource/img/invoice_1@2x.png");
        }
        & .special {
          background: url("../../../resource/img/special_1@2x.png");
        }
        .text {
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
    /*定位的活动详情*/
    .detail {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      background: rgba(0, 0, 0, .2);
      border: 14px solid rgba(0, 0, 0, 0);
      border-radius: 100px;
      color: #fff;
      .count {
        margin-right: 4px;
        font-size: 20px;
        line-height: 24px;
        vertical-align: middle;
      }
      .icon-keyboard_arrow_right{
        font-size: 20px;
        vertical-align: middle;
      }
    }
  }

  /*通告区*/
  .bullentinWrap {
    height: 56px;
    line-height: 56px;
    background: rgba(7, 17, 27, 0.2);
    .text {
      padding: 0 24px;
      font-size: 20px;
      font-weight: 200;
      line-height: 56px;
      color: white;
      /*超出隐藏的三行代码*/
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .bullentIcon {
        display: inline-block;
        margin-right: 8px;
        width: 44px;
        height: 24px;
        background: url("../../../resource/img/bulletin@2x.png");
        vertical-align: middle;
      }
    }
  }

  /*定位在下面的背景区*/
  .background {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
