!function(t){var e={};function r(a){if(e[a])return e[a].exports;var s=e[a]={i:a,l:!1,exports:{}};return t[a].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(a,s,function(e){return t[e]}.bind(null,s));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=4)}({4:function(t,e,r){"use strict";r(5),$(".next-input-large").blur(function(){var t=$(this).attr("data-type"),e=$(this).val(),r=$(this).next(),a=$(this);"uid"!=t?"password"!=t?"passwordS"!=t?"nick"!=t&&"companyname"!=t?"mobile"!=t||(/^1[34578]\d{9}$/.test(e)?(a.removeClass("bdred").attr("myAttr","true"),r.css("display","none")):(a.addClass("bdred").attr("myAttr","false"),r.css("display","block"))):/^[\u4e00-\u9fa50-9A-Za-z]+$/.test(e)?(a.removeClass("bdred").attr("myAttr","true"),r.css("display","none")):(a.addClass("bdred").attr("myAttr","false"),r.css("display","block")):e==$(".pas").val()?(a.removeClass("bdred").attr("myAttr","true"),r.css("display","none")):(a.addClass("bdred").attr("myAttr","false"),r.css("display","block")):/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z0-9]{8,16}$/.test(e)?(a.removeClass("bdred").attr("myAttr","true"),r.css("display","none")):(a.addClass("bdred").attr("myAttr","false"),r.css("display","block")):/^[\u4e00-\u9fa5\w]{4,16}$/.test(e)?(a.removeClass("bdred").attr("myAttr","true"),r.css("display","none")):(a.addClass("bdred").attr("myAttr","false"),r.css("display","block"))}),$(".next-btn-primary").click(function(){var t=$(".uit").attr("myAttr"),e=$(".pas").attr("myAttr"),r=$(".pasS").attr("myAttr"),a=$(".nic").attr("myAttr"),s=$(".com").attr("myAttr"),o=$(".mob").attr("myAttr");if("true"!==t)console.log("账号错误");else if("true"!==e)console.log("密码错误");else if("true"!==r)console.log("确认密码错误");else if("true"!==a)console.log("联系人姓名错误");else if("true"!==s)console.log("企业名称错误");else if("true"!==o)console.log("联系人电话错误");else{var n=$(".uit").val();$.ajax({type:"get",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx",dataType:"json",data:{method:"verifyuid",uid:n},success:function(t){if("用户名已存在"==t.msg)alert("用户名已存在,请重新输入");else{var e=$(".uit").val(),r=$(".pas").val(),a=$(".nic").val(),s=$(".com").val(),o=$(".mob").val(),n={uid:e,password:r,nick:a,companyname:s,issale:$(".radioA input:radio:checked").val(),ispurchase:$(".radioB input:radio:checked").val(),mobile:o};$.ajax({type:"post",url:"http://192.168.2.254:9000/interface/B2BAPI.ashx?method=register",dataType:"json",data:JSON.stringify(n),success:function(t){t.ErrorMsg?window.location.href="../denglu/denglu.html?tid=zhu":alert("注册异常")}})}}})}})},5:function(t,e,r){}});