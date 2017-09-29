<template>
	<div>		
		<modal></modal>
		<com-header></com-header>
		<div class="cart_title"><img src="../../static/logo.png"/><p>购物车</p></div>
		<div class="cart_content">
			<div class="cart_content_header"><div class="cart_img">&nbsp;</div><div class="cart_item">商品信息</div><div class="">单价</div><div class="cart_num">数量</div><div class="">总价</div><div>操作</div></div>
			<ul>
				<li v-for="(item,index) in cartList">
					<div class="cart_content_body">
						<div class="cart_f">
							<div class="cart_checkbox"></div>
							<img v-bind:src="'/static/'+item.productImage" alt="" />
						</div><!--
					 --><div class="cart_good">
							<div class="cart_goods">
								<span class="cart_goods_span">{{item.productName}}</span>
							</div>
						</div><!--
					 --><div class="cart_price">
							{{item.salePrice}}
						</div><!--
					 --><div>
							<Counter v-bind:num='item.productNum' v-on:incre='addbtn' v-on:decre='decrease'></Counter>
						</div><!--
					 --><div class="cart_total">
							{{item.salePrice*item.productNum}}
						</div>	
						<div class="goods_delete">
							<span>删除</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<com-footer></com-footer>
	</div>
</template>

<script>
	import ComHeader from '@/views/ComHeader'	
	import ComFooter from '@/views/ComFooter'	
	import Counter from '@/components/couter'
	import Modal from '@/components/Modal'
	import axios from 'axios'
	export default{
		components:{
			ComHeader,
			ComFooter,
  			Counter,
  			Modal
		},
		data () {
		   	return {
		    	num:'',
		    	cartList:[]
		    }
		  },

		methods:{
		  	addbtn(){
		  		this.num++
		  	},
		  	decrease(){
		  		if(this.num>1){
		  			this.num--		  			
		  		}
		  	},
		  	init(){
		  		axios.get('/users/cartList').then((response)=>{
		  			let res=response.data;
		  			this.cartList=res.result
		  		})
		  	}
		},
		mounted(){
			this.init()
			console.log(this.cartList)
		}
		
	}
</script>

