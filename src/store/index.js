import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//安装插件
Vue.use(Vuex)

//创建Store对象
 //若mutations中方法过多可以考虑抽取

 const state = {
    cartList: []
 }

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

//导出 挂载到Vue上 
export default store