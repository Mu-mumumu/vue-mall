var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var Users = require('../models/users');

mongoose.connect('mongodb://127.0.0.1:27017/fourwoods');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

router.get("/list", function (req,res,next) {
	let page=parseInt(req.param("page"))
	let pageSize=parseInt(req.param("pageSize"))
	let skip=(page-1)*pageSize
	let goodsModel=Goods.find({}).sort({'productId':1}).skip(skip).limit(pageSize)
	goodsModel.exec(function (err,doc) {
        if(err){
         	res.json({
            	status:'1',
            	msg:err.message
          	});
        }else{
          	res.json({
              	status:'0',
              	msg:'',
              	result:{
                  count:doc.length,
                 	list:doc
             	 }
          	});
        }
	})


})

router.post("/addCart", function (req,res,next) {
  var userId =req.body.userId,productId = req.body.productId;
  Users.findOne({userId:userId}, function (err,userDoc) {
    if(err){
        res.json({
            status:"1",
            msg:err.message
        })
    }else{
        console.log("userDoc:"+userDoc);
        if(userDoc){
          var goodsItem = '';
          userDoc.cartList.forEach(function (item) {
              if(item.productId == productId){
                goodsItem = item;
                item.productNum ++;
              }
          });
          if(goodsItem){
            userDoc.save(function (err2,doc2) {
              if(err2){
                res.json({
                  status:"1",
                  msg:err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }else{
            Goods.findOne({productId:productId}, function (err1,doc) {
              if(err1){
                res.json({
                  status:"1",
                  msg:err1.message
                })
              }else{
                if(doc){
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2,doc2) {
                    if(err2){
                      res.json({
                        status:"1",
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                    }
                  })
                }
              }
            });
          }
        }
    }
  })
});




module.exports = router;
