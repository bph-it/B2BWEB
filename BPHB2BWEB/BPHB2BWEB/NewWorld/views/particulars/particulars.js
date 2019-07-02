function particulars () {
//===============================================窗口路径================================
    function getParameter(name) { 
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return unescape(r[2]); return null;
    }
//===============================================一级菜单================================
$(document).ready(function () {
    // 模块化格式
    var tabulation = (function () {
        // 展开一级菜单 1
        function areveal () {
            $(".rw-lst-header-nav-fixed-header").stop(true,true).slideDown("slow");
            _mm.request({
                data:{
                    method     : "GetCategoy",
                    ishomeview : 1,
                    type       : 1
                },
                success : function (res) {
                    var html1 = ""
                    res.forEach(function (val,index) {
                        html1 += `
                        <li class="first-item" data-type="${val.ID}">
                            <span class="f14">${val.cname}</span>
                            <div class="absolute rw-lst-header-nav-second">
                                <ul class="cl p-rw-lst-header">
                                    
                                </ul>
                            </div>
                        </li>
                        `
                        $(".rw-lst-header-nav-first").html(html1)
                    })
                    particulars1 ()
                }
            })
        }
        // 收起一级菜单 2
        function shut () {
            $(".rw-lst-header-nav-fixed-header").stop(true,false).slideUp("slow");
        }
        return {
            areveal  :  areveal,     //展开一级菜单 1
            shut     :  shut         //收起一级菜单 2
        }
    })

    var category = tabulation();  // 创建模块化闭包

    // 当鼠标移入 展开 / 收起 一级菜单  1 / 2
    $(".rw-lst-header-nav-header").hover(function () {
        category.areveal()      //展开  
    },function () {
        category.shut()         //收起  
    })
    //===============================================二级菜单================================
    function particulars1 () {
        $(".first-item").hover(function () {
            console.log(1)
            $(this).children(".rw-lst-header-nav-second").css("display","block")
            var parentid = $(this).attr("data-type")
            // 鼠标移入二级菜单渲染
            _mm.request({
                data:{
                    method   : "GetCategoy",
                    type     : 2,
                    parentid : parentid,
                },
                success      : function (res) {
                    var html2 = ""
                    res.forEach(function (val,index) {
                        html2 += `
                                <li class="f-l second-category-item">
                                    <a href="../Category/Category.html?id=${val.ID}">${val.cname}</a>
                                </li>
                        `
                        $(".p-rw-lst-header").html(html2)
                    })
                }
            })
        },function () {
            $(this).children(".rw-lst-header-nav-second").css("display","none")
        })
    }
})
//===============================================放大镜================================

function particulars1 () {
    $(function () { (function () { var ulobj = $(".imglist ul"); var picimg = $(".imgpart .pic img"); var objimg = $(".imgpart .bigpic img"); ulobj.on("mouseenter", "li", function () { var imgsrc = $(this).children("img").attr("src"); $(this).addClass("active").siblings().removeClass("active"); picimg.attr("src", imgsrc); objimg.attr("src", imgsrc) }); var pic = $(".imgpart .pic"); var magnify = $(".imgpart .pic .magnify"); var bigpic = $(".imgpart .bigpic"); var objimg = $(".imgpart .bigpic img"); pic.mousemove(function (e) { magnify.show(); bigpic.show(); var pagex = e.pageX; var pagey = e.pageY; var pictop = pic.offset().top; var picleft = pic.offset().left; var magnifyw = magnify.width(); var magnifyh = magnify.height(); var magnifytop = pagey - pictop - magnifyh / 2; var magnifyleft = pagex - picleft - magnifyw / 2; var picw = pic.width() - magnifyw; var pich = pic.height() - magnifyh; magnifytop = magnifytop < 0 ? 0 : magnifytop; magnifyleft = magnifyleft < 0 ? 0 : magnifyleft; magnifytop = magnifytop > pich ? pich : magnifytop; magnifyleft = magnifyleft > picw ? picw : magnifyleft; magnify.css({ top: magnifytop, left: magnifyleft }); var minl = bigpic.width() - objimg.width(); var mint = bigpic.height() - objimg.height(); var objimgl = -magnifyleft * 2; var objimgt = -magnifytop * 2; objimgl = objimgl < minl ? minl : objimgl; objimgt = objimgt < mint ? mint : objimgt; objimg.css({ top: objimgt, left: objimgl }) }); pic.mouseleave(function () { magnify.hide(); bigpic.hide() }) })() });
}
//===============================================列表页================================
var productid = getParameter("id")
_mm.request({
    data:{
        method    : "ProductDetail",
        productid : productid,
    },
    success : function (res) {
        console.log(res.skus)
        // 放大镜原图
        html = `
            <img src="${res.product.logo}" alt="">
        `
        $(".magnify").before(html)
        // 放大镜器
        html4 = `
            <img src="${res.product.logo}" alt="" class="absolute">
        `
        $(".bigpic").html(html4)
        // title 标题
        html5 = `
            <p>${res.product.title}</p>
        `
        $(".o-base-info-detail-title").html(html5)

        //海外直邮
        html7 = `
        <span class="c6">${res.product.partermodel}</span>
        `
        $(".p-peisg").after(html7)

        //skus 码
        html8 = ""
        res.skus.forEach(function (val,index) {
            html8 += `
                <div class="next-tag-body c-p dis-inBlock" data="${val.ID}" data-product="${val.productID}" data-type="${val.jdPrice}">
                    <p>${val.skuName}</p>
                </div>
            `
            $(".o-rwd-col-main-wrap").html(html8)

        })

        particulars1 ()
        particulars2 ()
    }
})
//===============================================列表交互================================
function particulars2 () {
    parzg ()
    // 选择单位
    $(".o-rwd-col-main-wrap").children().eq(0).addClass("p-main-wrap")

    // 价格
    var jdPrice = $(".p-main-wrap").attr("data-type")
    console.log(jdPrice)
    html6 = `
        <span class="font-big">${jdPrice}</span>
    `
    $(".font-normal").after(html6)
    parzg ()


    $(".next-tag-body").click(function () {
        $(".next-tag-body").removeClass("p-main-wrap")
        $(this).addClass("p-main-wrap")
        var jag = $(this).attr("data-type")
        $(".font-big").text(jag)
        parzg ()
    })
    // 加
    $(".par-jia").click(function () {
        var int = $(".next-number-picker-input-wrap").val()
        int ++
        $(".next-number-picker-input-wrap").val(int)
        $(".par-xiang").text(int)
        parzg ()
    })
    // 减
    $(".par-jian").click(function () {
        var int = $(".next-number-picker-input-wrap").val()
        if(int == 1) {
            int=1
            return
        }
        int --
        $(".next-number-picker-input-wrap").val(int)
        $(".par-xiang").text(int)
        parzg ()
    })
    // 键盘按起
    $(".next-number-picker-input-wrap").keyup(function () {
        var int = $(this).val()
        $(".par-xiang").text(int)
        parzg ()
    })
    // 总价
    function parzg () {
        var parj = $(".font-big").text()
        var pars = $(".next-number-picker-input-wrap").val()
        var parz = parj * pars
        var parx = parz.toFixed(2)
        $(".par-zonia").html(parx)
    }
}
//===============================================加入购物车================================
$('.next-btn-large').click(function () {
    var productID = $('.next-tag-body').attr('data-product')
    var skuid = $(".p-main-wrap").attr('data')
    var qty = $('.next-number-picker-input-wrap').val()
    if (cookie && cookie !== 'null') {
        _uu.request({
            url : 'method=AddShoppingCart',
            data : {
                uid         : cookie,
                productID   : productID,
                skuid       : skuid,
                qty         : qty
            },
            success         : function (src) {
                console.log(src)
                if (src.ErrorMsg == 0) {
                    window.location.href = "../shopping/shopping.html";
                }else {
                    alert ('添加失败')
                }
            }
        })
    }else {
        window.location.href = "../denglu/denglu.html";
    }

})

}
particulars ()