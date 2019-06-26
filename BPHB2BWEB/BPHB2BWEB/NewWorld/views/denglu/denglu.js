$(document).ready(function () {

    // 账号 / 密码
    $(".J_Submit").click(function () {
        var password = $(".password").val()
        var account  = $(".account").val();
        if(!password) {
            console.log("密码为空")
            return
        }else if(!account) {
            console.log("账号为空")
            return
        }else {
            console.log("发起请求")
            data = {"password" :   password,
                    "uid"      :   account,
            },
            console.log(11)
            $.ajax({
                type :"post",
                url  :"http://192.168.2.254:9000/interface/B2BAPI.ashx?method=login",
                dataType : "json",
                data: JSON.stringify(data),
                success : function (data) {
                    console.log(data)
                    if(data.ErrorMsg == 0){
                        // 存cookie
                        $.cookie('token',account,{ path: '/' });
                        // 存账号信息
                        window.location.href = "../home/home.html";

                    }else{
                        alert('登陆失败')
                    }
                }
            })
        }
    })

})




















// 注册
// data = {'password' : '1234565','uid' : 'glc6361','nick' : '郭先生1','companyname' : '测试公司','issale' : 1,'ispurchase' : 1,'mobile' : '13817968957'},

// $(".J_Submit").click(function () {
//     $.ajax({
//         type :"post",
//         url  :"http://192.168.2.254:9000/interface/B2BAPI.ashx?method=register",
//         dataType : "json",
//         data: JSON.stringify(data),
//         success : function (datas) {
//         console.log(datas)
//         }
//     })
// })



// 登录
// data = {'password' : '123456',
//         'uid' : '13817968957',
// },

// $(".J_Submit").click(function () {
//     $.ajax({
//         type :"post",
//         url  :"http://192.168.2.254:9000/interface/B2BAPI.ashx?method=login",
//         dataType : "json",
//         data: JSON.stringify(data),
//         success : function (datas) {
//         console.log(datas)
//         }
//     })
// })