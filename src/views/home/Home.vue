<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control :titles="['流行','新款','精选']"  
     class="tab-control" @tabClick="tabClick" ref="tabControl2"
      v-show="isTabFixed"
     />
  <scroll class="content" ref="scroll" @scroll="ContentScroll" :probe-type="3" 
  :pull-up-load="true" @pullingUp="loadMore" >
     <home-swiper :banners="banners"  @swiperImageLoad="getTabControlOffset"/>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view/>
     <tab-control :titles="['流行','新款','精选']"  
      @tabClick="tabClick" ref="tabControl"
     />
     <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/BackTop'
import {debounce} from '@/common/utils.js'


import {getHomeMultidata,
        getHomeGoods} from 'network/home.js'



export default {
  name: 'Home',
  components:{ 
    HomeSwiper,
    RecommendView,
    FeatureView,


    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
     //1、请求多个数据
     //这里要写this不然会默认执行导入的方法
     //包装函数 具体的实现写在medthods
     this.getHomeMultidata(),
     //2、请求推荐商品数据
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
  

      
  },
  mounted() {
    //监听item中图片加载完成 节流  
      const refresh =this.$refs.scroll.refresh
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })   
  // 获取tabControl的offsetTop
  //所以的组件都是$el用于获取元素的
   
     
   
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
    
  },
  activated() {
       this.$refs.scroll.scrollTo(0,this.saveY,0)
       this.$refs.scroll.refresh()
    },
    deactivated() {
      // console.log(this.$refs.scroll.scroll.y)
       this.saveY=this.$refs.scroll.scroll.y 
       // 取消全局事件的监听 需要加上事件和函数  函数若不是全局的 需要抽离至变量中
      
       
    },
  data() { 
    return {
       banners:[],
       recommends:[],
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]}
       },
       currentType:'pop',
       isShowBackTop:false,
       timer:null,
       tabOffsetTop:0,
       isTabFixed:false,
       saveY:0,
      
    }
  },
  
  methods: {
    /**
     * 事件监听
     */
    tabClick(index){
   
     switch (index) {
       case 0:
           this.currentType = 'pop'
         break;
      case 1:
        this.currentType ='new'
        break;
      case 2:
       this.currentType ='sell'
        break;
     }
     

     //两个tabControl 点击不同步 解决方案
     this.$refs.tabControl2 .currentIndex= index
     this.$refs.tabControl.currentIndex= index
    },
    backClick(){
          this.$refs.scroll.scrollTo(0,0)
    },
    ContentScroll(position){
       //判断BackTop是否显示     
      this.isShowBackTop = -position.y  > 1000
       // 决定tabContol是否吸顶
       this.isTabFixed = -position.y  >  this.tabOffsetTop
    },
    //下拉加载更多
    loadMore(){
       this.getHomeGoods(this.currentType)
    },
    getTabControlOffset(){

        this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
    },

    /**
     *  网络请求相关
     */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{ 
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
     })
    },
     getHomeGoods(type){
          const page = this.goods[type].page+1;
           getHomeGoods(type,page).then(res=>{
            //  console.log(res)
              this.goods[type].list.push(...res.data.list)  
              this.goods[type].page+=1
              console.log(this.goods[type].list)      
              // console.log(this.goods["pop"].list)

              //完成上拉加载更多
               this.$refs.scroll.finishPullUp()
              
     })

     }

  },
 }
</script>

<style scoped>
#home{
  /* padding-top:44px; */
  height: 100vh;
  position: relative;
}
   .home-nav{
     background-color: var(--color-tint);
     color:#fff;
     /* position: fixed;
     left:0;
     right:0;
     top:0;
     z-index: 9; */
     position: relative;
     z-index: 9;
   }
   .content{
     position: absolute;
     top:44px;
     bottom:49px;
     right:0px;
     left:0px;
  
   }
   .tab-control{
     position: relative;
     z-index: 9;

   }

</style>