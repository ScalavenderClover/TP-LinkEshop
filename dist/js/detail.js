"use strict";var info=JSON.parse(localStorage.getItem("goodsInfo"));function bindHtml(){$(".goodsInfo img").attr("src",info.list_url),$(".goodsInfo .goodsName").text(info.list_name),$(".goodsInfo .price").text("￥"+info.list_price)}info||(alert("页面不存在"),window.location.href="./list.html"),bindHtml(),$(".addCart").click(function(){if($.cookie("name")){console.log("用户登录");var o=JSON.parse(localStorage.getItem("cartList"))||[];if(o.some(function(o){return o.list_id===info.list_id})){for(var i=null,t=0;t<o.length;t++)if(o[t].list_id===info.list_id){i=o[t];break}i.number++,i.subtotal=i.number*i.list_price}else info.number=1,info.subtotal=info.list_price,info.isSelect=!1,o.push(info);localStorage.setItem("cartList",JSON.stringify(o))}else console.log("用户未登录"),window.location.href="./login.html"});