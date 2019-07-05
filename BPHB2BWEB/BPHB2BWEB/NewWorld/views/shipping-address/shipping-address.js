
if (cookie && cookie !== 'null') {
    function getParameter(name) { 
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return unescape(r[2]); return null;
    }
    var tid = getParameter('tid')

    // ================================地区选择=====================================
    function province (dizhi,hao) {
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
    province ()

    // ================================从新选择省改变区==============================
    function region (hao) {
        console.log(11)
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

    function shippingAddressA () {
        function shippingAddress () {
            // 查找切换
            $(".next-tabs-tab-inner").click(function () {
                $(this).addClass("tabs-tab-inner").siblings().removeClass("tabs-tab-inner")
            })
        // ================================新增收货地址==================================
            $(".xinzeng").click(function () {
                $(".ui-dialog-overlay").removeClass("dis-none")
                $(".ui-dialog").removeClass("dis-none")
                $(".ming-a").val('')
                $(".xiang-a").val('')
                $(".shou-a").val('')
                $(".footer1").removeClass("dis-none")
                $(".footer2").removeClass("dis-none")
                $(".footer3").addClass("dis-none")
                $(".footer4").addClass("dis-none")
            })
        // ================================取消=========================================
            $(".footer2").click(function () {
                $(".ui-dialog-overlay").addClass("dis-none")
                $(".ui-dialog").addClass("dis-none")
            })   
            $(".footer4").click(function () {
                $(".ui-dialog-overlay").addClass("dis-none")
                $(".ui-dialog").addClass("dis-none")
            })   
        // ================================从新获取省市区=====================================
            $('.modify').click(function () {
                $(".ui-dialog-overlay").removeClass("dis-none")
                $(".ui-dialog").removeClass("dis-none")
                var pat = $(this).parent().parent()     
                $('.receiver_name').val(pat.children('.td-names').children().text())   //名字
                // var state = pat.children('.td-areas').children().eq(0).text()    //省
                // var city = pat.children('.td-areas').children().eq(1).text()     //市
                // var district = pat.children('.td-areas').children().eq(2).text() //区
                $('.input-address').text(pat.children('.td-streets').text())         //详细地址
        
                var mobile = pat.children('.td-postcodes').text()                //手机号
                var defaults = true                                              //是否默认
            })
        // ================================获取输入框焦点=====================================
            $('.yan-z').focus (function () {
                $('.tish').addClass('dis-none')
            })
        // ================================修改信息==============================
            $(".gai-g").click(function () {
                var addressid = $(this).attr('data-type')
                $(".ui-dialog-overlay").removeClass("dis-none")
                $(".ui-dialog").removeClass("dis-none")
                $(".footer3").removeClass("dis-none")
                $(".footer4").removeClass("dis-none")
                $(".footer1").addClass("dis-none")
                $(".footer2").addClass("dis-none")
                //数据回填
                var tdx = $(this).parent().parent()
                var name = tdx.children().eq(1).text()  //姓名
                var zhi = tdx.children().eq(3).text()  //地址
                var hao = tdx.children().eq(4).text()  //手机号
                $(".ming-a").attr('data-type',addressid).val(name)
                $(".xiang-a").val(zhi)
                $(".shou-a").val(hao)
            })
        }
        // ================================添加收货地址==================================
        $(document).on('click','.footer1',function () {
            Verification ()    //调取验证
        })
        // ================================更改收货地址==================================
        $(document).on('click','.footer3',function () {
            var bbs = $(this).parent().parent().parent().parent().children().eq(0).children().children().eq(0).children().eq(1).attr('data-type')
            Verification(bbs)    //调取验证
        })
        // ================================删除收货地址==================================
        $(document).on('click','.shan-g',function () {
            var shan = $(this).attr('data-type')
            _mm.request({
                data : {
                    'method'    : 'DelAddress',
                    'addressid' :  shan
                },
                success         : function (src) {
                    if (src.ErrorMsg == 0) {
                        update()
                    }
                }
            })
        })
        // ================================删除收货地址==================================
        $(document).on('click','.p-text',function () {
            var addressid = $(this).attr('data-type')
            _mm.request({
                data: {
                    'method'    : 'SetDefaultAddress',
                    'addressid' :   addressid
                },
                success  : function (src) {
                    console.log(src)
                    update()
                }
            })
        })

        // ================================查询地址信息渲染==============================
        function update() {
            _mm.request({
                data : {
                    method      : 'GetAddress',
                    uid         :  cookie,
                },
                success  : function (src) {
                    console.log(src)
                    if (src.length == 0 ) {
                        var html1 = ''
                        html1 = `
                            <div class="c6 wu0 takeCenter">数据为空</div>
                        `
                        $(".tiandi").html(html1)
                    }else {

                        
                    var html = ''
                    src.forEach(function (val,index) {
                        html += `
                        <table>
                            <tr class="tdx">
                                <td>
                                </td>
                                <td>${val.receiver_name}</td>
                                <td>
                                    <span>${val.state}</span>
                                    <span>${val.city}</span>
                                    <span>${val.district}</span>
                                </td>
                                <td>${val.address}</td>
                                <td>${val.mobile}</td>
                                <td class="td-phones-z moren-n" data-type="${val.is_default}">
                                    <span class="moRen dis-none">默认收货地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="p-text c-p" data-type="${val.addressid}">设置为默认地址 &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </td>
                                <td class="td-phones">
                                    <span class="gai-g" data-type="${val.addressid}">修改 &nbsp;&nbsp;&nbsp;</span>
                                    <span class="shan-g" data-type="${val.addressid}">删除</span>
                                </td>
                            </tr>
                        </table>
                        `
                    })
                    $(".tiandi").html(html)
                }

                    for( var i = 0; i < $(".moren-n").length; i++) {
                        // 确定 字符串还是布尔值 - 在判断
                    if($(".moren-n").eq(i).attr("data-type") == "true") {
                    // 改变当前元素状态
                        $(".moren-n").eq(i).addClass("active")
                            $('.active').children('.p-text').addClass('dis-none')
                            $('.active').children('.moRen').removeClass('dis-none')
                        }
                    }
                    shippingAddress ()

                }
            })
        } 
        update() 
        // ================================输入验证发起请求==============================
        // 判断输入内容
        function Verification (bbs) {
            var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;  //手机号正则
            if($('.ming-a').val() == '') {
                $('.tish1').removeClass('dis-none').attr('data-true',true)
                return
            }
            if($('.sheng-a').val() == '') {
                $('.tish2').removeClass('dis-none').attr('data-true',true)
                return
            }
            if($('.xiang-a').val() == '') {
                $('.tish3').removeClass('dis-none').attr('data-true',true)
                return
            }
            if(! TEL_REGEXP.test($('.shou-a').val())){
                $('.tish4').removeClass('dis-none').attr('data-true',true)
                return
            }else {
                // 地址编号     
                var iSdefault     = $(".input-issetdefault").is(':checked')              //是否默认
                var receiver_name = $(".receiver_name").val()                        //收货人
                var state         = $(".provinces option:selected").text();          //省
                var city          = $(".city option:selected").text();               //市
                var district      = $(".region option:selected").text();             //区
                var address       = $(".input-address").val()                        //详细地址
                var mobile        = $(".mobile").val()                                //手机号
                // 判断输入内容是否为空             ///没有写 未写

                console.log(iSdefault       , '是否默认')
                console.log(receiver_name   , '名称')
                console.log(state           , '省')
                console.log(city            , '市')
                console.log(district        , '区')
                console.log(address         , '详细地址')
                console.log(mobile          , '手机号')
        
                //发起请求
                if (!bbs) {
                    console.log(iSdefault)
                    _uu.request({
                        url : 'method=AddCusAddress',
                        data : {
                            'receiver_name' : receiver_name,                    //收货人
                            'state'         : state,                            //省
                            'city'          : city,                             //市
                            'district'      : district,                         //区
                            'address'       : address,                          //详细地址
                            'mobile'        : mobile,                           //电话号
                            'is_default'    : iSdefault,                             //是否默认
                            'uid'           : cookie                            //个人凭证
                        },
                        success : function (src) {
                            console.log(src)
                            if(src.ErrorMsg == 0) {
                                update()
                                $(".ui-dialog-overlay").addClass("dis-none")
                                $(".ui-dialog").addClass("dis-none")
                                if(tid == "zhi") {
                                    window.location.href = "../goodsOrder/goodsOrder.html";
                                }
                            }else {
                                alert('添加失败')
                            }
                        }
                    })
                }
                
                else {
                    _uu.request({
                        url : 'method=UpdateAddress',
                        data : {
                            "addressid"     :  bbs,
                            'receiver_name' : receiver_name,                    //收货人
                            'state'         : state,                            //省
                            'city'          : city,                             //市
                            'district'      : district,                         //区
                            'address'       : address,                          //详细地址
                            'mobile'        : mobile,                           //电话号
                            'is_default'    : iSdefault,                             //是否默认
                            'uid'           : cookie                            //个人凭证
                        },
                        success : function (src) {
                            console.log(src)
                            if(src.ErrorMsg == 0) {
                                $(".ui-dialog-overlay").addClass("dis-none")
                                $(".ui-dialog").addClass("dis-none")
                                update()
                            }else {
                                alert('添加失败')
                            }
                        }
                    })
                }
            }
        }
    }
    shippingAddressA ()
}else {
    window.location.href = "../denglu/denglu.html";
}




