// 获取cookie
var cookie = $.cookie('kie');

function goodsOrder () {

$(document).ready(function () {
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "GetAddress",
            uid : cookie,
            isdefaul : 1
        },
        dataType : "json",
        success : function (data) {
            data.forEach(function (val,index) {
                var html = `
                <dl class="g-unit-line addressid f-l" data-type=${val.addressid}>
                    <i class="Hui-iconfont">&#xe62c;</i>
                    <dd>&nbsp; ${val.receiver_name}</dd>
                </dl>
                <dl class="g-unit-line f-l">
                    <i class="Hui-iconfont">&#xe6c9;</i>
                    <dd class="line-label-address">
                        <span>${val.state} &nbsp;</span>
                        <span>${val.city} &nbsp;</span>
                        <span>${val.district} &nbsp;&nbsp;&nbsp;</span>
                        <span>${val.address}</span>
                    </dd>
                </dl>
                <dl class="g-unit-line f-l">
                    <i class="Hui-iconfont">&#xe6c7;</i>
                    <dd>
                        <span>${val.mobile}</span>
                    </dd>
                </dl>
            `
            $(".g-address-info").html(html)

            })
        }

    })
})
$(document).on("click",".p-radio",function () {
    $(".show-copy-area").addClass("g-address-temp-block")
    $(".p-he").addClass("g-mo")
    $(".g-address-list").children().removeClass("s-panel")
    $(".g-default").find(".g-panel").removeClass("p-bok").addClass("p-no")
    $(this).parent().parent().parent().addClass("s-panel")
    $(this).parent().parent().find(".g-panel").removeClass("p-no").addClass("p-bok")
    sPanel ()
})


$(document).on("click",".g-edit-address-info",function () {
    $(".g-address-info-block").css("display","none")
    $(".g-address-temp-block").slideDown("slow");
    box()
})

// 点击更改
$(document).on("click",".g-edit-temp-address",function () {
    $(".g-address-info-block").css("display","none")
    $(".g-address-list-block").slideDown("slow");
    console.log(111)
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "GetAddress",
            uid : cookie
        },
        dataType : "json",
        success : function (data) {

            if(data.length == 0) {
                var kong = `
                    <div class="there">
                        暂无数据
                    </div>
                `
                $(".g-address-list").html(kong)

            }else {
                var html = ""
                data.forEach(function (val,index) {
                    console.log(val)
                    html += `
                    <li class="g-default" data-type="${val.is_default}" data-id="${val.addressid}">
                        <div class="p-he cl">   
                            <span class="g-lang-radio">
                                <input type="radio" name="1" value="a" class="p-radio">
                            </span>
                            <div class="g-select-label">
                                <span>${val.receiver_name}</span>
                                <span>${val.state}</span>
                                <span>${val.city}</span>
                                <span>${val.district}</span>
                                <span>${val.address}</span>
                                <span>${val.mobile}</span>
                            </div>
                            <div class="g-panel f-r" data-id="${val.addressid}">
                                <a class="p-xg g-address-temp-block">修改</a>
                            </div>
                        </div>


                        <div class="show-copy-area g-address-temp-block">
                            <div class="p-zone-editaddress">
                                <ul class="edit-area">
                                    <li class="p-fd-clr cl">
                                        <div class="f-l letter-2">收 &nbsp; 货 &nbsp; 人 &nbsp;:</div>
                                        <div class="f-l"> <input type="text" class="lang-input" value="${val.receiver_name}"> </div>
                                    </li>

                                    <li class="unit-line cl">
                                        <span class="cl f-l mr20">所 在 地 区:</span>
                                            <span class="select-box size-MINI td115 province f-l">
                                                <select nullmsg="请选择所在城市！" datatype="*" name="" size="1" class="select provinces" onchange="province()">
                                                    <option selected="" value="">请选择城市</option>
                                                </select>
                                            </span>
                                            <span class="select-box size-MINI td115 city f-l">
                                                <select nullmsg="请选择所在城市！" datatype="*" name="" size="1" class="select citys" onchange="city()">
                                                </select>
                                            </span>
                                            <span class="select-box size-MINI td115 district f-l">
                                                <select nullmsg="请选择所在城市！" datatype="*" name="" size="1" class="select selects">
                                                </select>
                                            </span>
                                        </span>
                                    </li>

                                    <li class="cl">
                                        <div class="f-l letter-2">详 细 地 址 :</div>
                                        <div><textarea name="" id="" cols="30" rows="10" class="p-input-address" >${val.address}</textarea></div>
                                    </li>

                                    <li class="p-fd-clr cl">
                                        <div class="f-l letter-2"> 手 &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机 :</div>
                                        <div class="f-l"> <input type="text" class="lang-input p-address-chooser" value="${val.mobile}"></div>
                                    </li>

                                </ul>
                            </div>
                        </div>


                    </li>
                `
                    $(".g-address-list").html(html)
                    // hade 头部 模板
                    $(".g-address-list").children().eq(0).addClass("s-panel")
                    $(".g-address-list").children().eq(0).find(".g-panel").addClass("p-bok")
                    $(".g-address-list").children().eq(0).children().children().children().attr("checked",true)
                    moren ()
                    sPanel ()

                })
            }
        }
    })
})

function moren () {
    for( var i = 0; i < $(".g-default").length; i++) {
        // 确定 字符串还是布尔值 - 在判断
        if($(".g-default").eq(i).attr("data-type") == "true") {
        // 改变当前元素状态
            $(".g-default").eq(i).addClass("actives")
            var htmls = `
                <span class="g-isdefault ble">默认地址</span>
            `
            $(".g-address-list").children().eq(i).find(".p-xg").before(htmls)
            $(".g-address-list").children().eq(i).find(".g-panel").addClass("g-mo")
        }else  if($(".g-default").eq(i).attr("data-type") == "false"){
            // 改变当前元素状态
            $(".g-default").eq(i).addClass("actives")
            var htmla = `
                <span class="g-isdefault ble cl00">设为默认地址</span>
            `
            $(".g-address-list").children().eq(i).find(".p-xg").before(htmla)
        }
    }
}

// 点击修改
$(document).on("click",".p-xg",function () {
    $(".select").removeClass("btbt")
    $(".g-default").removeClass("p-xin")
    $(".g-default").removeClass("s-panel")
    $(this).parent().parent().parent().children(".show-copy-area").removeClass("g-address-temp-block")
    $(this).parent().parent().removeClass("g-mo").addClass("g-address-temp-block")
    $(this).parent().parent().parent().addClass("p-xin")
    $(this).parent().parent().parent().find(".select").addClass("btbt")
    box ()
})

// 点击确认修改
$(document).on("click",".p-button-stress",function () {
    var receiver_name = $(".p-xin").find(".lang-input").val()//收货人姓名
    var state = $(".p-xin").find(".provinces option:selected").text(); //省
    var city = $(".p-xin").find(".citys option:selected").text();//市
    var district = $(".p-xin").find(".selects option:selected").text();//区
    var address = $(".p-xin").find(".p-input-address").text() //详细地址
    var mobile = $(".p-xin").find(".p-address-chooser").val() //手机号
    var addressid = $(".p-xin").attr("data-id")

    datas = {
        "state"         :  state,           //省
        "addressid"     :  addressid,       //id
        "city"          :  city,            //市
        "district"      :  district,        //区
        "address"       :  address,         //详细地址
        "receiver_name" :  receiver_name,    //收货人
        "mobile"        :  mobile,          //手机号码
        "is_default"    :  false,       //默认是否选择
        "uid"           :  cookie,             //用户名
    }


    $.ajax({
        type : "post",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx?method=UpdateAddress",
        data : JSON.stringify(datas),
        dataType : "json",
        success : function (data) {
            window.location.reload()
        }
    })

})

// 设为默认地址
$(document).on("click",".cl00",function () {
    var addid = $(this).parent().attr("data-id")
    console.log(addid)
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "SetDefaultAddress",
            addressid : addid
        },
        datatype : "json",
        success : function (data) {
            window.location.reload()
        }
    })
})

function sPanel () {
    $(".p-xg").removeClass("g-mo").addClass("g-address-temp-block")
    $(".s-panel").children().eq(0).find(".p-xg").removeClass("g-address-temp-block").addClass("g-mo")
}
sPanel ()

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
// 获取市区
function province () {
    //获取id  
    $(".city").css("display","block")
    var provincE = $(".btbt option:selected").val()
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
            console.log(data)
            var htmlz 

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


// 直接获取市
function provinceA () {
    console.log(111)
    var provincA = $(".provinces option:selected").val()
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "GetAreaByparentID",
            parentID : provincA
        },
        dataType : "json",
        success : function (data) {
            console.log(data)
            var htmlz 

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
function cityA () {
    var citysA = $(".citys option:selected").val()
    $.ajax({
        type : "get",
        url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data : {
            method: "GetAreaByparentID",
            parentID : citysA || id
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

// 点击确认 临时地址
    $(".p-button-stressA").click(function () {
        var receiver_name = $(".edit-areA").find(".lang-input").val()
        var state = $(".edit-areA").find(".provinces option:selected").text(); //省
        var city = $(".edit-areA").find(".citys option:selected").text();//市
        var district = $(".edit-areA").find(".selects option:selected").text();//区
        var address = $(".edit-areA").find(".p-input-address").text() //详细地址
        var mobile = $(".edit-areA").find(".p-address-chooser").val() //手机号
        console.log(state)
        console.log(city)
        console.log(district)

        
        datas = {
            "state"         :  state,           //省
            "city"          :  city,            //市
            "district"      :  district,        //区
            "address"       :  address,         //详细地址
            "receiver_name" :  receiver_name,    //收货人
            "mobile"        :  mobile,          //手机号码
            "is_default"    :  true,       //默认是否选择
            "uid"           :  cookie,             //用户名
        }

        $.ajax({
            type : "post",
            url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx?method=AddCusAddress",
            data: JSON.stringify(datas),
            dataType : "json",
            success : function (data) {
                console.log(data)
            }
        })
    })
}
$.ajax({
    type : "get",
    url  :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
    data :  {
        method   : "GetCart",
        uid      : cookie,
        Isselect : 1
    },
    dataType : "json",
    success : function (data) {
        single = "",
        data.forEach(function (val,index) {
            var price = val.price * val.qty
            single +=`
                <ul class="cl">
                    <li class="f-l cl cell-thumbnail">
                        <img class="f-l" src="${val.picurl}" alt="">
                        <div class="f-l offer-title">
                            <a href="">${val.title}</a>
                            <div>
                                <span>颜色 : ${val.skuName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span> 尺码 : M</span>
                            </div>
                        </div>
                    </li>
                    <li class="unit-price f-l">
                        <span>${val.price}</span>
                    </li>
                    <li class="unit-finecontrol f-l" data-type="${val.ShoppingCartItemId}">
                        <button class="minus yang f-l">
                            <span>-</span>
                        </button>
                        <input type="text" value="${val.qty}" class="lang-input f-l">
                        <button class="plus yang f-l">
                            <span>+</span>
                        </button>
                    </li>
                    <li class="rebate f-l">
                        <div class="unit-select">
                            省25:一件可拍
                        </div>
                    </li>
                </ul>

                <div class="summary">
                <div class="f-l data-spm-anchol">
                    <span class="f-l">给卖家留言 : </span>  
                    <textarea class="f-l z-text" value="你猜猜"></textarea>
                </div>
                <div class="f-r data-spm-anchor">
                    <div class="cl">
                        <div class="f-r">
                            <span class="labele">货品总金额 :</span>
                            <strong class="control">${price}</strong>
                        </div>

                    </div>
                    <div class="cl">
                        <div class="f-r">
                            <span class="labele">运费共计 :</span>
                            <strong class="controli">6.00</strong>元
                        </div>
                    </div>
                    <div class="box-remind-lumptip">
                        <div>
                            货品的库存以实际支付为准，下单后请尽快完成支付
                        </div>
                    </div>
                </div>
            </div>
            `
        })
        $(".zone-order").html(single)
        goodsOrder ()
        sum()
    }
})
// ============================================点击加======================================
$(document).on("click",".plus",function () {
    var pal = $(this).prev().val()
    pal ++
    $(this).prev().val(pal)
    Neb ($(this))
    var dataId = $(this).parent().attr("data-type")
    update (dataId,pal)
})
// ============================================点击减======================================
$(document).on("click",".minus",function () {
    var jian = $(this).next().val()
    jian --
    $(this).next().val(jian)
    Neb ($(this))
    var dataId = $(this).parent().attr("data-type")
    update (dataId,jian)
})
// ============================================输入数量======================================
$(document).on("keyup",".lang-input",function () {
    Neb ($(this))
    var zhi = $(this).val()
    var dataId = $(this).parent().attr("data-type")
    update (dataId,zhi)
})
// ============================================更新数量======================================
function Neb (This) {
    var su = This.parent().children(".lang-input").val()
    var ja = This.parent().parent().children(".unit-price").children().text()
    var he = su * ja
    This.parent().parent().next().find(".control").text(he)
    sum ()
}
// ============================================应付总额======================================
function sum () {
    var nbe = 0
    $(".control").each(function () {
       nbe += Number($(this).text())
    })
    var zgneb = `
        <span>${nbe}</span>
    `
    $(".p-nbe").html(zgneb)
}
//======================================更新购物车数量==========================================

function  update (dataId,nebr) {
    $.ajax({
        type      :  "get",
        url       :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data      :  {
            method           : "UpdateCartItem",
            shoppingcartId   :  dataId,
            qty              :  nebr
        },
        datatype  :  "json",
        success   :   function (data) {
            console.log(data)
        }
    }
)}

//======================================点击提交订单==========================================
$(".make-order").click(function () {
    var addressid = $(".addressid").attr("data-type")
    $.ajax({
        type      :  "get",
        url       :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
        data      :  {
            method           : "CreateOrder",
            uid              : cookie,
            adressID         : addressid
        },
        datatype  :  "json",
        success   :   function (data) {
            data.forEach(function (val,index) {
                alert("创建成功")
                window.location.href='../payment/payment.html?tid='+val.tid+'';
            })
        }
    })
})