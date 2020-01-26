<template>
  <div class="cart">
     <nav-bar class="nav-bar"> 
       <div slot="center">购物车({{Length}})</div>
     </nav-bar>
     <cart-list></cart-list>
     <cart-botton-bar class="cart-botton-bar"></cart-botton-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from 'views/cart/childCmops/CartList'
import CartBottonBar from 'views/cart/childCmops/CartBottonBar'


import {mapGetters} from 'vuex'
export default {
  name: 'Cart',
  data() { 
    return {

    }
  },
  components:{
    NavBar,
    CartList,
    CartBottonBar
  },
  computed: {

    // 直接在vuex 的getter中将length抽取
    //  ...mapGetters(['cartLength'])
    //也可使用对象语法 取自己需要的名字 
    ...mapGetters({"Length":'cartLength'})
    
  },
 }
</script>

<style  scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
  }
  .cart-botton-bar{
    position: relative;
    bottom:150px;
  }
</style>