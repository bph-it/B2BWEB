
// 注册
$(".next-input-large").blur(function () {
    // 获取input属性
    var attr = $(this).attr("data-type")
    // 获取 输入内容
    var uids = $(this).val()
    // 获取 提示标题
    var hint = $(this).next()
    //  获取this
    var _this = $(this)


    // 开始判断
    if (attr == "uid") {
        // 用户名为4-16个字符(可包含中文,数字,字母和下划线)js正则表达式
        var reg = /^[\u4e00-\u9fa5\w]{4,16}$/;
        if(reg.test(uids)){
            _this.removeClass("bdred").attr("myAttr","true")
            hint.css("display","none")
        }else {
            _this.addClass("bdred").attr("myAttr","false")
            hint.css("display","block")
        }
        return
    } else if (attr == "password") {
        // 密码必须由6-16个英文字母和数字的字符串组成！
        var reg=/^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
        if (reg.test(uids)) {
            _this.removeClass("bdred").attr("myAttr","true");
            hint.css("display","none")
        }else {
            _this.addClass("bdred").attr("myAttr","false");
            hint.css("display","block")
        }
        return

    } else if (attr == "passwordS") {
        var pas = $(".pas").val()
        // 确认密码
        if (uids == pas) {
            _this.removeClass("bdred").attr("myAttr","true");
            hint.css("display","none")
        }else {
            _this.addClass("bdred").attr("myAttr","false");
            hint.css("display","block")
        }
        return

    } else if (attr == "nick") {
        // 密码必须由6-16个英文字母和数字的字符串组成！
        var reg=/^[\u4e00-\u9fa50-9A-Za-z]+$/;
        if (reg.test(uids)) {
            _this.removeClass("bdred").attr("myAttr","true");
            hint.css("display","none")
        }else {
            _this.addClass("bdred").attr("myAttr","false");
            hint.css("display","block")
        }
        return
    } else if (attr == "companyname") {
        // 密码必须由6-16个英文字母和数字的字符串组成！
        var reg=/^[\u4e00-\u9fa50-9A-Za-z]+$/;
        if (reg.test(uids)) {
            _this.removeClass("bdred").attr("myAttr","true");
            hint.css("display","none")
        }else {
            _this.addClass("bdred").attr("myAttr","false");
            hint.css("display","block")
        }
        return
    } else if (attr == "mobile") {
        // 验证手机号
        var reg=/^1[34578]\d{9}$/; 
        if (reg.test(uids)) {
            _this.removeClass("bdred").attr("myAttr","true");
            hint.css("display","none")
        }else {
            _this.addClass("bdred").attr("myAttr","false");
            hint.css("display","block")
        }
        return
    }
})
    // 点击注册
$(".next-btn-primary").click(function () {
    // 账号
    var _uit = $(".uit").attr("myAttr")
    // 密码
    var _pas = $(".pas").attr("myAttr")
    // 确认密码
    var _pasS = $(".pasS").attr("myAttr")
    // 联系人姓名
    var _nic = $(".nic").attr("myAttr")
    // 企业名称
    var _com = $(".com").attr("myAttr")
    // 联系人电话
    var _mod = $(".mob").attr("myAttr")



    // 判断 输入 是否正确 正确发起请求
    if(_uit !== "true"){
        console.log("账号错误")
    } else if (_pas !== "true") {
        console.log("密码错误")
    } else if(_pasS !== "true") {
        console.log("确认密码错误")
    } else if(_nic !== "true") {
        console.log("联系人姓名错误")
    } else if(_com !== "true") {
        console.log("企业名称错误")
    } else if(_mod !== "true") {
        console.log("联系人电话错误")
    } else if (true) {
        // 判断用户名是否可以注册
        var uiD = $(".uit").val()   //获取用户名
        // 发起请求
        $.ajax({
            type :"get",
            url  :"http://192.168.2.254:9000/interface/B2BAPI.ashx",
            dataType : "json",
            data: {
                method : "verifyuid",
                uid     :  uiD
            },
            success : function (data) {
                // 判断 能否注册
                if(data.msg == "用户名已存在"){
                    // 不能注册 用户名已存在
                    alert("用户名已存在,请重新输入")
                } else {
                    // 能注册 注册成功

                    // 账号
                    var $uit = $(".uit").val()
                    // 密码
                    var $pas = $(".pas").val()
                    // 联系人姓名
                    var $nic = $(".nic").val()
                    // 企业名称
                    var $com = $(".com").val()
                    // 联系人电话
                    var $mod = $(".mob").val()
                    // 是否销售 单选
                    var issale = $('.radioA input:radio:checked').val()
                    // 是否采购 单选
                    var ispurchase = $('.radioB input:radio:checked').val()

                    // 数据
                    datas = {"uid"           : $uit,
                            "password"      : $pas,
                            "nick"          : $nic,
                            "companyname"   : $com,
                            "issale"        : issale,
                            "ispurchase"    : ispurchase,
                            "mobile"        : $mod
                    },
                    // 发起请求
                    $.ajax({
                        type :"post",
                        url  :"http://192.168.2.254:9000/interface/B2BAPI.ashx?method=register",
                        dataType : "json",
                        data: JSON.stringify(datas),
                        success : function (data) {
                            if (data.ErrorMsg) {
                                window.location.href = "../home/home.html";
                            } else {
                                alert ("注册异常")
                            }
                        }
                    })

                }
            },
        })


    }
   
})  
