// 获取窗口地址
import './orderDetails.css'
if (cookie) {
    function order () {
        function getParameter(name) { 
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
            var r = window.location.search.substr(1).match(reg); 
            if (r!=null) return unescape(r[2]); return null;
        }
        var tid = getParameter('tid')
        console.log(tid)
        hadenum ()
        $.ajax({
            type : 'get',
            url  : 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
            data : {
                method  : 'GetSingleOrder',
                tid     :  tid,
            },
            success : function (src) {
                console.log(src)
                var html2 = '',
                html = `
                    <li class="n-ding n-bx f-l">${src.tid}</li>
                    <li class="n-jin n-bx f-l">￥${src.payment}</li>
                    <li class="n-zhuang n-bx f-l">已取消</li>
                    <li class="n-cao n-bx f-l">-</li>
                `
                $('.tid-z').html(html)
                var html5 = `
                  <em>￥${src.payment}</em>
                `
                $(".price-z").html(html5)

                var html1 = `
                    <li class="f-l">${src.receivername}</li>
                    <li class="f-l">${src.modified}</li>
                    <li class="f-l">${src.receivermobile}</li>
                    <li class="f-l">
                        <span>${src.receiverstate}</span>
                        <span>${src.receivercity}</span>
                        <span>${src.receiverdistrict}</span>
                    </li>
                    <li class="f-l">${src.receiveraddress}</li>
                `
                $('.order-section-content').html(html1)
        
                src.details.forEach(function (val,index) {
                    html2 += `
                        <li>
                            <ul class="order-section-content-3 cl">
                                <li class="f-l">${val.tile}</li>
                                <li class="f-l">￥${val.price}</li>
                                <li class="f-l">${val.num}</li>
                                <li class="f-l">￥${val.price}</li>
                            </ul>
                        </li>
                    `
                })
                $('.ent-3').html(html2)
        
            }
        })
    
    
    }
    order ()
}else {
    window.location.href = "../denglu/denglu.html";
}

