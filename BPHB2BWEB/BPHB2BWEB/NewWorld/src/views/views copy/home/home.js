!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({2:function(e,t,n){"use strict";$(document).ready(function(){$(document).ready(function(){hadenum(),_mm.request({data:{method:"GetCategoy",ishomeview:1,type:1},success:function(e){var t="";e.forEach(function(e,n){t+='\n                            <li class="first-item" data-type="'+e.ID+'">\n                                <span class="f14">'+e.cname+'</span>\n                                <div class="absolute rw-lst-header-nav-second">\n                                    <ul class="cl p-rw-lst-header">\n                \n                                    </ul>\n                                </div>\n                            </li>\n                            '}),$(".rw-lst-header-nav-first").html(t)}}),_mm.request({data:{method:"CategoyProducts",cateid:54,pageSize:10,pageNumber:1},success:function(e){var t="";e.products.forEach(function(e,n){t+='\n                            <li class="f-l">\n                                <div class="content-outer relative">\n                                    <div class="content-inner absolute">\n                                        <div class="img-box relative t-c-f">\n                                            <a href="../particulars/particulars.html?id='+e.ID+'">\n                                                <img src="'+e.logo+'" alt="#">\n                                            </a>\n                                        </div>\n                                        <div class="txt-box fz12">\n                                            <div class="price-xj">\n                                                <span>￥</span>\n                                                <i>'+e.jdPrice+'</i>\n                                            </div>\n                                            <span class="unit-price">'+e.partermodel+'</span>\n                                            <span class="unit-price">'+e.wareLocation+'</span>\n                                        </div>\n            \n                                        <div class="tit-box">\n                                            <a href="javascript:void(0);">'+e.title+'</a>\n                                        </div>\n            \n                                        <a href="../particulars/particulars.html?id='+e.ID+'" class="popup_buy_view t-c-f">立即选购</a>\n                                    </div>\n                                </div>\n                            </li>\n                            '}),$(".product-list-a").html(t),$("#loading").addClass("dis-none"),$(".first-item").mouseenter(function(){$(this).children(".rw-lst-header-nav-second").css("display","block");var e=$(this).attr("data-type");_mm.request({data:{method:"GetCategoy",type:2,parentid:e},success:function(e){var t="";e.forEach(function(e,n){t+='\n                                        <li class="f-l second-category-item">\n                                            <a href="../Category/Category.html?id='+e.ID+'">'+e.cname+"</a>\n                                        </li>\n                                "}),$(".p-rw-lst-header").html(t)}})}),$(".first-item").mouseleave(function(){$(this).children(".rw-lst-header-nav-second").css("display","none")})}}),_mm.request({data:{method:"CategoyProducts",cateid:52,pageSize:10,pageNumber:1},success:function(e){var t="";e.products.forEach(function(e,n){t+='\n                            <li class="f-l">\n                                <div class="content-outer relative">\n                                    <div class="content-inner absolute">\n                                        <div class="img-box relative t-c-f">\n                                            <a href="../particulars/particulars.html?id='+e.ID+'">\n                                                <img src="'+e.logo+'" alt="#">\n                                            </a>\n                                        </div>\n                                        <div class="txt-box fz12">\n                                            <div class="price-xj">\n                                                <span>￥</span>\n                                                <i>'+e.jdPrice+'</i>\n                                            </div>\n                                            <span class="unit-price">'+e.partermodel+'</span>\n                                            <span class="unit-price">'+e.wareLocation+'</span>\n                                        </div>\n            \n                                        <div class="tit-box">\n                                            <a href="javascript:void(0);">'+e.title+'</a>\n                                        </div>\n            \n                                        <a href="../particulars/particulars.html?id='+e.ID+'" class="popup_buy_view t-c-f">立即选购</a>\n                                    </div>\n                                </div>\n                            </li>\n                            '}),$(".product-list-b").html(t)}})}),jQuery("#slider-3 .slider").slide({mainCell:".bd ul",titCell:".hd li",trigger:"click",effect:"leftLoop",autoPlay:!0,delayTime:700,interTime:2500,pnLoop:!1,titOnClassName:"active",mouseOverStop:!1})})}});