!function(n){var t={};function e(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return n[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=n,e.c=t,e.d=function(n,t,i){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:i})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var s in n)e.d(i,s,function(t){return n[t]}.bind(null,s));return i},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=13)}({13:function(n,t,e){"use strict";if(e(14),cookie&&"null"!==cookie){hadenum(),$(".next-tabs-tab-inner").click(function(){$(".next-tabs-tab-inner").children().removeClass("sn"),$(this).addClass("djbd").siblings().removeClass("djbd"),$(this).children().addClass("sn")}),$(".item").click(function(){$(this).css("background","red")}),$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"GetOrder",uid:cookie},dataType:"json",success:function(n){console.log(n);var t=[];n.forEach(function(n,e){var i=[];n.details.forEach(function(n,t){var e='\n                            <ul class="f-l">\n                                <li class="member-piclist">\n                                    <strong class="shop-title">\n                                        百品汇自营 \n                                    </strong>\n                                    <div class="cl">\n                                        <a href="../particulars/particulars.html?id='+n.numiid+'">\n                                        <div class="col01 f-l">\n                                            <img src="'+n.picurl+'" alt="">\n                                        </div>\n                                        <div class="col02 f-l">\n                                            <span class="text-primary">\n                                                '+n.tile+'\n                                            </span>\n                                        </div>\n                                        <div class="f-l co103">\n                                            <span>￥'+n.price+'</span>\n                                        </div>\n                                        <div class="f-l co104">\n                                            <span>'+n.num+"</span>\n                                        </div>\n                                        </a>\n                                    </div>\n                                </li>\n                            </ul>\n                            ";i.push(e)});var s='\n                        <div class="member-orders-list">\n                        <div class="tit-member-grid cl">\n                            <div class="tit-total">\n                                <span>'+n.modified+'</span>\n                                <span class="ding">订单号：'+n.tid+'</span>\n                            </div>\n        \n                            <div class="f-l qiand cl">\n                               '+i.join("")+'\n                            </div>\n\n                            <div class="f-l status c6 f14">\n                                <span>'+n.status+'</span>\n                            </div>\n        \n                            <div class="f-r actions">\n                                <a href="../orderDetails/orderDetails.html?tid='+n.tid+'" class="btn-simple-a">查看订单</a>\n                            </div>\n\n                            <div class="f-r actions">\n                                <a href="#" data='+n.tid+' class="btn-simple">去付款</a>\n                            </div>\n                        ';t.push(s)}),$(".member-grid").html(t)}}),$(document).on("click",".btn-red",function(){_uu.request({url:"method=AddShoppingCart",data:{uid:cookie,productID:123}})}),$(document).on("click",".btn-simple",function(){var n=$(this).attr("data");console.log(n),window.location.href="../payment/payment.aspx?tid="+n})}else window.location.href="../denglu/denglu.html"},14:function(n,t,e){}});