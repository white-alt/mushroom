<template>
  <div class="wrapper" ref="wrapper">
      <div class="content"> 
          <slot></slot>
      </div> 
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  components:{
     BScroll
  },
  props:{
   probeType:{
     type:Number,
     default:0
   },
   pullUpLoad:{
     type:Boolean,
     default:false
   }

  },
  data() { 
    return {
        scroll:null
    }
  },
  mounted() {
       this.scroll = new BScroll(this.$refs.wrapper,{
         //click为true就是滚动里面的div等元素不能监听点击事件 而button按钮类的可以监听点击事件
           click:true,
           //参数为0、1、2、3 
           probeType:this.probeType,
           pullUpLoad:this.pullUpLoad
       })

       this.scroll.on("scroll",(position)=>{
             this.$emit('scroll',position)         
       })

       //监听上拉加载完毕事件
    
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      

  },
  methods: {
    scrollTo(x,y,time=300){
      //先判断this.scroll有没有值 再执操作
     this.scroll &&  this.scroll.scrollTo(x,y,time)
    },
     refresh(){
      this.scroll && this.scroll.refresh()
     },
     finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
     }
  },
 }
</script>

<style scoped>
  
</style>