if (cookie) {
    function order () {
        function nextNav () {
            $(".next-tabs-tab-inner").click(function () {
                $(".next-tabs-tab-inner").children().removeClass("sn");
                $(this).addClass("djbd").siblings().removeClass("djbd");
                $(this).children().addClass("sn");
            })
            $(".item").click(function () {
                $(this).css("background","red");
            })
        }
        nextNav ()
        
        
        function order () {
            $.ajax({
                type : 'get',
                url  : 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
                data : {
                    method : 'GetOrder',
                    uid    : cookie
                },
                dataType   : 'json',
                success    : function (src) {
                    console.log(src)
                    html = [],
                    src.forEach(function (val,index) {
                        html2 = []
                        val.details.forEach(function (val,index){
                            html3 = `
                            <ul class="f-l">
                                <li class="member-piclist">
                                    <strong class="shop-title">
                                        百品汇自营 
                                    </strong>
                                    <div class="cl">
                                        <div class="col01 f-l">
                                            <img src="${val.picurl}" alt="">
                                        </div>
                                        <div class="col02 f-l">
                                            <span class="text-primary">
                                                ${val.tile}
                                            </span>
                                        </div>
                                        <div class="f-l co103">
                                            <span>￥${val.price}</span>
                                        </div>
                                        <div class="f-l co104">
                                            <span>${val.num}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            `
                            html2.push(html3)
                        })
        
                        html1 = `
                        <div class="member-orders-list">
                        <div class="tit-member-grid cl">
                            <div class="tit-total">
                                <span>${val.modified}</span>
                                <span class="ding">订单号：${val.tid}</span>
                            </div>
        
                            <div class="f-l qiand cl">
                               ${html2.join("")}
                            </div>
        
                            <div class="f-r actions">
                                <a href="#" class="btn-red">再次购买</a>
                                <a href="../orderDetails/orderDetails.html?tid=${val.tid}" class="btn-simple">查看订单</a>
                            </div>
                        `
                    html.push(html1)
        
                    })    
                $(".member-grid").html(html)
                }
            })
        
        }
        order()

        $(document).on("click",".btn-red",function () {
            _uu.request({
                url  : "method=AddShoppingCart",
                data : {
                    'uid'       :   cookie,
                    'productID' :   123
                }
            }) 
        })


    }
    order ()
    
}else {
    window.location.href = "../denglu/denglu.html";
}

