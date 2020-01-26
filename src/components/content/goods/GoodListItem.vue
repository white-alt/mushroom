<template>
  <div class="goods" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p >{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props:{
    goodsItem:{
        type:Object,
        default(){
            return {}
        }
    }
  },
  computed: {
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  data() { 
    return {

    }
  },
  methods: {
    imageLoad(){
         //由于组件复用 导致详情页面的图片加载完毕后 会使主页刷新
         //解决方法一 判断路由再决定要不要发送事件  注意字符串判断需要取放(-1是白表示给字符串内没有该字段)
        //  if( !this.$route.path.indexOf('/home')){
               this.$bus.$emit("itemImageLoad")
               
        //  }else if(!this.$route.path.indexOf('/detail')){
        //     this.$bus.$emit("detailItemImageLoad")
           
        //  }
         //解决方法二可以在主页将刷新事件取消(太麻烦 知道如何取消监听全局事件即可)
         //在主页的deactivated事件中取消全局事件监听 this.$bus.$off('事件名','事件句柄') 
         //当主页不是处于活跃状态的时候就将其监听的全局事件取消


         
    },
    itemClick(){
          // console.log(this.goodsItem.iid)
          this.$router.push('/detail/'+this.goodsItem.iid)
    }
  },
 }
</script>

<style  scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width:48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
    height: 200px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>