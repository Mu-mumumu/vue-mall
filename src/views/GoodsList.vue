<template>
	<div>
		<com-header></com-header>
		<div class='main_header'>
			<div id="logo_img" v-bind:style="{marginLeft:screenWidth*0.1+'px'}"></div>
			<div class="main_search" v-bind:style="{marginLeft:screenWidth*0.1+'px'}">
				<div class="search_box">
					<input type="" name="" id="" value="" placeholder="隐形蓝牙耳机    补水面膜"/>
					<div id='search_btn'>搜索</div>
				</div>
				<div class="search_info">
					<a href="" >2017新款风衣</a>
					<a href="" class="hl_sel">空气加湿器</a>
					<a href="" class="hl_sel">沙发</a>
					<a href="">笔记本</a>
					<a href="" >雪地靴</a>
					<a href="" class="hl_sel">毛针织衫</a>					
					<a href="">猫玩具</a>									
					<a href="" class="hl_sel">动漫卫衣</a>					
					<a href="">狗粮</a>									
					<a href="">牛仔帽</a>									
				</div>
			</div>
		</div>
		<!--menu-->
		<div class="menu">
			<div class="menu_item" v-bind:style="{marginLeft:screenWidth*0.1+'px'}">
				<span>全部分类</span><!--
			 --><router-link to='./goods/library'>动漫城</router-link><!--
			 --><router-link to='./goods/library'>服装馆</router-link><!--
			 --><router-link to='./goods/phone'>手机配件</router-link><!--
			 --><router-link to='./goods/library'>数码人生</router-link><!--
			 --><router-link to='./goods/library'>电器城</router-link><!--
			 --><router-link to='./goods/library'>图书馆</router-link><!--
			 --><router-link to='./goods/library'>生鲜场</router-link>
			</div>
			<div class="menu_view">
				<ul v-bind:style="{marginLeft:screenWidth*0.1+'px'}">
					<li><span><i class="fa fa-user-secret"></i></span><a href="">女装</a><p>/</p><a href="">男装</a><p>/</p><a href="">内衣</a></li>
					<li><span><i class="fa fa-shopping-bag"></i></span><a href="">鞋靴</a><p>/</p><a href="">箱包</a><p>/</p><a href="">配件</a></li>
					<li><span><i class="fa fa-headphones"></i></span><a href="">家电</a><p>/</p><a href="">数码</a><p>/</p><a href="">手机</a></li>
					<li><span><i class="fa fa-diamond"></i></span><a href="">珠宝</a><p>/</p><a href="">眼镜</a><p>/</p><a href="">手表</a></li>
					<li><span><i class="fa fa-soccer-ball-o"></i></span><a href="">运动</a><p>/</p><a href="">户外</a><p>/</p><a href="">乐器</a></li>
					<li><span><i class="fa fa-gamepad"></i></span><a href="">游戏</a><p>/</p><a href="">动漫</a><p>/</p><a href="">影视</a></li>
					<li><span><i class="fa fa-bed"></i></span><a href="">家具</a><p>/</p><a href="">家饰</a><p>/</p><a href="">家纺</a></li>
					<li><span><i class="fa fa-car"></i></span><a href="">汽车</a><p>/</p><a href="">二手车</a><p>/</p><a href="">用品</a></li>
					<li><span><i class="fa fa-home"></i></span><a href="">房产</a><p>/</p><a href="">装修</a><p>/</p><a href="">建材</a></li>
					<li><span><i class="fa fa-tv"></i></span><a href="">办公</a><p>/</p><a href="">DIY</a><p>/</p><a href="">五金电子</a></li>
					<li><span><i class="fa fa-book"></i></span><a href="">学习</a><p>/</p><a href="">卡券</a><p>/</p><a href="">本地服务</a></li>
				</ul><!--
			 --><carousel></carousel>
			 	<div class="main_right">
			 		<div class="advert"><img src="../../static/ad.png"/></div><!--	
			 	--><div class="main_fee">
			 			<a href=""><img src="../../static/hf.png"/></a><!--			 			
			 		--><a href=""><img src="../../static/lx.png"/></a><!--	
			 		--><a href=""><img src="../../static/cp.png"/></a><!--	
			 		--><a href=""><img src="../../static/yx.png"/></a><!--	
			 		--><a href=""><img src="../../static/jp.png"/></a><!--	
			 		--><a href=""><img src="../../static/dyp.png"/></a><!--	
			 		--><a href=""><img src="../../static/lc.png"/></a><!--	
			 		--><a href=""><img src="../../static/jf.png"/></a>
			 		</div>
			 	</div>
			</div>
			<div class="recommend_content">
				<div class="recom_top"><div class="recom_title"><h4>四条木精选</h4></div></div>
				<div class="recom_body">
					<div v-for="(item,index) in goodsList.list">
						<img v-lazy="'/static/'+item.productImage"/>
						<span>{{item.productName}}</span>
						<br />
						<span class="goods_price">￥{{item.salePrice}}</span><a href=''><i class="fa fa-cart-plus"></i></a>
					</div>

				</div>
			</div>
		</div>
		<com-footer></com-footer>
	</div>
</template>

<script>
	import ComHeader from '@/views/ComHeader'
	import Carousel from '@/components/Carousel'
	import ComFooter from '@/views/ComFooter'
	import axios from 'axios'
	export default{
		data(){
			return{
				screenWidth: document.body.clientWidth,
				goodsList:[]
			}
		},
		
		components:{
			ComHeader,
			ComFooter,
			Carousel
		},
		mounted (){
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
            this.getGoodsList();
            console.log(this.goodsList)
        },
//      watch: {
//          screenWidth(val) {
//              this.screenWidth = val; 
//          }
//      },
		methods:{
			getGoodsList(){
				axios.get("/goods").then((result)=>{
					var res = result.data;
					this.goodsList = res.result;
				})
			}
		}
	}

</script>

