/**
 * Created by Administrator on 2017/5/24.
 */
// hade 头部 模板
// 获取购物车

if (cookie && cookie !== 'null') {
    $(document).ready(function () {
        hadenum ()
        // 初始化获取购物车
        function ready () {
            $.ajax({
                type      :  "get",
                url       :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                data      :  {
                    method : "GetCart",
                    uid    : cookie
                },
                datatype  :  "json",
                success   :   function (data) {
                    console.log(data)
                    if (data.length == 0) {
                        var html = `
                            <div class="c-offerlist cl">
                                <img class="t-c-f tuwu" src="../../assets/image/bjimg/wu.jpg" alt="">
                                <div class="shang t-c-f">
                                    购物车数量为空
                                </div>
                            </div>
                        `
                        $(".order_content").html(html)
                    }else {
                        var htmls = ""
                        data.forEach(function (val,index) {
                            var qtyx = val.qty * val.price   //数量 * 价格
                            var qty = qtyx.toFixed(2)
                            htmls += `
                            <ul class="order_lists" data="${val.ShoppingCartItemId}">
                                <li class="list_chk">
                                    <input type="checkbox" type-ma="${val.ShoppingCartItemId}" id="${index}" class="son_check">
                                    <label type="${val.selected}" for="${index}"></label>
                                </li>
                                <li class="list_con">
                                    <div class="list_img"><a href="javascript:;"><img src="${val.picurl}" alt=""></a></div>
                                    <div class="list_text"><a href="javascript:;">${val.title}</a></div>
                                </li>
                                <li class="list_info">
                                    <p>规格：${val.skuName}</p>
                                </li>
                                <li class="list_price">
                                    <p class="price">￥${val.price}</p>
                                </li>
                                <li class="list_amount">
                                    <div class="amount_box" data-type="${val.ShoppingCartItemId}">
                                        <a href="javascript:;" class="reduce reSty">-</a>
                                        <input type="text" value="${val.qty}" class="sum">
                                        <a href="javascript:;" class="plus">+</a>
                                    </div>
                                </li>
                                <li class="list_sum">
                                    <p class="sum_price">￥${qty}</p>
                                </li>
                                <li class="list_op">
                                    <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                                </li>
                            </ul>
                            `
                        })
                        $(".order_content").html(htmls)
                        for (var i = 0; i< $(".order_lists").length ; i++) {
                            if ($('.order_lists').eq(i).children('.list_chk').children("label").attr('type') == 'true') {
                                $('.order_lists').eq(i).children('.list_chk').children().eq(1).addClass('mark')
                                $('.order_lists').eq(i).children('.list_chk').children().eq(0).attr('checked',true);
                            }   
                        }
                        fun ()
                    }
                }
            })
        }
        ready ()
    })
    
    function fun ()  {
        $(function () {
    
                //全局的checkbox选中和未选中的样式
                var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
                    $wholeChexbox = $('.whole_check'),
                    $cartBox = $('.cartBox'),                       //每个商铺盒子
                    $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
                    $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
                $allCheckbox.click(function () {
                    if ($(this).is(':checked')) {
                        $(this).next('label').addClass('mark');
                    } else {
                        $(this).next('label').removeClass('mark')
                    }
                });
            
    //===============================================全局全选与单个商品的关系================================
                $wholeChexbox.click(function () {
                    var $checkboxs = $cartBox.find('input[type="checkbox"]');
                    var quan = $(this).is(':checked')
                    if ($(this).is(':checked')) {
                        $checkboxs.prop("checked", true);
                        $checkboxs.next('label').addClass('mark');
                    } else {
                        $checkboxs.prop("checked", false);
                        $checkboxs.next('label').removeClass('mark');
                    }
                    totalMoney();
                    quanxuan (quan)
                });


                function box () {
                    $sonCheckBox.each(function () {
                        if ($(this).is(':checked')) {
                            //判断：所有单个商品是否勾选
                            var len = $sonCheckBox.length;
                            var num = 0;
                            $sonCheckBox.each(function () {
                                if ($(this).is(':checked')) {
                                    num++;
                                }
                            });
                            if (num == len) {
                                $wholeChexbox.prop("checked", true);
                                $wholeChexbox.next('label').addClass('mark');
                            }
                        } else {
                            //单个商品取消勾选，全局全选取消勾选
                            $wholeChexbox.prop("checked", false);
                            $wholeChexbox.next('label').removeClass('mark');
                        }
                    })
                    totalMoney();

                }
                box ()

            
                $sonCheckBox.each(function () {
                    $(this).click(function () {  
                        var trfs = ($(this).is(':checked'))
                        var ma = ($(this).attr('type-ma'))
                        if ($(this).is(':checked')) {
                            //判断：所有单个商品是否勾选
                            var len = $sonCheckBox.length;
                            var num = 0;
                            $sonCheckBox.each(function () {
                                if ($(this).is(':checked')) {
                                    num++;
                                }
                            });

                            if (num == len) {
                                $wholeChexbox.prop("checked", true);
                                $wholeChexbox.next('label').addClass('mark');
                                // danxuan ()
                                console.log(111)
                            }
                        } else {
                            danxuan (trfs,ma)
                            //单个商品取消勾选，全局全选取消勾选
                            $wholeChexbox.prop("checked", false);
                            $wholeChexbox.next('label').removeClass('mark');
                        }
                        danxuan (trfs,ma)
                    })
                })
            
    //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================
            
                //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
                $shopCheckbox.each(function () {
                    $(this).click(function () {
                        if ($(this).is(':checked')) {
                            //判断：店铺全选中，则全局全选按钮打对勾。
                            var len = $shopCheckbox.length;
                            var num = 0;
                            $shopCheckbox.each(function () {
                                if ($(this).is(':checked')) {
                                    num++;
                                }
                            });
                            if (num == len) {
                                $wholeChexbox.prop("checked", true);
                                $wholeChexbox.next('label').addClass('mark');
                            }
                            //店铺下的checkbox选中状态
                            $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                            $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
                            
                        } else {
                            //否则，全局全选按钮取消对勾
                            $wholeChexbox.prop("checked", false);
                            $wholeChexbox.next('label').removeClass('mark');
            
                            //店铺下的checkbox选中状态
                            $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                            $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
                        }
                        totalMoney();
                    });
                });
            
            
    //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================
            
                //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
                $cartBox.each(function () {
                    var $this = $(this);
                    var $sonChecks = $this.find('.son_check');
                    $sonChecks.each(function () {
                        $(this).click(function () {
                            if ($(this).is(':checked')) {
                                
                                //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                                var len = $sonChecks.length;
                                var num = 0;
                                $sonChecks.each(function () {
                                    if ($(this).is(':checked')) {
                                        num++;
                                    }
                                });
                                if (num == len) {
                                    $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                                    $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                                }
                            } else {
                                //否则，店铺全选取消
                                $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                                $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                            }
                            totalMoney();
                        });
                    });
                });
            
            
    //=================================================商品数量==============================================
                var $plus = $('.plus'),
                    $reduce = $('.reduce'),
                    $all_sum = $('.sum');
                $plus.click(function () {
                    var $inputVal = $(this).prev('input'),
                        $count = parseInt($inputVal.val())+1,                               //数量
                        $obj = $(this).parents('.amount_box').find('.reduce'),
                        $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                        $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                        $priceTotal = $count*$price.substr(1,Number.POSITIVE_INFINITY)
                        $inputVal.val($count);
                        $priceTotalObj.html('￥'+$priceTotal.toFixed(2));
    
                    var count = $count                                  //数量
                    var dataId = $(this).parent().attr("data-type")     //商品id
                    update (dataId,count)                               //请求更改数量               
    
                    if($inputVal.val()>1 && $obj.hasClass('reSty')){
                        $obj.removeClass('reSty');
                    }
                    totalMoney();
                    hadenum ()
    
                });
            
                $reduce.click(function () {
                    var $inputVal = $(this).next('input'),
                        $count = parseInt($inputVal.val())-1,
                        $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                        $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                        $priceTotal = $count*$price.substr(1,Number.POSITIVE_INFINITY)
                    if($inputVal.val()>1){
                        $inputVal.val($count);
                        $priceTotalObj.html('￥'+$priceTotal.toFixed(2));
                        var count = $count                                  //数量
                        var dataId = $(this).parent().attr("data-type")     //商品id
                        update (dataId,count)                               //请求更改数量    
                    }
                    if($inputVal.val()==1 && !$(this).hasClass('reSty')){
                        $(this).addClass('reSty');
                    }
    
                    totalMoney();
                    hadenum ()
                });
            
                $all_sum.keyup(function () {
                    var $count = 0,
                        $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                        $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                        $priceTotal = 0;
                    if($(this).val()==''){
                        $(this).val('1');
    
                    }
                    $(this).val($(this).val().replace(/\D|^0/g,''));
                    $count = $(this).val();
                    $priceTotal = $count*$price.substr(1,Number.POSITIVE_INFINITY)
                    $(this).attr('value',$count);
                    $priceTotalObj.html('￥'+$priceTotal.toFixed(2));
    
                    var count = $(this).val()                                  //数量
                    var dataId = $(this).parent().attr("data-type")     //商品id
                    update (dataId,count)                               //请求更改数量   
                    totalMoney();
                    hadenum ()
    
                })
            
    //======================================清空购物车商品========================================
                $(".list_empty").click(function () {
                    empty ()
                    ready ()
                })
    //======================================移除商品========================================
            
                var $order_lists = null;
                var $order_content = '';
                $('.delBtn').click(function () {
                    console.log(11)
                    $order_lists = $(this).parents('.order_lists');
                    $order_content = $order_lists.parents('.order_content');
                    $('.model_bg').fadeIn(300);
                    $('.my_model').fadeIn(300);
                });
            
                //关闭模态框
                $('.closeModel').click(function () {
                    closeM();
                });
                $('.dialog-close').click(function () {
                    closeM();
                });
                function closeM() {
                    $('.model_bg').fadeOut(300);
                    $('.my_model').fadeOut(300);
                }
                //确定按钮，移除商品
                $('.dialog-sure').click(function () {
                    console.log(1)
                    var dataId = $order_lists.attr("data")
                    $.ajax({
                        type      :  "get",
                        url       :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                        data      :  {
                            method : "DeleteSC",
                            shoppingcartId   :  dataId
                        },
                        datatype  :  "json",
                        success   :   function (data) {
                            if(data.ErrorMsg == 0) {
                                $order_lists.remove();
                                console.log(dataId)
                                if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
                                    $order_content.parents('.cartBox').remove();
                                }
                                closeM();
                                $sonCheckBox = $('.son_check');
                                totalMoney();
                                hadenum ()
                            }else {
                                alert("删除失败")
                            }
                        },
                    })
                })
            
    //======================================总计==========================================
            
                function totalMoney() {
                    var total_money = 0;
                    var total_count = 0;
                    var calBtn = $('.calBtn a');
                    $sonCheckBox.each(function () {
                        if ($(this).is(':checked')) {
                            var goods = ($(this).parents('.order_lists').find('.sum_price').html().substr(1,Number.POSITIVE_INFINITY));
                            var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
                            total_money += Number(goods);
                            total_count += num;
                        }
                    });
                    $('.total_text').html('￥'+total_money.toFixed(2));
                    $('.piece_num').html(total_count);
            
                    // console.log(total_money,total_count);
            
                    if(total_money!=0 && total_count!=0){
                        if(!calBtn.hasClass('btn_sty')){
                            calBtn.addClass('btn_sty');
                        }
                    }else{
                        if(calBtn.hasClass('btn_sty')){
                            calBtn.removeClass('btn_sty');
                        }
                    }
                }
            });
    //======================================结算==================================================
            $(document).on("click",".btn_sty",function () {
                window.location.href = "../goodsOrder/goodsOrder.html";
                // if($("#all").is(':checked') == true) {
                //     console.log("全选")
                //     quanxuan ()
                // }else {
                //     var box = $(".mark")
                //     // var box = $(".tue").parent().parent().Children(".list_amount").Children().attr("data-type")
                //     for(var j = 0; j < box.length; j++) {
                //         var neb = (box.eq(j).parent().parent().children(".list_amount").children().attr("data-type")) 
                //         danxuan (neb)
                //     }
                // }
            })
    
    
    //======================================更新购物车数量==========================================
    
            function  update (dataId,nebr) {
                console.log(dataId)
                console.log(nebr)
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
    
    //======================================清空购物车==========================================
            function  empty () {
                $.ajax({
                    type      :  "get",
                    url       :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                    data      :  {
                        method: "ClearSC",
                        uid   :  cookie
                    },
                    datatype  :  "json",
                    success   :   function (data) {
                        console.log(data)
                        $(".order_content").html("")
                        hadenum ()
                        var html = `
                            <div class="c-offerlist cl">
                                <img class="t-c-f tuwu" src="../../assets/image/bjimg/wu.jpg" alt="">
                                <div class="shang t-c-f">
                                    购物车数量为空
                                </div>
                            </div>
                        `
                        $(".order_content").html(html)
                    }
                }
            )}
    
    //======================================全选选中==========================================
    
            function quanxuan (quan) {
                $.ajax({
                    type      :  "get",
                    url       :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                    data      :  {
                        method: "AllChooseCart",
                        uid   :  cookie,
                        choose : quan
                    },
                    datatype  :  "json",
                    success   :   function (data) {
                        if (data.ErrorMsg == 0) {
                            console.log(123)
                        }else {
                            alert ('结算异常')
                        }
                    }
                })
            }
    
    
    //======================================单选选中==========================================
    
            function danxuan (trfs,ma) {
                console.log(111)
                console.log(trfs, ma)
                $.ajax({
                    type      :  "get",
                    url       :  "http://192.168.2.254:9000/interface/B2BAPI.ashx",
                    data      :  {
                        method: "ChooseCartItem",
                        shoppingcartId   : ma,
                        choose : trfs
                    },
                    datatype  :  "json",
                    success   :   function (data) {
                        console.log(data , 666)
                        if (data.ErrorMsg == 0) {
                            console.log('成功')
                        }else {
                            alert ('结算异常')
                        }
                    }
                })
            }
    
    }
    
}else {
    window.location.href = "../denglu/denglu.html";
}
