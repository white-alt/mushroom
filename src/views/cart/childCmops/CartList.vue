<template>
  <div class="cart-list">
      <Scroll class="content" ref="scroll"> 
           <cart-list-item 
           v-for="(item,index) in cartList"  
           :key="index" :itemInfo="item"></cart-list-item>   
      </Scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from 'views/cart/childCmops/CartListItem'

import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  data() { 
    return {

    }
  },
  components:{
    Scroll,
    CartListItem
  },
  computed: {
      ...mapGetters(['cartList'])
  },
   activated() {
      this.$refs.scroll.refresh()
      
   },
 }
</script>

<style  scoped>
.cart-list{
  height: 100vh;
}
.content{
      height: calc(100% - 44px - 49px - 40px);  
      overflow: hidden;    
  }
</style>