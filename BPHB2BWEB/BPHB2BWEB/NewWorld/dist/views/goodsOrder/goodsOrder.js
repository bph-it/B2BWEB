!function(n){var e={};function s(a){if(e[a])return e[a].exports;var t=e[a]={i:a,l:!1,exports:{}};return n[a].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=n,s.c=e,s.d=function(n,e,a){s.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:a})},s.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},s.t=function(n,e){if(1&e&&(n=s(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)s.d(a,t,function(e){return n[e]}.bind(null,t));return a},s.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return s.d(e,"a",e),e},s.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},s.p="",s(s.s=6)}({6:function(n,e,s){"use strict";if(cookie&&"null"!==cookie){var a=function(n){var e=Number(n)+100;_mm.request({data:{method:"GetAreaByparentID",parentID:e},success:function(n){var e="";n.forEach(function(n,s){e+='\n                        <option value="'+n.id+'">'+n.name+"</option>\n                    "}),$(".region").removeClass("dis-none").children().html(e)}})},t=function(n,e){_mm.request({data:{method:"GetAreaByparentID",parentID:e||1},success:function(s){var t="";if(s.forEach(function(n,e){t+='\n                        <option value="'+n.id+'">'+n.name+"</option>\n                    "}),"sheng"==n)return $(".city").removeClass("dis-none").children().html(t),void a(e);"shi"!=n?$(".sheng1").after(t):$(".region").removeClass("dis-none").children().html(t)}})};hadenum(),window.provincea=function(n,e){_mm.request({data:{method:"GetAreaByparentID",parentID:e||1},success:function(s){var t="";if(s.forEach(function(n,e){t+='\n                        <option value="'+n.id+'">'+n.name+"</option>\n                    "}),"sheng"==n)return $(".city").removeClass("dis-none").children().html(t),void a(e);"shi"!=n?$(".sheng1").after(t):$(".region").removeClass("dis-none").children().html(t)}})},provincea(),function(){function n(){function n(){$(".p-xg").removeClass("g-mo").addClass("g-address-temp-block"),$(".s-panel").children().eq(0).find(".p-xg").removeClass("g-address-temp-block").addClass("g-mo")}$(document).ready(function(){$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"GetAddress",uid:cookie,isdefaul:1},dataType:"json",success:function(n){n.length;0==n.length?($(".g-address-info-block").css("display","none"),$(".g-address-temp-block").slideDown("slow")):n.forEach(function(n,e){var s='\n                                <dl class="g-unit-line addressid f-l" data-type='+n.addressid+'>\n                                    <i class="iconfont">&#xe614;</i>\n                                    <dd>&nbsp; '+n.receiver_name+'</dd>\n                                </dl>\n                                <dl class="g-unit-line f-l">\n                                    <i class="iconfont">&#xe734;</i>\n                                    <dd class="line-label-address">\n                                        <span>'+n.state+" &nbsp;</span>\n                                        <span>"+n.city+" &nbsp;</span>\n                                        <span>"+n.district+" &nbsp;&nbsp;&nbsp;</span>\n                                        <span>"+n.address+'</span>\n                                    </dd>\n                                </dl>\n                                <dl class="g-unit-line f-l">\n                                    <i class="iconfont">&#xe60d;</i>\n                                    <dd>\n                                        <span>'+n.mobile+"</span>\n                                    </dd>\n                                </dl>\n                            ";$(".g-address-info").html(s)})}})}),$(document).on("click",".p-radio",function(){$(".show-copy-area").addClass("g-address-temp-block"),$(".p-he").addClass("g-mo"),$(".g-address-list").children().removeClass("s-panel"),$(".g-default").find(".g-panel").removeClass("p-bok").addClass("p-no"),$(this).parent().parent().parent().addClass("s-panel"),$(this).parent().parent().find(".g-panel").removeClass("p-no").addClass("p-bok"),n()}),$(document).on("click",".g-edit-address-info",function(){$(".g-address-info-block").css("display","none"),$(".g-address-temp-block").slideDown("slow")}),$(document).on("click",".p-cancel",function(){$(".g-address-temp-block").css("display","none"),$(".g-address-info-block ").slideDown("slow")}),$(document).on("click",".g-edit-temp-address",function(){$(".g-address-info-block").css("display","none"),$(".g-address-list-block").css("display","block"),$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"GetAddress",uid:cookie},dataType:"json",success:function(e){if(0==e.length){$(".g-address-list").html('\n                                <div class="there">\n                                    暂无数据\n                                </div>\n                            ')}else{var s="";e.forEach(function(e,a){s+='\n                                <li class="g-default" data-type="'+e.is_default+'" data-id="'+e.addressid+'">\n                                    <div class="p-he cl">   \n                                        <span class="g-lang-radio">\n                                            <input type="radio" name="1" value="a" class="p-radio">\n                                        </span>\n                                        <div class="g-select-label">\n                                            <span>'+e.receiver_name+"</span>\n                                            <span>"+e.state+"</span>\n                                            <span>"+e.city+"</span>\n                                            <span>"+e.district+"</span>\n                                            <span>"+e.address+"</span>\n                                            <span>"+e.mobile+'</span>\n                                        </div>\n                                        <div class="g-panel c-p f-r" data-id="'+e.addressid+'">\n                                            <a class="p-xg g-address-temp-block"></a>\n                                        </div>\n                                    </div>\n            \n            \n                                    <div class="show-copy-area g-address-temp-block">\n                                        <div class="p-zone-editaddress">\n                                            <ul class="edit-area">\n                                                <li class="p-fd-clr cl">\n                                                    <div class="f-l letter-2">收 &nbsp; 货 &nbsp; 人 &nbsp;:</div>\n                                                    <div class="f-l"> <input type="text" class="lang-input" value="'+e.receiver_name+'"> </div>\n                                                </li>\n            \n                                                <li class="unit-line cl">\n                                                    <span class="cl f-l">所 有 地 区 &nbsp;:&nbsp;</span>\n                                                    \x3c!-- 省 --\x3e\n                                                    <span class="select-box f-l">\n                                                        <select name="" id="" class="select provinces sheng-a yan-z" onchange="proving(\'sheng\',value)" >\n                                                            <option class="sheng1" value="">请选择城市</option>\n                                                        </select>\n                                                    </span>\n                                                    \x3c!-- 市 --\x3e\n                                                    <span class="select-box dis-none  city f-l">\n                                                        <select name="" class="select shia" onchange="proving(\'shi\',value)">\n                                                        </select>\n                                                    </span>\n                                                    \x3c!-- 区 --\x3e\n                                                    <span class="select-box dis-none region  f-l">\n                                                        <select class="select qua" onchange="proving(\'qu\',value)">\n                                                        </select>\n                                                    </span>\n                                                </li>\n            \n                                                <li class="cl xiangzhi">\n                                                    <div class="f-l letter-2">详 细 地 址 :</div>\n                                                    <div><textarea name="" id="" cols="30" rows="10" class="p-input-address" >'+e.address+'</textarea></div>\n                                                </li>\n            \n                                                <li class="p-fd-clr cl">\n                                                    <div class="f-l letter-2"> 手 &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机 :</div>\n                                                    <div class="f-l"> <input type="text" class="lang-input p-address-chooser" value="'+e.mobile+'"></div>\n                                                </li>\n            \n                                            </ul>\n                                        </div>\n                                    </div>\n                                </li>\n                            ',$(".g-address-list").html(s),$(".g-address-list").children().eq(0).addClass("s-panel"),$(".g-address-list").children().eq(0).find(".g-panel").addClass("p-bok"),$(".g-address-list").children().eq(0).children().children().children().attr("checked",!0),function(){for(var n=0;n<$(".g-default").length;n++)if("true"==$(".g-default").eq(n).attr("data-type")){$(".g-default").eq(n).addClass("actives");$(".g-address-list").children().eq(n).find(".p-xg").before('\n                            <span class="g-isdefault ble">默认地址</span>\n                        '),$(".g-address-list").children().eq(n).find(".g-panel").addClass("g-mo")}else{$(".g-default").eq(n).attr("data-type"),$(".g-default").eq(n).addClass("actives");$(".g-address-list").children().eq(n).find(".p-xg").before('\n                            <span class="g-isdefault ble cl00">设为默认地址</span>\n                        ')}}(),n()}),t()}}})}),$(document).on("click",".cl00",function(){var n=$(this).parent().attr("data-id");$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"SetDefaultAddress",addressid:n},datatype:"json",success:function(n){window.location.reload()}})}),n(),$(".ya").focus(function(){$(".ya1").addClass("dis-none")}),$(".p-button-stressA").click(function(){var n=$(".edit-areA").find(".lang-input").val(),e=$(".edit-areA").find(".provinces option:selected").text(),s=$(".edit-areA").find(".citys option:selected").text(),a=$(".edit-areA").find(".selects option:selected").text(),t=$(".edit-areA").find(".p-input-address").val(),i=$(".edit-areA").find(".p-address-chooser").val();if(""==n)$(".shou2").removeClass("dis-none");else if(""==a)$(".zhi2").removeClass("dis-none");else if(""==t)$(".xiang2").removeClass("dis-none");else if(""==i)$(".ji2").removeClass("dis-none");else{var d={state:e,city:s,district:a,address:t,receiver_name:n,mobile:i,is_default:!0,uid:cookie};$.ajax({type:"post",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx?method=AddCusAddress",data:JSON.stringify(d),dataType:"json",success:function(n){0==n.ErrorMsg&&window.location.reload()}})}})}function e(n){hadenum();var e=(Number(n.parent().children(".lang-input").val())*Number(n.parent().parent().children(".unit-price").children().text())).toFixed(2);n.parent().parent().next().find(".control").text(e),s()}function s(){var n,e=0;$(".control").each(function(){e+=Number($(this).text()),n=e.toFixed(2)});var s="\n                    <span>"+n+"</span>\n                ";$(".p-nbe").html(s)}function a(n,e){$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"UpdateCartItem",shoppingcartId:n,qty:e},datatype:"json",success:function(n){}})}$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"GetCart",uid:cookie,Isselect:1},dataType:"json",success:function(e){var a="";e.forEach(function(n,e){var s=(n.price*n.qty).toFixed(2);a+='\n                            <ul class="cl">\n                                <li class="f-l cl cell-thumbnail">\n                                    <img class="f-l" src="'+n.picurl+'" alt="">\n                                    <div class="f-l offer-title">\n                                        <a href="">'+n.title+"</a>\n                                        <div>\n                                            <span>颜色 : "+n.skuName+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n                                        </div>\n                                    </div>\n                                </li>\n                                <li class="unit-price f-l">\n                                    <span>'+n.price+'</span>\n                                </li>\n                                <li class="unit-finecontrol f-l" data-type="'+n.ShoppingCartItemId+'">\n                                    <button class="minus yang c-p f-l">\n                                        <span>-</span>\n                                    </button>\n                                    <input type="text" value="'+n.qty+'" class="lang-input f-l">\n                                    <button class="plus yang c-p f-l">\n                                        <span>+</span>\n                                    </button>\n                                </li>\n                            </ul>\n            \n                            <div class="summary">\n                            <div class="f-r data-spm-anchor">\n                                <div class="cl">\n                                    <div class="f-r">\n                                        <span class="labele">货品总金额 :</span>\n                                        <strong class="control">'+s+'</strong>\n                                    </div>\n            \n                                </div>\n                                <div class="box-remind-lumptip">\n                                    <div>\n                                        货品的库存以实际支付为准，下单后请尽快完成支付\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        '}),$(".zone-order").html(a),n(),s()}}),$(document).on("click",".plus",function(){var n=$(this).prev().val();n++,$(this).prev().val(n),e($(this)),a($(this).parent().attr("data-type"),n)}),$(document).on("click",".minus",function(){var n=$(this).next().val();1==n?n=1:(n--,$(this).next().val(n),e($(this)),a($(this).parent().attr("data-type"),n))}),$(document).on("keyup",".lang-input",function(){e($(this));var n=$(this).val();a($(this).parent().attr("data-type"),n)});$(".make-order").click(function(){var n=$(".addressid").attr("data-type");$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"GetAddress",uid:cookie,isdefaul:1},dataType:"json",success:function(e){0==e.length?$(".shu").removeClass("dis-none"):$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",data:{method:"CreateOrder",uid:cookie,adressID:n},datatype:"json",success:function(n){n.forEach(function(n,e){window.location.href="../payment/payment.aspx?tid="+n.tid})}})}})})}()}else window.location.href="../denglu/denglu.html";console.log(provincea)}});