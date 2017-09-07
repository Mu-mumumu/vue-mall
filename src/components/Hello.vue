<template>
	<div>
		<!--<Counter num='10'></Counter>-->
		<Counter v-bind:num='num' v-on:incre='addbtn' v-on:decre='decrease'></Counter>
		<p>{{num}}</p>
		
	</div>
</template>

<script>
import Counter from './couter'
export default {
  name: 'hello',
  data () {
    return {
    	num:'20',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
  	Counter
  },
  methods:{
  	addbtn(){
  		this.num++
  	},
  	decrease(){
  		this.num--
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
