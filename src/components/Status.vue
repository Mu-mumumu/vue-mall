<template>
	<ul class="order_state">
		<li :class="{'step_cur':nowpage==1}">1.确认订单</li><!--
	 --><div></div><!--
	 --><li :class="{'step_cur':nowpage==2}">2.付款</li><!--
	 --><div></div><!--
	 --><li :class="{'step_cur':nowpage==3}">&nbsp;&nbsp;&nbsp;3.确认收货</li><!--
	 --><div></div><!--
	 --><li :class="{'step_cur':nowpage==4}">4.评价</li>
	</ul>	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props: ['nowpage']	
	}
</script>

