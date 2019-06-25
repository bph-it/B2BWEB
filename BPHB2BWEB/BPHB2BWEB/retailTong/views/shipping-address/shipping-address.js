// var huojiao3 = $.cookie('kie');
var huojiao3 = 'a2471999097';

// 页面初始化
$.ajax({
    type : "get",
    url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
    data : {
        method: "GetAddress",
        uid : huojiao3
    },
    dataType : "json",
    success : function (data) {

        if(data.length == 0) {
            var kong = `
                <div class="there">
                    暂无数据
                </div>
            `
            $(".grid-main-he-box").html(kong)

        }else {
            var htmla = ""
            data.forEach(function (val,index) {
                htmla += `
                <div class="tiandi">
                    <div class="grid-main-he">
                        <div class="single-address">
                            <ul class="cl">
                                <li class="f-l td-checkboxs">
                                    <input type="checkbox">
                                </li>
                                <li class="f-l td-names">
                                    <span data-type="${val.addressid}">${val.receiver_name}</span>
                                </li>
                                <li class="f-l td-areas">
                                    <span>${val.state}</span>
                                    <span>${val.city}</span>
                                    <span>${val.district}</span>
                                </li>
                                <li class="f-l td-streets">
                                    <span>${val.address}</span>
                                </li>
                                <li class="f-l td-postcodes">
                                    <span>${val.mobile}</span>
                                </li>
                                <li class="f-l td-phones" data-type="${val.is_default}">
                                    <span class="moRen">默认收货地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="p-text" data-type="${val.addressid}">设置为默认地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="btn-modify-address">修改 &nbsp;</span>
                                    <span class="btn-del-address">删除</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
                $(".grid-main-he-box").html(htmla)
                
                for( var i = 0; i < $(".td-phones").length; i++) {
                // 确定 字符串还是布尔值 - 在判断
                if($(".td-phones").eq(i).attr("data-type") == "true") {
                // 改变当前元素状态
                    $(".td-phones").eq(i).addClass("active")
                    var phones = $(".td-phones").eq(i).children().eq(0)
                    fun(phones)
                    }
                }
            })

        }
    }
})

/* // hade 头部 模板 */
$(".headerpage").html(html);

// 收货人
var consignee = ""
// 所在地区
    area = ""
// 详细地址
    detailed = ""
// 手机号
    cellphone = ""


// 展示收货地址
$(".receiving").click(function () {
    $(".ui-dialog-overlay").addClass("dsblock");
    $(".ui-dialog").addClass("dsblock");
    $(".modify-address").css("display","none")
    $(".button-important").css("display","block")
})

// 取消收货地址
$(".cancel").click(function () {
    $(".ui-dialog-overlay").removeClass("dsblock");
    $(".ui-dialog").removeClass("dsblock");
})

// 失去焦点 获取值
$(".huojao").blur(function () {
    // 获取属性
    var attr = $(this).attr("data-type")
    if(attr == "consignee") {
        consignee = $(this).val();
    }else if(attr == "area") {
        getValue()
    }else if (attr == "detailed") {
        detailed = $(this).val();
    }else if (attr == "cellphone") {
        cellphone = $(this).val();
    }
})

$(".ok").click (function () {
    var data = [{
        consignee : consignee,
        area : area,
        detailed : detailed,
        cellphone : cellphone,
    }]
    $(".ui-dialog-overlay").removeClass("dsblock");
    $(".ui-dialog").removeClass("dsblock");
})

// 直接获取省
function box () {
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "GetAreaByparentID",
            parentID : 1
        },
        dataType : "json",
        success : function (data) {
            data.forEach(function (val,index) {
                html +=`
                    <option value="${val.id}">${val.name}</option>
                `
            })
            $(".provinces").append(html)
        }
    })
}
box ()

// 获取市区
function province () {
    console.log(111)
    //获取id
    $(".city").css("display","block")
    var provincE = $(".select option:selected").val()
    console.log(provincE)
    // 请求市 ajax
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "GetAreaByparentID",
            parentID : provincE
        },
        dataType : "json",
        success : function (data) {
            var htmlz 

            // city (data[1].id)

            data.forEach(function (vala,index) {
                htmlz += `
                    <option value="${vala.id}">${vala.name}</option>
                `
            }),
            $(".citys").html(htmlz)



            $.ajax({
                type : "get",
                url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                data : {
                    method: "GetAreaByparentID",
                    parentID : data[1].id
                },
                dataType : "json",
                success : function (data) {
                    var htmls
                    data.forEach(function (vald,index) {
                        htmls += `
                            <option value="${vald.id}">${vald.name}</option>
                        `
                    }),
                    $(".selects").html(htmls)
                }
        
            })




        }

    })
}

// 获取县
function city (id) {
    $(".district").css("display","block")
    var selects = $(".citys option:selected").val()
    // 请求市 ajax
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "GetAreaByparentID",
            parentID : selects || id
        },
        dataType : "json",
        success : function (data) {
            var htmls
            data.forEach(function (vald,index) {
                htmls += `
                    <option value="${vald.id}">${vald.name}</option>
                `
            }),
            $(".selects").html(htmls)
        }
    })
}

//调用cookie
function setCookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 存储客户信息
$(".button-important").click(function () {
    var receiver_name = $(".huojao1").val()                 //收货人
    var state = $(".provinces option:selected").text();     //省
    var city = $(".citys option:selected").text();          //市
    var district = $(".selects option:selected").text();    //区
    var address = $(".huojao2").val()                       //详细地址
    var uid = $(".huojao3").val()                           // 用户名
    var mobile = $(".huojao4").val()                        //手机号码

    // 手机号正则
    var pattern = /^1[34578]\d{9}$/; 

    
    var iSdefault = $(".huojao5").is(':checked')
    if (receiver_name == "") {
        console.log(1)
    }else if (state == "")  {
        console.log(2)
    }else if (city == "")   {
        console.log(3)
    }else if (district == "") {
        console.log(4)
    }else if (address == "") {
        console.log(5)
    }else if (!pattern.test(mobile)) {
        console.log(5)
    }else {
        // 验证成功 发起请求
        datas = {"state"    :  state,           //省
            "city"          :  city,            //市
            "district"      :  district,        //区
            "address"       :  address,         //详细地址
            "receiver_name" : receiver_name,    //收货人
            "mobile"        :  mobile,          //手机号码
            "is_default"    :  iSdefault,       //默认是否选择
            "uid"           :  huojiao3,             //用户名
        }

        $.ajax({
            type : "post",
            url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx?method=AddCusAddress",
            data: JSON.stringify(datas),
            dataType : "json",
            success : function (data) {
                $.ajax({
                    type : "get",
                    url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                    data : {
                        method: "GetAddress",
                        uid : huojiao3
                    },
                    dataType : "json",
                    success : function (data) {
                        var htmla = ""
                        data.forEach(function (val,index) {
                            console.log(val)
                            htmla += `
                                <div class="tiandi">
                                <div class="grid-main-he">
                                    <div class="single-address">
                                        <ul class="cl">
                                            <li class="f-l td-checkboxs">
                                                <input type="checkbox">
                                            </li>
                                            <li class="f-l td-names">
                                                <span data-type="${val.addressid}">${val.receiver_name}</span>
                                            </li>
                                            <li class="f-l td-areas">
                                                <span>${val.state}</span>
                                                <span>${val.city}</span>
                                                <span>${val.district}</span>
                                            </li>
                                            <li class="f-l td-streets">
                                                <span>${val.address}</span>
                                            </li>
                                            <li class="f-l td-postcodes">
                                                <span>${val.mobile}</span>
                                            </li>
                                            <li class="f-l td-phones" data-type="${val.is_default}">
                                                <span class="moRen">默认收货地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span class="p-text" data-type="${val.addressid}">设置为默认地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span class="btn-modify-address">修改 &nbsp;</span>
                                                <span class="btn-del-address">删除</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            `
                            $(".grid-main-he-box").html(htmla)

                            for( var i = 0; i < $(".td-phones").length; i++) {
                                // 确定 字符串还是布尔值 - 在判断
                            if($(".td-phones").eq(i).attr("data-type") == "true") {
                            // 改变当前元素状态
                                $(".td-phones").eq(i).addClass("active")
                                var phones = $(".td-phones").eq(i).children().eq(0)
                                fun(phones)
                                }
                            }

                        })
                    }
                })
            }
        })
    }
} )
var boxs   //地址编号

//  修改客户信息
$(document).on("click",".btn-modify-address",function () {
    
    $(".button-important").css("display","none");
    $(".modify-address").css("display","block");
    // 展示修改
    $(".ui-dialog-overlay").addClass("dsblock");
    $(".ui-dialog").addClass("dsblock");
    // 获取原始信息
    var brothers = $(this).parent() 
    var names = brothers.siblings(".td-names").children().text();           //获取收货人信息
    var state = brothers.siblings(".td-areas").children().eq(0).text();     //获取省
    var city = brothers.siblings(".td-areas").children().eq(1).text();      //获取市
    var district = brothers.siblings(".td-areas").children().eq(2).text();  //获取区
    var streets = brothers.siblings(".td-streets").children().text()        //获取详细地址
    var postcodes = brothers.siblings(".td-postcodes").children().text()        //获取手机号
    boxs = brothers.siblings(".td-names").children().attr("data-type");           //获取收货人信息
    // 添加展示修改
    $(".huojao1").val(names)
    $(".huojao2").val(streets)
    $(".huojao4").val(postcodes)
    console.log(boxs)
})

// 点击修改信息
$(".modify-address").click(function () {
    var bbs = boxs
    var receiver_name = $(".huojao1").val()                 //收货人
    var state = $(".provinces option:selected").text();     //省
    var city = $(".citys option:selected").text();          //市
    var district = $(".selects option:selected").text();    //区
    var address = $(".huojao2").val()                       //详细地址
    var uid = $(".huojao3").val()                           // 用户名
    var mobile = $(".huojao4").val()                        //手机号码

        // 手机号正则
        var pattern = /^1[34578]\d{9}$/; 

    var iSdefault = $(".huojao5").is(':checked')
    if (receiver_name == "") {
        console.log(1)
    }else if (state == "")  {
        console.log(2)
    }else if (city == "")   {
        console.log(3)
    }else if (district == "") {
        console.log(4)
    }else if (address == "") {
        console.log(5)
    }else if (!pattern.test(mobile)) {
        console.log(5)
    }else {
        // 验证成功 发起请求
        datas = {"state"    :  state,           //省
            "addressid"     :  bbs,
            "city"          :  city,            //市
            "district"      :  district,        //区
            "address"       :  address,         //详细地址
            "receiver_name" : receiver_name,    //收货人
            "mobile"        :  mobile,          //手机号码
            "is_default"    :  iSdefault,       //默认是否选择
            "uid"           :  uid,             //用户名
        }
            $.ajax({
            type : "post",
            url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx?method=UpdateAddress",
            data: JSON.stringify(datas),
            dataType : "json",
            success : function (data) {

                $.ajax({
                    type : "get",
                    url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                    data : {
                        method: "GetAddress",
                        uid : huojiao3
                    },
                    dataType : "json",
                    success : function (data) {
                        var htmla = ""
                        data.forEach(function (val,index) {
                            htmla += `
                                <div class="tiandi">
                                <div class="grid-main-he">
                                    <div class="single-address">
                                        <ul class="cl">
                                            <li class="f-l td-checkboxs">
                                                <input type="checkbox">
                                            </li>
                                            <li class="f-l td-names">
                                                <span data-type="${val.addressid}">${val.receiver_name}</span>
                                            </li>
                                            <li class="f-l td-areas">
                                                <span>${val.state}</span>
                                                <span>${val.city}</span>
                                                <span>${val.district}</span>
                                            </li>
                                            <li class="f-l td-streets">
                                                <span>${val.address}</span>
                                            </li>
                                            <li class="f-l td-postcodes">
                                                <span>${val.mobile}</span>
                                            </li>
                                            <li class="f-l td-phones" data-type="${val.is_default}">
                                                <span class="moRen">默认收货地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span class="p-text" data-type="${val.addressid}">设置为默认地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span class="btn-modify-address">修改 &nbsp;</span>
                                                <span class="btn-del-address">删除</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            `
                            $(".grid-main-he-box").html(htmla)

                            for( var i = 0; i < $(".td-phones").length; i++) {
                                // 确定 字符串还是布尔值 - 在判断
                            if($(".td-phones").eq(i).attr("data-type") == "true") {
                            // 改变当前元素状态
                                $(".td-phones").eq(i).addClass("active")
                                var phones = $(".td-phones").eq(i).children().eq(0)
                                fun(phones)
                                }
                            }

                        })
                    }
                })
            }
        })
    }
})

// 点击删除信息
$(document).on("click",".btn-del-address",function () {
    var addressid = $(this).parent().siblings(".td-names").children().attr("data-type");
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "DelAddress",
            addressid : addressid
        },
        datatype : "json",
        success : function (data) {
            var uid = $(".huojao3").val()                         
            if (data.ErrorMsg == 0) {
                $.ajax({
                    type : "get",
                    url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                    data : {
                        method: "GetAddress",
                        uid : huojiao3
                    },
                    dataType : "json",
                    success : function (data) {

                        if(data.length == 0) {
                            var kong = `
                                <div class="there">
                                    暂无数据
                                </div>
                            `
                            $(".grid-main-he-box").html(kong)

                        }else {
                            var htmla = ""
                            data.forEach(function (val,index) {
                                htmla += `
                                <div class="tiandi">
                                    <div class="grid-main-he">
                                        <div class="single-address">
                                            <ul class="cl">
                                                <li class="f-l td-checkboxs">
                                                    <input type="checkbox">
                                                </li>
                                                <li class="f-l td-names">
                                                    <span data-type="${val.addressid}">${val.receiver_name}</span>
                                                </li>
                                                <li class="f-l td-areas">
                                                    <span>${val.state}</span>
                                                    <span>${val.city}</span>
                                                    <span>${val.district}</span>
                                                </li>
                                                <li class="f-l td-streets">
                                                    <span>${val.address}</span>
                                                </li>
                                                <li class="f-l td-postcodes">
                                                    <span>${val.mobile}</span>
                                                </li>
                                                <li class="f-l td-phones" data-type="${val.is_default}">
                                                    <span class="moRen">默认收货地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <span class="p-text" data-type="${val.addressid}">设置为默认地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <span class="btn-modify-address">修改 &nbsp;</span>
                                                    <span class="btn-del-address">删除</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `
                                $(".grid-main-he-box").html(htmla)
                                
                                for( var i = 0; i < $(".td-phones").length; i++) {
                                // 确定 字符串还是布尔值 - 在判断
                                if($(".td-phones").eq(i).attr("data-type") == "true") {
                                // 改变当前元素状态
                                    $(".td-phones").eq(i).addClass("active")
                                    var phones = $(".td-phones").eq(i).children().eq(0)
                                    fun(phones)
                                    }
                                }
                            })

                        }
                    }
                })
            }
        }
    })
})

// 默认地址
function fun (phones) {
    phones.text("默认地址").css({"color":"red","display":"block"}).next().css("display","none")
}

// 点击默认地址修改
$(document).on("click",".p-text",function () {
    var uid = $(".huojao3").val()                         
    var type = $(this).attr("data-type")
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "SetDefaultAddress",
            addressid : type
        },
        datatype : "json",
        success : function (data) {
            if(data.ErrorMsg == 0) {
                $.ajax({
                    type : "get",
                    url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                    data : {
                        method: "GetAddress",
                        uid : huojiao3
                    },
                    dataType : "json",
                    success : function (data) {

                        if(data.length == 0) {
                            var kong = `
                                <div class="there">
                                    暂无数据
                                </div>
                            `
                            $(".grid-main-he-box").html(kong)

                        }else {
                            var htmla = ""
                            data.forEach(function (val,index) {
                                htmla += `
                                <div class="tiandi">
                                    <div class="grid-main-he">
                                        <div class="single-address">
                                            <ul class="cl">
                                                <li class="f-l td-checkboxs">
                                                    <input type="checkbox">
                                                </li>
                                                <li class="f-l td-names">
                                                    <span data-type="${val.addressid}">${val.receiver_name}</span>
                                                </li>
                                                <li class="f-l td-areas">
                                                    <span>${val.state}</span>
                                                    <span>${val.city}</span>
                                                    <span>${val.district}</span>
                                                </li>
                                                <li class="f-l td-streets">
                                                    <span>${val.address}</span>
                                                </li>
                                                <li class="f-l td-postcodes">
                                                    <span>${val.mobile}</span>
                                                </li>
                                                <li class="f-l td-phones" data-type="${val.is_default}">
                                                    <span class="moRen">默认收货地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <span class="p-text" data-type="${val.addressid}">设置为默认地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <span class="btn-modify-address">修改 &nbsp;</span>
                                                    <span class="btn-del-address">删除</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `
                                $(".grid-main-he-box").html(htmla)
                                
                                for( var i = 0; i < $(".td-phones").length; i++) {
                                // 确定 字符串还是布尔值 - 在判断
                                if($(".td-phones").eq(i).attr("data-type") == "true") {
                                // 改变当前元素状态
                                    $(".td-phones").eq(i).addClass("active")
                                    var phones = $(".td-phones").eq(i).children().eq(0)
                                    fun(phones)
                                    }
                                }
                            })

                        }
                    }
                })
            }
        }
    })
})


