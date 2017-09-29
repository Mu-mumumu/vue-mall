<template>
	<div class="couter">
		<button @click="decrease">-</button>
		<input type="" name="goodsnum" id="goodsnum" value=""  v-model="num"/>
		<button v-on:click="addbtn()">+</button>
	</div>
</template>

<script>
	export default {
	props:['num'],
  	data () {
   		return {
   			num:0
    	}
  	},
  	methods:{
  		addbtn(){
  			this.$emit('incre')
  		},
  		decrease(){
  			this.$emit('decre')
  		}
  	}
}
</script>
<style type="text/css">
	.couter button{
		background-color: #ddd;
		width: 15px;
		border-style: none;
	}
</style>