<template>
  <div id="detail">
       <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detailnav" ></detail-nav-bar>
       <scroll class="content"  ref="scroll" @scroll="contentScroll" :probeType="3">
       <detail-swiper :top-images="topImages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"> </detail-shop-info>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
       <detail-param-info  :paramInfo="paramInfo" ref="param"></detail-param-info>
       <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
       <detail-goods-list :goods="detailRecommed" ref="goods"></detail-goods-list>
       </scroll>
       <detail-bottom-bar class="detail-bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
       <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
import DetailGoodsList from 'components/content/goods/GoodList'
import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getDetail,Goods,Shop,GoodsParam,getDetailRecommed} from 'network/detail'
import {debounce} from '@/common/utils.js'

export default {
  name: 'Detail',
  data() {
      return {
          id:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo: {},
          detailRecommed:[],
           themeType:[],
           itemIndex:null,
           isShowBackTop:false,  
      }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailGoodsList,
    DetailBottomBar,


    BackTop,
    Scroll
  },
  created() {
        this.id = this.$route.params.id

        getDetail(this.id).then( res => {
          // console.log(res) 
          //获取顶部轮播数据
          const data = res.result
          this.topImages =  data.itemInfo.topImages
          // console.log(this.topImages)
          //获取商品信息
         this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          
        //获取店铺消息
        this.shop = new Shop(data.shopInfo)
        //保存商品的详情数据
         this.detailInfo = data.detailInfo

         //获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
         //获取评论信息
         if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })

        getDetailRecommed().then(res =>{
            //  console.log(res)
             this.detailRecommed.push(...res.data.list)
             console.log(this.detailRecommed)
            
        })

       // this.$nextTick() DOM渲染已经结束的时候会回调的函数 但是图片还是没有加载完 
        
  },
  mounted() {
    const refresh =this.$refs.scroll.refresh
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      }) 
     
  },
  
  methods: {
    imageLoad(){
       this.$refs.scroll.refresh()

       this.themeType=[]
      //获取的事件不同 获取到到的值不同
      this.themeType.push(0)
      this.themeType.push(-this.$refs.param.$el.offsetTop)
      this.themeType.push(-this.$refs.comment.$el.offsetTop)
      this.themeType.push(-this.$refs.goods.$el.offsetTop)
      console.log(this.themeType)
    },
    titleClick(index){
      //  console.log(index)
       this.$refs.scroll.scrollTo(0,this.themeType[index],100)
       

    } ,
    contentScroll(position){

       // 判断backTop的显示时机
        this.isShowBackTop = -position.y  > 1000

          const positionY = position.y
          // console.log(positionY)
          const length = this.themeType.length
          for(let index=0; index < length;index++){
                  // console.log(index)
                  //positionY是负数 数组内是0至-3211 -4444 -5555
                  // for in 里的item是字符串
                  //由于直接判断最终会去不到最后一个值所以需要 增加判断 这里的positionY的负数问题需要注意
                  // this.itemIndex !== index 就是如果该选项的位置于滑动位置重合就不用再重复判断了
              if ( this.itemIndex !== index && ((index<length-1 && positionY < this.themeType[index] && positionY > this.themeType[index+1])||
              (index === length-1 && positionY < this.themeType[index]))){
                      this.itemIndex = index
                      // console.log(index)
                      // 父组件修改子组件中的某个数据 可以先取到(利用ref和$refs)子组件 直接$refs.组件名.某个参数 
                       this.$refs.detailnav.currentIndex = index
                    
              }
          }
        
    },
    backClick(){
          this.$refs.scroll.scrollTo(0,0)
    },
    addToCart(){
       //获取购物车需要展示的信息 添加至购物车
        const product = {}
        product.iamge = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.id = this.id
        // console.log(product)
        //将商品添加到购物车中

        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
        // console.log(this.$store.state.cartList)
    }
  },
 }
</script>

<style  scoped>
  #detail{
    position: relative;
    z-index: 20;
    background-color: #fff;
    height: 100vh;
  }
   .detail-nav-bar{
     position: relative;
     z-index: 9;
     background-color: #fff;
   } 
  .content {
        /* calc中的减号必须有空格 */
        /* 调整滚动区域 */
      height: calc(100% - 44px - 58px);
  }
</style>