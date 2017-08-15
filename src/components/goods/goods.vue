<!--在main.js中引入并在app.vue中调用router-view标签-->
<template>
  <div v-if="goods" class="goods">
    <!--左边菜单-->
    <div class="leftWrap swiper-container" ref="leftSwiper">
      <ul class="swiper-wrapper">
        <li v-for="items in goods" class="contentBox swiper-slide">
          <div class="text">
            <div v-if="items.type>0" class="icon" :class="iconMap[items.type]"></div>
            {{items.name}}
          </div>
        </li>
      </ul>
    </div>
    <!--右边菜单-->
    <div class="rightWrap" ref="rightSwiper">
      <ul class="swiper-wrapper">
        <li v-for="items in goods" class="classBox swiper-slide">
          <div class="foodsBox">
            <div class="title">{{items.name}}</div>
            <div v-for="details in items.foods" class="foodsDetailBox">
              <div class="detailLeft">
                <img :src="details.icon" alt="">
              </div>
              <div class="detailRight">
                <div class="detailName">{{details.name}}</div>
                <div v-if="details.description" class="detailDescription">{{details.description}}</div>
                <div class="detailSellCount">月售{{details.sellCount}}份</div>
                <div class="detailRating">好评率{{details.rating}}%</div>
                <div class="detialOperationBox">
                  <div class="detailPrice">¥{{details.price}}</div>
                  <div v-if="details.oldPrice" class="detailOldPrice">
                    ¥{{details.oldPrice}}
                  </div>
                  <panel :details="details"></panel>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--动画小球-->
    <jump-ball></jump-ball>
    <!--购物车-->
    <shopcart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shopcart>
    <!--购物车清单-->
    <shopcart-list></shopcart-list>
  </div>
</template>

<script type="text/ecmascript-6">
  //  webpack中,import与moduels.exports不能同时使用，单纯放到common文件夹中会报错，把文件放在static文件夹中是个可行的方法
  import jumpBall from './jumpBall/jumpBall.vue';
  import shopcart from './shopcart/shopcart.vue';
  import panel from './panel/panel.vue';
  import shopcartList from './shopcartList/shopcartList.vue';
  import Swiper from '../../../static/swiper.min.js';
  export default {
    components: {
      jumpBall,
      shopcart,
      panel,
      shopcartList
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        iconMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      };
    },
    created () {
      // 利用vueresource请求数据
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initBScroll();
          });
        }
      });
    },
    methods: {
      _initBScroll () {
        let self = this;
        let jContentBox = document.getElementsByClassName('contentBox');
        jContentBox[0].style.background = 'white';
        this.leftSwiper = new Swiper(this.$refs.leftSwiper, {
          direction: 'vertical',
          slidesPerView: 'auto',  // 能够同时显示的内容项数量
          mousewheelControl: true,
          freeMode: true,  // 自由模式
          observer: true,
          onTap: function (leftSwiper) {
            // 清空样式
            for (let i = 0; i < jContentBox.length; i++) {
              jContentBox[i].style.background = '';
            }
            // 选中显白
            jContentBox[leftSwiper.clickedIndex].style.background = 'white';
            // 右swiper匹配
            self.rightSwiper.slideTo(leftSwiper.clickedIndex);
          }
        });
        this.rightSwiper = new Swiper(this.$refs.rightSwiper, {
          direction: 'vertical',
          slidesPerView: 'auto',  // 能够同时显示的内容项数量
          mousewheelControl: true,
          freeMode: true,  // 自由模式
          observer: true,
          onSlideChangeEnd: function (rightSwiper) {
            // 清空样式
            for (let i = 0; i < jContentBox.length; i++) {
              jContentBox[i].style.background = '';
            }
            // 选中显白
            jContentBox[rightSwiper.activeIndex].style.background = 'white';
          }
        });
      }
    }
  };
</script>

<style scoped rel="stylesheet/less" type="text/less" lang="less">
  // 引入swiper样式
  @import "../../../static/swiper.min.css";
  // 引入icon样式
  @import "../../common/less/style.css";

  .goods {
    display: flex;
    position: absolute;
    top: 348px;
    left: 0;
    bottom: 76px;
    width: 100%;
    /*height: 900px;*/
    overflow: hidden;
    /*左边分类*/
    .leftWrap {
      display: flex;
      flex: 0 0 160px;
      width: 160px;
      background: #f3f5f7;
      font-size: 24px;
      line-height: 28px;
      font-weight: 200;
      ul {
        display: flex;
        .contentBox {
          display: table;
          width: 112px;
          height: 108px;
          padding: 0 24px;
          line-height: 28px;
          .text {
            display: table-cell;
            font-size: 24px;
            line-height: 28px;
            font-weight: 200;
            vertical-align: middle;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .icon {
              display: inline-block;
              width: 24px;
              height: 24px;
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
          }
        }
      }
    }
    /*右边菜品*/
    .rightWrap {
      flex-grow: 1;
      .classBox {
        .foodsBox {
          .title {
            box-sizing: border-box;
            width: 100%;
            height: 52px;
            border-left: 2px solid #d9dde1;
            padding-left: 26px;
            background: #f3f5f7;
            font-size: 24px;
            line-height: 52px;
            color: rgb(147, 153, 159);
          }
          .foodsDetailBox {
            display: flex;
            position: relative;
            padding: 36px;
            .detailLeft {
              vertical-align: middle;
              margin-right: 20px;
              flex: 0 0 114px;
              width: 114px;
              img {
                width: 114px;
                height: 114px;
              }
            }
            .detailRight {
              flex-grow: 1;
              margin-top: 2px;
              vertical-align: middle;
              .detailName {
                font-size: 28px;
                line-height: 28px;
                color: rgb(7, 17, 27);
              }
              .detailDescription {
                margin: 16px 0;
                font-size: 20px;
                color: rgb(147, 153, 159);
              }
              .detailSellCount {
                display: inline-block;
                margin-right: 24px;
                font-size: 20px;
                color: rgb(147, 153, 159);
              }
              .detailRating {
                display: inline-block;
                font-size: 20px;
                color: rgb(147, 153, 159);
              }
              .detialOperationBox {
                .detailPrice {
                  display: inline-block;
                  margin-right: 16px;
                  font-size: 28px;
                  line-height: 28px;
                  color: red;
                }
                .detailOldPrice {
                  display: inline-block;
                  font-size: 20px;
                  line-height: 28px;
                  color: rgb(147, 153, 159);
                  text-decoration: line-through;
                }
              }
            }
          }
        }
      }
    }
  }

  .swiper-slide {
    height: auto;
  }
</style>
