<template>
	<div>
		<transition name="slide-bottom-fade">
			<div class="model" v-if="register_model" @click="closeModel()">
				<div class="model_content" @click.stop="">
					<h2>注册新账户</h2>
					<div class="m_userinfo">
						<div class="user_id"><input type="text" name="register_id" id="register_id" value="" placeholder="用户名" v-model.lazy="userRegName"/>
							<span class="errtip" v-if="errReg" v-bind:style="{ color: tipColor}">{{errtip}}</span>
						</div>
						<div class="user_psw"><input type="password" name="register_psw" id="register_psw" value="" placeholder="密码" v-model="userPwd"/></div>				
						<div class="model_btn" @click='reg()'>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</div>					
					</div>
				</div>
			</div>
		</transition>	
		<transition name="slide-right-fade">	
			<div class="model" v-if="login_model" @click="closeModel()">
				<div class="model_content" @click.stop="">			
					<h2>帐号登录</h2>				
					<div class="m_userinfo">				
						<div class="user_id"><input type="text" name="login_id" id="login_id" value=""  placeholder="用户名" v-model="userName"/><span class="errtip" v-if="errMsg">{{loginerr}}</span></div>
						<div class="user_psw"><input type="password" name="login_psw" id="login_psw" value="" placeholder="密码" v-model="userPwd"/></div>
						<div class="model_btn" @click="login()">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
					</div>	
				</div>	
			</div>
		</transition>			
		<header class='com_head'>
			<div class="header_tool clearfix">
				<span class="welcome">亲，欢迎来到四条木商城</span>
				<div class="login_span" v-if="!loginStatus">
					<a href="javascript:void(0)" @click="loginModel()">请登录</a>
					<a href="javascript:void(0)" @click="registerModel()">免费注册</a>
				</div>
				<div class="login_span" v-if="loginStatus">
					<a href="javascript:void(0)" >{{name}}</a>
					<a href="javascript:void(0)" @click="logout()">退出</a>
					<router-link to='./cart' v-if='rout'><i class="fa fa-cart-plus"></i></router-link>
					<router-link to='./' v-if='!rout'>返回</i></router-link>
					<router-link to='./cart' v-if='toCart'>返回购物车</i></router-link>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				login_model:false,
				register_model:false,
				userName:'',
				userRegName:'',
				userPwd:'',
				errMsg:false,
				errtip:'用户名已存在',
				loginerr:'',
				loginStatus:false,
				name:'',
				errReg:false,
				tipColor:'',
				regStatus:false
			}
		},
		props: ['rout','toCart'],
		methods:{
			loginModel(){
				this.login_model=true;
			},
			registerModel(){
				this.register_model=true;
				this.errReg=false;
			},
			closeModel(){			
				this.login_model=false;
				this.register_model=false;
			},
			login(){
				if(!this.userName||!this.userPwd){
					this.loginerr = '用户名或密码为空'
					this.errMsg = true
				}else{
					axios.post('/users/login',{
						userName:this.userName,
						userPwd:this.userPwd
					
					}).then((response)=>{
						let res = response.data;
						if(res.status=='0'){
							console.log(res)
							this.login_model = false;
							this.loginStatus = true;
							this.name = res.result.userName;
						}
						else{
							this.loginerr = '用户名或密码错误'
							this.errMsg=true;
						}
					});					
				}
			},
			logout(){
				axios.post('/users/logout',{}).then((response)=>{
					let res = response.data
				})
				this.loginStatus = false;
			},
			checkLogin(){
				axios.get('/users/checkLogin').then((response)=>{
					let res = response.data;
					if(res.status=='0'){
						console.log(res)
						this.name=res.result;						
						this.loginStatus=true
					}
				})
			},
			reg(){
				if(this.regStatus){
					axios.post('/users/reg',{
						userName:this.userRegName,
						userPwd:this.userPwd
					}).then((response)=>{
						let res=response.data;
						if(res.status=='0'){
							alert('注册成功');
							this.register_model=false;	
							this.loginStatus = true;
							this.name = res.result.userName;						
						}else{
							if(res.status=='10002'){
								this.errReg = true							
							}
	
						}
					})
				}
			},
			checkReg(){
				axios.get('/users/checkReg',{
					params:{
						userName:this.userRegName
					}
				}).then((response)=>{
					let res=response.data;
					this.errReg=true
					if(res.status=='0'){
						this.errtip = '用户名可注册'
						this.tipColor = 'yellow'
						this.regStatus = true
					}else{
						this.errtip = '用户名已存在'
						this.tipColor = 'red'
					}
				})
			}
		},
		mounted (){
			this.checkLogin()
		},
		watch:{
			userRegName:function(){
				this.checkReg()
			}
		}

	}
</script>
