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
				<span>全部分类</span>
				<router-link to='./goods/phone'>手机和配件</router-link>
				<router-link to='./goods/library'>动漫</router-link>
				<router-link to='./goods/library'>服装馆</router-link>
				<router-link to='./goods/library'>数码人生</router-link>
				<router-link to='./goods/library'>电器城</router-link>
				<router-link to='./goods/library'>图书馆</router-link>
			</div>
		</div>
		<com-footer></com-footer>
	</div>
</template>

<script>
	import ComHeader from '@/views/ComHeader'
	import Carousel from '@/components/Carousel'
	import ComFooter from '@/views/ComFooter'
	export default{
		data(){
			return{
				screenWidth: document.body.clientWidth
			}
		},
		
		components:{
			ComHeader,
			ComFooter
		},
		mounted (){
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
//      watch: {
//          screenWidth(val) {
//              this.screenWidth = val; 
//          }
//      },
//		methods:{

//		}
	}

</script>

<style>
</style>