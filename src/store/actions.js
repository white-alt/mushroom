export default {
    addCart(context, payload) {
      //获取数组中重复的项方案1
      // let oldProduct = null

      // for(let item of state.cartList){
      //     if(item.id === payload.id){
      //         oldProduct = item
      //     }
      // }
      // 获取数组中重复的项方案2

      //find函数返回数组中所有满足条件的项
      let oldProduct = context.state.cartList.find(item => item.id === payload.id)

      if (oldProduct) {
        //   oldProduct.count += 1
        context.commit('addCounter', oldProduct)
      } else {
        //   payload.count = 1
        //   state.cartList.push(payload)
        context.commit('addToCart', payload)
      }

    }
}