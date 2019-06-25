// 轮播图
$(function () {
    jQuery("#slider-3 .slider").slide({ mainCell: ".bd ul", titCell: ".hd li", trigger: "click", effect: "leftLoop", autoPlay: true, delayTime: 700, interTime: 2500, pnLoop: false, titOnClassName: "active", mouseOverStop: false })
});
$(".headerpage").html(html);
// 头部模板

function fun () {
    $.ajax({
        type: 'get',
        url: 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
        dataType: 'json',
        data:{
            method:"CategoyProducts",
            cateid: 54,     //什么类的商品信息    7,54,55,61,52
            pageSize: 10,  //显示多少条
            pageNumber: 1,  //多少页
            },
            // 7,54,55,61,52
        success: function (data) {
            var html = "";
            data.products.forEach(function (value,index) {
                // console.log(value)
                for(var i = 0; i < 1; i++) {
                    html += `
                        <li class="f-l">
                            <div class="content-outer">
                                <div class="content-inner">

                                    <div class="img-box">
                                        <a href="">
                                            <img src="${value.logo}" alt="">
                                            <div class="store-num">${value.wareLocation}</div>
                                        </a>
                                    </div>

                                    <div class="txt-box">
                                        <div class="price-xj">
                                            <span>￥</span>
                                            <i>${value.jdPrice}</i>
                                        </div>
                                    </div>

                                    <div class="tit-box">
                                        <a href="">${value.title}</a>
                                    </div>

                                    <div class="tag-box">
                                        <span class="not-self">${value.partermodel}</span>
                                        <span class="tax_allowance">${value.periodDate}</span>
                                        <span class="shipping">包邮</span>
                                    </div>
                                    <a href="" class="popup_buy_view">立即选购</a>
                                </div>
                            </div>
                        </li>
                    `
                }
            })
            $(".product-list").html(html)
        }
    })
}
fun ()

