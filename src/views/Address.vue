<template>
	<div>
		<com-header :rout="rout" :toCart="toCart"></com-header>
		<div class="cart_title">
			<img src="../../static/logo.png"/>
			<ul class="order_state">
				<li class="step_cur">1.确认订单</li><!--
			 --><div></div><!--
			 --><li >2.付款</li><!--
			 --><div></div><!--
			 --><li>&nbsp;&nbsp;&nbsp;3.确认收货</li><!--
			 --><div></div><!--
			 --><li>4.评价</li>
			</ul>
		</div>
		<div class="adr_title">
			地址选择
		</div>
		<div class="adrSel" >
			
			<div v-for="(item,index) in addressListControl" :class="{'active':checkIndex==index}" @click="checkIndex=index;" >
				<span>{{item.userName}}</span> 
				<span>{{item.tel}}</span>
				<p class="adr">{{item.streetName}}</p>
				<p>{{item.postCode}}</p>
				<p class="default_adr" v-if="item.isDefault">默认地址</p>
				<p :class="{'default_setaddr':checkIndex==index}" class="default_setadr" v-show="!item.isDefault" @click="setDefaultAddress(item.addressId)">设置为默认地址</p>
				<div class="del_adr" @click="delAddress(item.addressId)"><i class="fa fa-trash-o"></i></div>
			</div>

			<div class="add_adr">
				<p>+</p>
			</div>
		</div>
		<p class="showadr" @click="showAddress">{{showAdr}} <i class="fa fa-chevron-down" v-show="showFlag"></i> <i class="fa fa-chevron-up" v-show="!showFlag"></i></p>
		<div class="adr_title">
			订单详情
		</div>
		<div class="cart_content">
			<div class="cart_content_header"><div class="cart_img"></div><div class="cart_item">商品信息</div><div class="">单价</div><div class="cart_num">数量</div><div class="">总价</div></div>			
			<ul>
				<li>
					<div class="cart_content_body">
						<div class="cart_f">
						<img src='../../static/002.png' alt="" />
						</div><!--
					 --><div class="cart_good">
							<div class="cart_goods">
								<span class="cart_goods_span">sd</span>
							</div>
						</div><!--
					 --><div class="cart_price">
ds
						</div><!--
					 --><div class="couter">
						
						1
						</div><!--
					 --><div class="cart_total">
							s
						</div>							
					</div>
				</li>
			</ul>	
		</div>
	</div>	
</template>

<script>
	import ComHeader from '@/views/ComHeader'	
	import ComFooter from '@/views/ComFooter'	
	import Modal from '@/components/Modal'
	import axios from 'axios'	
	export default{
		components:{
			ComHeader,
			ComFooter,
  			Modal
		},
		data(){
			return{				
				toCart:true,
				rout:false,
				addressList:[],
				limit:3,
				showAdr:'更多地址',
				showFlag:true,
				checkIndex:0
			}
		},
		mounted (){
			this.init();
		},
		methods:{
			init(){
				this.getAddressList();
			},
			getAddressList(){
				axios.get('/users/addressList').then((res)=>{
					var res=res.data;
					this.addressList=res.result.sort(function(a,b){
						return b.isDefault-a.isDefault;
					});
					console.log(this.addressList)
				})
			},
			showAddress(){
				if(this.limit==3){
					this.limit=this.addressList.length;
					this.showFlag=false;
					this.showAdr='收起'
				}else{
					this.showAdr='更多地址'
					this.showFlag=true;
					this.limit=3
				}
			},
			setDefaultAddress(addressId){
				axios.post("/users/setDefaultAddress",{addressId:addressId}).then((response)=>{
					let res=response.data;
					if(res.status=='0'){
						this.init()
					}
				})
			},
			delAddress(addressId){
				axios.post("/users/delAddress",{addressId:addressId}).then((response)=>{
					let res=response.data;
					if(res.status=='0'){
						this.init();
					}
				})
			}
		},
		computed:{
			addressListControl(){
				return this.addressList.slice(0,this.limit)
			}
		}
	}	
</script>
<style type="text/css">
	body{
		background-color: #fafafa;
	}
	.cart_content_header>div{
		width: 160px;
	}
	.cart_f,.cart_price,.couter,.cart_total{
		width: 160px;
	}
	
</style>