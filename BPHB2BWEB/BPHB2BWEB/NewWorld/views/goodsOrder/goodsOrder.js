// ================================地区选择=====================================
if(cookie && cookie !== 'null') {
    hadenum ()
    function provincea (dizhi,hao) {
        _mm.request({
            data : {
                method   : 'GetAreaByparentID',
                parentID :  hao || 1 
            },
            success : function (src) {
                var area = ''
                src.forEach(function (val,index) {
                    area += `
                        <option value="${val.id}">${val.name}</option>
                    `
                })
                if (dizhi == 'sheng') {     //市
                    $('.city').removeClass('dis-none').children().html(area)                
                    region (hao)    //从新选择省改变区
                    return
                }else if (dizhi == 'shi') {  //区
                    $('.region').removeClass('dis-none').children().html(area)                
                    return
                }else {                     //省
                    $(".sheng1").after(area)              
                }
            }
        })
    }
    provincea ()
    
    // ================================从新选择省改变区==============================
    function region (hao) {
        var a = Number(hao)
        var parentID = a + 100
        _mm.request({
            data : {
                method   : 'GetAreaByparentID',
                parentID :  parentID
            },
            success : function (src) {
                var area = ''
                src.forEach(function (val,index) {
                    area += `
                        <option value="${val.id}">${val.name}</option>
                    `
                })
                $('.region').removeClass('dis-none').children().html(area)                
            }
        })
    }
    
    
    function proving (dizhi,hao) {
        _mm.request({
            data : {
                method   : 'GetAreaByparentID',
                parentID :  hao || 1 
            },
            success : function (src) {
                var area = ''
                src.forEach(function (val,index) {
                    area += `
                        <option value="${val.id}">${val.name}</option>
                    `
                })
                if (dizhi == 'sheng') {     //市
                    $('.city').removeClass('dis-none').children().html(area)                
                    region (hao)    //从新选择省改变区
                    return
                }else if (dizhi == 'shi') {  //区
                    $('.region').removeClass('dis-none').children().html(area)                
                    return
                }else {                     //省
                    $(".sheng1").after(area)              
                }
            }
        })
    }
    
    
    // 开始
    function goodsOrderA () {
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
                        if (data.length == 0) {
                            alert ("请添加收货地址在进入此页面")
                            window.location.href = "../shipping-address/shipping-address.html?tid=zhi";
                        }else {
                            data.forEach(function (val,index) {
                                var html = `
                                <dl class="g-unit-line addressid f-l" data-type=${val.addressid}>
                                    <i class="iconfont">&#xe614;</i>
                                    <dd>&nbsp; ${val.receiver_name}</dd>
                                </dl>
                                <dl class="g-unit-line f-l">
                                    <i class="iconfont">&#xe734;</i>
                                    <dd class="line-label-address">
                                        <span>${val.state} &nbsp;</span>
                                        <span>${val.city} &nbsp;</span>
                                        <span>${val.district} &nbsp;&nbsp;&nbsp;</span>
                                        <span>${val.address}</span>
                                    </dd>
                                </dl>
                                <dl class="g-unit-line f-l">
                                    <i class="iconfont">&#xe60d;</i>
                                    <dd>
                                        <span>${val.mobile}</span>
                                    </dd>
                                </dl>
                            `
                            $(".g-address-info").html(html)
                
                            })
                        }
    
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
            })
            // 点击更改
            $(document).on("click",".g-edit-temp-address",function () {
                $(".g-address-info-block").css("display","none")
                $(".g-address-list-block").css("display","block");
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
                                        <div class="g-panel c-p f-r" data-id="${val.addressid}">
                                            <a class="p-xg g-address-temp-block"></a>
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
                                                    <span class="cl f-l">所 有 地 区 &nbsp;:&nbsp;</span>
                                                    <!-- 省 -->
                                                    <span class="select-box f-l">
                                                        <select name="" id="" class="select provinces sheng-a yan-z" onchange="proving('sheng',value)" >
                                                            <option class="sheng1" value="">请选择城市</option>
                                                        </select>
                                                    </span>
                                                    <!-- 市 -->
                                                    <span class="select-box dis-none  city f-l">
                                                        <select name="" class="select shia" onchange="proving('shi',value)">
                                                        </select>
                                                    </span>
                                                    <!-- 区 -->
                                                    <span class="select-box dis-none region  f-l">
                                                        <select class="select qua" onchange="proving('qu',value)">
                                                        </select>
                                                    </span>
                                                </li>
            
                                                <li class="cl xiangzhi">
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
                            proving()
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
                    }else  if($(".g-default").eq(i).attr("data-type") == "undefined" || "false"){
                        // 改变当前元素状态
                        $(".g-default").eq(i).addClass("actives")
                        var htmla = `
                            <span class="g-isdefault ble cl00">设为默认地址</span>
                        `
                        $(".g-address-list").children().eq(i).find(".p-xg").before(htmla)
                    }
                }
            }
            
            // 设为默认地址
            $(document).on("click",".cl00",function () {
                var addid = $(this).parent().attr("data-id")
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

            $(".ya").focus(function () {
                $(".ya1").addClass("dis-none")
            })


            // 点击确认 临时地址
            $(".p-button-stressA").click(function () {
                var receiver_name = $(".edit-areA").find(".lang-input").val()
                var state = $(".edit-areA").find(".provinces option:selected").text(); //省
                var city = $(".edit-areA").find(".citys option:selected").text();//市
                var district = $(".edit-areA").find(".selects option:selected").text();//区
                var address = $(".edit-areA").find(".p-input-address").val() //详细地址
                var mobile = $(".edit-areA").find(".p-address-chooser").val() //手机号

                if (receiver_name == '') {
                    $(".shou2").removeClass("dis-none")
                }else if (district == '') {
                    $(".zhi2").removeClass("dis-none")
                }else if (address == '') {
                    $(".xiang2").removeClass("dis-none")
                }else if (mobile == '') {
                    $(".ji2").removeClass("dis-none")
                }else {
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
                            if (data.ErrorMsg == 0) {
                                window.location.reload()
                            }
                        }
                    })
                }



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
                        var pricex = price.toFixed(2)
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
                                    <button class="minus yang c-p f-l">
                                        <span>-</span>
                                    </button>
                                    <input type="text" value="${val.qty}" class="lang-input f-l">
                                    <button class="plus yang c-p f-l">
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
                            <div class="f-r data-spm-anchor">
                                <div class="cl">
                                    <div class="f-r">
                                        <span class="labele">货品总金额 :</span>
                                        <strong class="control">${pricex}</strong>
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
                if (jian == 1) {
                    jian = 1
                }else {
                    jian --
                    $(this).next().val(jian)
                    Neb ($(this))
                    var dataId = $(this).parent().attr("data-type")
                    update (dataId,jian)
                }

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
                hadenum ()
                var su =  Number(This.parent().children(".lang-input").val()) 
                var ja =  Number(This.parent().parent().children(".unit-price").children().text())
                var he = su * ja
                var aaa = he.toFixed(2)
                This.parent().parent().next().find(".control").text(aaa)
                sum ()
            }
            // ============================================应付总额======================================
            function sum () {
                var nbe = 0
                var nbex
                $(".control").each(function () {
                   nbe += Number($(this).text())
                    nbex = nbe.toFixed(2)
                })
                var zgneb = `
                    <span>${nbex}</span>
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
                        window.location.href='../payment/payment.html?tid='+val.tid+'';
                    })
                }
            })
    
        })
    }
    
    goodsOrderA ()
    
}else {
    window.location.href = "../denglu/denglu.html";
}

