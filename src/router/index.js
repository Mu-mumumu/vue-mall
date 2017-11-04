import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import GoodsList from './../views/GoodsList'
import Address from'@/views/Address'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
//	mode:'history',
  routes: [
    {
      path: '',
      name: 'GoodsList',
      component: GoodsList,
      children:[
//   	 {path:'title',name:'title',component:Title},
//   	 {path:'img',name:'img',component:Image}
      ]
    },
    {
    	path:'/cart',
    	name:'/cart',
    	component:Cart    	
    },
    {
    	path:'/address',
    	name:'/address',
    	component:Address    	
    }    
    
  ]
})
