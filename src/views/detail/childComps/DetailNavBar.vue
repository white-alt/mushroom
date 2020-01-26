<template>
  <div class="DetailNavBar">
      <nav-bar>
          <div slot="left" class="back" @click="backHome()">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class='title'>
              <div v-for="(item,index) in titles"  class="title-item" 
              @click="clickItem(index)" :class="{active:currentIndex === index}">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() { 
    return {
         titles:['商品','参数','评论','推荐'],
         currentIndex:0
    }
  }
  ,
  components:{
      NavBar
  },
  methods: {
      clickItem(index){
          this.currentIndex = index 
          this.$emit('titleClick',index)
     
      },
      backHome(){
          this.$router.back()
      }
  },
 }
</script>

<style  scoped>
 .title{
     display: flex;
 }
 .title-item{
     flex:1;

 }
 .active{
     color:var(--color-high-text);
 }
 .back img {
     margin-top:12px;
 }
</style>