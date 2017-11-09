<template>
	<div>		
		<modal v-if="delCart">
			<img src="../../static/l_modal.jpg" slot="imgModal" />
			<span slot="info">确认要从购物车删除吗？</span>
			<button slot="cancel" @click="removeModel">再想想</button>
			<button class="btn_comf" slot="comfirm" @click="delCartItem()">删掉！</button>
		</modal>
		<com-header :rout="rout"></com-header>
		<div class="cart_title">
			<img src="../../static/logo.png"/>
			<p>购物车</p>
			<status :nowpage='nowpage'></status>
		</div>
		<div class="cart_content">
			<div class="cart_content_header"><div class="cart_img"><div @click="seletAll()"><div :class="{selall:selAll}"></div></div></div><div class="cart_item">商品信息</div><div class="">单价</div><div class="cart_num">数量</div><div class="">总价</div><div>操作</div></div>
			<ul>
				<li v-for="(item,index) in cartList">
					<div class="cart_content_body">
						<div class="cart_f">
							<div class="cart_checkbox" @click="toggleCheck(item)"><div :class="{checked:item.checked}"></div></div>
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
					 --><div class="couter">
							<button @click="editCart('minu',item)">-</button><!--
						 --><input type="text" name="goodsnum" id="goodsnum" value=""  v-model.number="item.productNum" @change="editCart('',item)" /><!--
						 --><button @click="editCart('add',item)">+</button>	
						</div><!--
					 --><div class="cart_total">
							{{item.salePrice*1000*item.productNum/1000}}
						</div>	
						<div class="goods_delete">
							<span @click="delItem(item.productId)">删除</span>
						</div>
					</div>
				</li>
			</ul>
			<div class="total_cart">
				<button :class="{'btn_disable':selCount==0}" @click="cartSumit"><a >提交订单</a></button>
				<div class="total_price">总价：{{totalPrice}}元</div>
			</div>
		</div>
		<com-footer></com-footer>
	</div>
</template>

<script>
	import ComHeader from '@/views/ComHeader'	
	import ComFooter from '@/views/ComFooter'	
	import Modal from '@/components/Modal'
	import Status from '@/components/Status'
	import axios from 'axios'
	export default{
		components:{
			ComHeader,
			ComFooter,
  			Modal,
  			Status
		},
		data () {
		   	return {
		    	num:'',
		    	cartList:[],
		    	rout:false,
		    	delCart:false,
		    	checkSumit:0,
				nowpage:1		    	
		    }
		 },
		computed:{
			selAll(){
				return this.selCount==this.cartList.length
			},
			selCount(){
				var i=0
				this.cartList.forEach((item)=>{
					if(item.checked=='1'){
						i++
					}
				})
				return i
			},
			totalPrice(){
				var sum=0
				this.cartList.forEach((item)=>{
					if(item.checked=='1'){
						sum+=item.salePrice*1000*item.productNum/1000;
					}
				})
				return sum
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
		  	},
		  	removeModel(){
		  		this.delCart=false
		  	},
		  	delItem(productId){
		  		this.productId=productId
		  		this.delCart=true
		  	},
		  	delCartItem(){
		  		axios.post('/users/cartDel',{productId:this.productId}).then((response)=>{
		  			let res=response.data
		  			if(res.status=='0'){
		  				this.delCart=false;
		  				this.init()
		  			}
		  		})
		  	},
		  	editCart(flag,item){
		  		if(flag=='add'){
		  			item.productNum++
		  		}
		  		if(flag=='minu'){
		  			if(item.productNum>1){
		  				item.productNum--		  				
		  			}
		  		}
		  		if(typeof item.productNum!='number' || item.productNum<1){
		  			alert('请输入大于0的数字')
		  			return
		  		}
		  		axios.post('/users/cartEdit',{
		  			productId:item.productId,
		  			productNum:item.productNum,
		  			checked:item.checked
		  		})
		  	},
		  	toggleCheck(item){
				item.checked=!item.checked
				this.editCart('',item)
		  		
		  	},
		  	seletAll(){
		  		var sel=!this.selAll;
		  		this.cartList.forEach((item)=>{
		  			item.checked=sel
		  		})
		  		axios.post('/users/selAll',{
		  			selAll:sel
		  		})
		  	},
		  	cartSumit(){
		  		if(this.selCount>0){
//					let orderId=new Date().getTime()
//					let goodsList=[]
//					this.cartList.forEach((item)=>{
//						if(item.checked==1){
//							goodsList.push(item)
//						}
//					})
//					console.log(goodsList)
//		  			axios.post('users/addOrder',{
//		  				goodsList:goodsList,
//		  				orderId:orderId,
//		  				orderTotal:this.totalPrice
//		  			})
		  			this.$router.push({
		  				path:'/address'
		  			})
		  		}
		  	}
		  	
		},
		mounted(){
			this.init();
		}
		
	}
</script>

