var express = require('express');
var router = express.Router();

var User = require('../models/users') ;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
	var param={
		userName:req.body.userName,
		userPwd:req.body.userPwd
	}
	User.findOne(param,function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else{
			if(doc){
				res.cookie('userId',doc.userId,{
					path:'/',
					maxAge:1000*60*60
				});
				res.cookie('userName',doc.userName,{
					path:'/',
					maxAge:1000*60*60
				});
				res.json({
					status:'0',
					msg:'',
					result:{
						userName:doc.userName
					}
				})
			}else{
				res.json({
					status:'2',
					msg:'用户名或密码错误'
				})
			}
		}

	})
})


router.post('/logout',function(req,res,next){
	res.clearCookie("userId",{
		path:'/',
		maxAge:-1
	})
	res.clearCookie("userName",{
		path:'/',
		maxAge:-1
	})
	res.json({
		status:0,
		msg:'',
		result:''
	})
})

router.get('/checkLogin',function(req,res,next){
	if(req.cookies.userId){
		res.json({
			status:'0',
			msg:'',
			result:req.cookies.userName
		})
	}else{
		res.json({
			status:'1',
			msg:'未登录',
			result:''
		})
	}
})

router.get('/checkReg',function(req,res,next){
	var param={
		userName:req.query.userName
	}
	User.findOne(param,function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
				if(doc){
					res.json({
						status:'10002',
						msg:'用户名已存在',
						result:''
					})
				}else{
					res.json({
						status:'0',
						msg:'该用户名可用',
						result:''
					})
				}
			}
		})
	})


router.post('/reg',function(req,res,next){
//	var userName=req.body.userName;
	var param={
		userName:req.body.userName
//		userPwd:req.body.userPwd
	}
	User.findOne(param,function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			if(doc){
				res.json({
					status:'10002',
					msg:'用户名已存在',
					result:doc
				})
			}
			else{
				let user = new User({
					userName:req.body.userName,
					userPwd:req.body.userPwd
				})
				user.save(function(err,doc){
					if(err){
						res.json({
							status:'1',
							msg:err.message,
							resule:''
						})
					}else{
						doc.userId=doc._id;
						user.save();
						res.cookie('userId',doc.userId,{
							path:'/',
							maxAge:1000*60*60
						});
						res.cookie('userName',doc.userName,{
							path:'/',
							maxAge:1000*60*60
						});
						res.json({
							status:'0',
							msg:'注册成功',
							result:{userName:doc.userName}
						})
					}
				})
			}
		}
	})
})
router.get('/cartList',function(req,res,next){
	let uid=req.cookies.userId;
	let param={
		userId:uid
	}
	User.findOne(param,function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			if(doc){
				res.json({
					status:'0',
					msg:'',
					result:doc.cartList
				})
			}
		}
	})
})

router.post('/cartDel',function(req,res,next){
	let productId=req.body.productId;
	let userId=req.cookies.userId;
	User.update({userId:userId},{
		$pull:{
			'cartList':{
				'productId':productId
			}
		}
	},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:'0',
				msg:'',
        result:''
			})
		}
	})
})

router.post('/cartEdit',function(req,res,next){
	let userId=req.cookies.userId;
	let productId=req.body.productId;
	let productNum=req.body.productNum;
	let checked=req.body.checked?'1':'0';
	User.update({"userId":userId,"cartList.productId":productId},{
		"cartList.$.productNum":productNum,
		"cartList.$.checked":checked
	},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:'0',
				msg:'',
				result:''
			})
		}
	})
})

router.post('/selAll',function(req,res,next){
	let selAll=req.body.selAll?'1':'0',
		userId=req.cookies.userId;
	User.findOne({userId:userId},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:'',
				result:''
			})
		}else{
			if(doc){
				doc.cartList.forEach((item)=>{
					item.checked=selAll
				})
				doc.save(function(err1,doc1){
					if(err1){
						res.json({
							status:'1',
							msg:err.message,
							result:''
						})
					}else{
						res.json({
							status:'0',
							msg:'suc',
							result:''
						})
					}
				})
			}
		}
	})
})

module.exports = router;
