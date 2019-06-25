/* // hade 头部 模板 */
$(".headerpage").html(html);
// 获取cookie
var cookie = $.cookie('kie');
// 获取窗口地址
function getParameter(name) { 
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r!=null) return unescape(r[2]); return null;
}

var tid = getParameter('tid')

function payment () {
// ==================================================切换支付方式=====================================================
    $(".mod-payment").children().eq(0).children().addClass("pay-container-b")
    $(".pay-container").click(function () {
        $(".pay-container").removeClass("pay-container-b")
        $(this).addClass("pay-container-b")
    })
    $(".tid").text(tid)
    $.ajax({
        type: 'get',
        url: 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
        dataType: 'json',
        data:{
            method : "GetSingleOrder",
            tid    : tid
            },
        success : function (src) {
            console.log(src.payment)
            $(".text-large").text(src.payment)    
            var html = ''
            src.details.forEach(function (val,index) {
                console.log(val)
                html += `
                    ${val.tile} 
                `
            })
            $(".duoyu11").text(html)
        }
    })
}
payment ()