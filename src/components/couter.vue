<template>
	<div>
		<button v-on:click="addbtn()">+</button>
		<button @click="decrease">-</button>
		<p>{{num}}</p>
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

<style>
</style>