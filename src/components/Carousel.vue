<template>
<div class="carousel-wrap" id="carousel">
    <transition-group tag="ul" class='slide-ul' name="list">
      <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
        <a :href="list.clickUrl" >
          <img :src="list.image" :alt="list.desc">
        </a>
      </li>
    </transition-group>
    <div class="carousel-items">
      <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" @mouseenter="stop" @mouseover="change(index)"></span>
    </div>
</div>

</template>

<script>
export default{
	


    data(){ return{
        slideList: [
            {
                "clickUrl": "#",
                "desc": "1",
                "image": "../static/1.png"
            },
            {
                "clickUrl": "#",
                "desc": "2",
                "image": "../static/2.png"
            },
            {
                "clickUrl": "#",
                "desc": "3",
                "image": "../static/3.png"
            },
            {
                "clickUrl": "#",
                "desc": "4",
                "image": "../static/4.png"
            },
            {
                "clickUrl": "#",
                "desc": "5",
                "image": "../static/5.png"
            }
        ],
        currentIndex: 0,
        timer: ''
    	}
    }
    ,
    methods: {
        go() {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        },
        stop() {
            clearInterval(this.timer)
            this.timer = null
        },
        change(index) {
            this.currentIndex = index
        },
        autoPlay() {
            this.currentIndex++
            if (this.currentIndex > this.slideList.length - 1) {
                this.currentIndex = 0
            }
        }
    },
    created() {
        this.$nextTick(() => {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        })
    }

}
</script>

<style type="text/css">
	
</style>