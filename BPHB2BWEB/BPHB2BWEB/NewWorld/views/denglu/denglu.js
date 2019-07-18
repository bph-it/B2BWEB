$(document).ready(function () {

    function getParameter(name) { 
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return unescape(r[2]); return null;
    }
    
    var tid = getParameter('tid')

    // 账号 / 密码
    $(".J_Submit").click(function () {
        var password = $(".password").val()
        var account  = $(".account").val();
        if(!password) {
            html = `
                <i class="iconfont cuo">&#xe600;</i>
                请输入密码
            `
            $(".login-title").addClass("J_Message").html(html)
            return
        }else if(!account) {
            html1 = `
            <i class="iconfont cuo">&#xe600;</i>
            请输入账号
            `
            $(".login-title").addClass("J_Message").html(html1)
            return
        }else {
            data = {"password" :   password,
                    "uid"      :   account,
            },
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
                        if(tid == 'zhu') {
                            window.location.href = "../home/home.html";
                            return
                        }else {
                            history.go(-1);
                        }
                        // 存账号信息
                    }else{
                        html2 = `
                        <i class="iconfont cuo">&#xe600;</i>
                        账号密码输入错误！
                        `
                        $(".login-title").addClass("J_Message").html(html2)
                    }
                }
            })
        }
    })

})