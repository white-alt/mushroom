<template>

  <div class="check-button" :class="{'check':isCheck}" >
     <img src="../../../assets/img/cart/tick.svg" >
  </div>

</template>

<script>

export default {
  name: 'check-button',
  data() { 
    return {
      
    }
  },
  props:{
     isCheck:{
         type:Boolean,
         default:false
     }       
  },
}
</script>

<style  scoped>
.check-button{ 
    border-radius: 50%;
    border:1px solid #aaa;
}
.check{
  background-color: var(--color-tint);
}
</style>