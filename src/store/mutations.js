export default {
  // mutations唯一的目的就是修改state中的状态
  //方法分开写可以跟踪变量
  //一个方法你尽可能只做一件事情
  //mutations中的每个方法尽可能完成的事情比较单一一些
  addCounter(state, payload) {
    payload.count += 1
  },
  addToCart(state, payload) {
    payload.count = 1
    state.cartList.push(payload)
    payload.checked = true
  }

}