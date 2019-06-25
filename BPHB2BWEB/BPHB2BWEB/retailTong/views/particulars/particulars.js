// 获取cookie
var cookie = $.cookie('kie');


const category = function () {
    // hade 头部 模板
    $(".headerpage").html(html);
    $(".rw-lst-header-nav-header").hover(function () {
        $(".rw-lst-header-nav-first").stop(true,false).slideToggle("slow")
    })
    // 二级导航
    $(".first-item").hover(function () {
        $(this).addClass("box").children(".rw-lst-header-nav-second").css("display","block")
    },function () {
        $(this).removeClass("box")
    })
}
category()

// tab 切换
function tabimg () {
    // 选项切换
    $(".o-image-thumb").hover(function () {
        var img = $(this).children()[0].src
        $(".pic").children().attr("src",img)
        $(this).addClass("bd2x").siblings().removeClass("bd2x")
    })
    // 放大镜
    $(".pic").hover(function () {
        var img = $(this).children()[0].src
        $(".bigpic").children().attr("src",img)
    })
}
tabimg ()

// 放大镜
$(function () { (function () { var ulobj = $(".imglist ul"); var picimg = $(".imgpart .pic img"); var objimg = $(".imgpart .bigpic img"); ulobj.on("mouseenter", "li", function () { var imgsrc = $(this).children("img").attr("src"); $(this).addClass("active").siblings().removeClass("active"); picimg.attr("src", imgsrc); objimg.attr("src", imgsrc) }); var pic = $(".imgpart .pic"); var magnify = $(".imgpart .pic .magnify"); var bigpic = $(".imgpart .bigpic"); var objimg = $(".imgpart .bigpic img"); pic.mousemove(function (e) { magnify.show(); bigpic.show(); var pagex = e.pageX; var pagey = e.pageY; var pictop = pic.offset().top; var picleft = pic.offset().left; var magnifyw = magnify.width(); var magnifyh = magnify.height(); var magnifytop = pagey - pictop - magnifyh / 2; var magnifyleft = pagex - picleft - magnifyw / 2; var picw = pic.width() - magnifyw; var pich = pic.height() - magnifyh; magnifytop = magnifytop < 0 ? 0 : magnifytop; magnifyleft = magnifyleft < 0 ? 0 : magnifyleft; magnifytop = magnifytop > pich ? pich : magnifytop; magnifyleft = magnifyleft > picw ? picw : magnifyleft; magnify.css({ top: magnifytop, left: magnifyleft }); var minl = bigpic.width() - objimg.width(); var mint = bigpic.height() - objimg.height(); var objimgl = -magnifyleft * 2; var objimgt = -magnifytop * 2; objimgl = objimgl < minl ? minl : objimgl; objimgt = objimgt < mint ? mint : objimgt; objimg.css({ top: objimgt, left: objimgl }) }); pic.mouseleave(function () { magnify.hide(); bigpic.hide() }) })() });

$(function(){
    function getParameter(name) { 
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return unescape(r[2]); return null;
    }

    var id =  getParameter("id")
    $.ajax({
        type : "get",
        url : 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
        data : {
            method    : "ProductDetail",
            productid : id,
        },
        dataType : "json",
        success : function (data) {
            console.log(data)
            var prod = data.product
            // 放大镜图片
            var img1 = `
                <img src="${prod.logo}" alt="">
            `
            $(".magnify").before(img1)


            var img2 = `
            <img src="${prod.logo}" alt="">
            `
            $(".o-image-thumb").html(img2)


            // 放大镜结束

            // 商品信息开始
            var detailWarp = `
                ${prod.title}
                <span class="o-tag-blue" data-type="${prod.ID}">${prod.partermodel}</span>
            `
            $(".p-base-info-detail-title").html(detailWarp)
            // 商品信息结束

            // 价格
            var priceContainerContent = `
            <div class="gezi">
                <p class="font-normal f-l">
                    <span>￥</span>
                    ${prod.jdPrice}
                </p>
            </div>
            <i class="ladder-2-1">2-49 / 罐</i>
            `

            $(".price-container-content").html(priceContainerContent)

            var jdPriceS =`
                ￥<em>${prod.jdPrice}</em>
            `
            $(".money").html(jdPriceS)

            // 详情信息
            var nextTabsContent = `
            <div class="p-props-info-tab-warp f-l">
                <p>商家:该商品供应商,完成入驻可查看</p>
                <p>品牌:Lipton/立顿</p>
                <p>保质期 : ${prod.periodDate}</p>
            </div>
            <div class="p-props-info-tab-text f-l">
                <p>商品所在地 : ${prod.wareLocation}</p>
                <p>生产日期 : 2019年01月</p>
                <p>商品条形码 : 6913221220109</p>
            </div>
            `
            $(".next-tabs-content").html(nextTabsContent)
            var skus = data.skus;
            var allHtml = [];
            skus.forEach(function (value,index) {
                var nextTagSelectable = `
                    <p class="next-tag-selectable" data-type="${value.jdPrice}" data-suk="${value.ID}">
                        <span>${value.skuName}</span>
                    </p >
                `
                allHtml.push(nextTagSelectable),
                $(".grid-titl").html(allHtml)
                $(".o-rwd-col-main").children("p").eq(0).addClass("next-tagS")
                },

        )}
    })
})

var Price = ""

$(document).on("click",".next-tag-selectable",function(){
    Price = $(this).attr("data-type")
    html = `
        <p class="font-normal f-l">
            <span>￥</span>
            ${Price}
        </p>
    `
    $(".gezi").html(html)
    fun ()

})

$(document).on("click",".next-tag-selectable",function () {
    $(this).addClass("next-tagS").siblings().removeClass("next-tagS")
})

function fun () {
    var quantity =  $(".amount input").val()
    var total = Price * quantity
    
    var html = `
        ￥<em>${total}</em>
    `
    $(".money").html(html)
    
    var html = `
        共<em>${quantity}</em>件
    `
    $(".quantity").html(html)
}

var amount = $(".amount input").val()

$(".jia").click(function () {
var amount = $(".amount input").val()
    amount ++; 
    $(".amount input").val(amount)
    fun ()
})

$(".jian").click(function () {
    var amount = $(".amount input").val()
    if (amount <2) {
        amount = 2
    }
    amount --; 
    $(".amount input").val(amount)
    fun ()
})




// 加入购物车处理
$(".next-btn-large").click(function () {
    var product = $(".o-tag-blue").attr("data-type")    //商品id
    var skuid   = $(".next-tagS").attr("data-suk")      //获取sku
    var nber    = $(".p-neb").val()                   //数量
    console.log(product)
    console.log(skuid)
    console.log(nber)
    datas = {
        "skuid"       :  skuid,              //sku的ID
        "productID"   :  product,            //商品ID
        "uid"         :  cookie,             //用户名
        "qty"         :  nber                //数量
    }
    $.ajax({
        type : "post",
        url  : "http://192.168.2.254:9000/interface/B2BAPI.ashx?method=AddShoppingCart",
        data: JSON.stringify(datas),
        dataType : "json",
        success : function (data) {
            console.log(data)
        }
    })
})