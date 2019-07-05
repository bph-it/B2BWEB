function home () {
    $(document).ready(function () {
        //=============================================== 一级菜单渲染==========================
            console.log(111) 
            _mm.request({
                data:{
                    method     : "GetCategoy",
                    ishomeview : 1,
                    type       : 1
                },
                success : function (res) {
                    console.log(res)
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
                    })
                    $(".rw-lst-header-nav-first").html(html1)
                }
            })
        //=============================================== 商品列表渲染==========================
            _mm.request({
                data:{
                    method:"CategoyProducts",
                    cateid: 54,     //什么类的商品信息    7,54,55,61,52
                    pageSize: 10,  //显示多少条
                    pageNumber: 1,  //多少页
                },
                success : function (res) {
                    var html3 = ""
                    res.products.forEach(function (val,index) {
                        html3 += `
                        <li class="f-l">
                            <div class="content-outer relative">
                                <div class="content-inner absolute">
                                    <div class="img-box relative t-c-f">
                                        <a href="../particulars/particulars.html?id=${val.ID}">
                                            <img src="${val.logo}" alt="#">
                                            <div class="store-num fz12 t-c-f absolute">${val.wareLocation}</div>
                                        </a>
                                    </div>
                                    <div class="txt-box fz12">
                                        <div class="price-xj">
                                            <span>￥</span>
                                            <i>${val.jdPrice}</i>
                                        </div>
                                        <div class="unit-price">单件￥39.50</div>
                                    </div>
        
                                    <div class="tit-box">
                                        <a href="javascript:void(0);">${val.title}</a>
                                    </div>
        
                                    <a href="../particulars/particulars.html?id=${val.ID}" class="popup_buy_view t-c-f">立即选购</a>
                                </div>
                            </div>
                        </li>
                        `
                    })
                    $(".product-list").html(html3)
                    home1 ()
                }
            })
        })
        //=============================================== 轮播图================================
        jQuery("#slider-3 .slider").slide({
             mainCell: ".bd ul",
             titCell: ".hd li",
             trigger: "click", 
             effect: "leftLoop", 
             autoPlay: true,
             delayTime: 700,
             interTime: 2500,
             pnLoop: false, 
             titOnClassName: "active",
             mouseOverStop: false
             })
        // 当鼠标移入 展开二级菜单  // 关闭菜单
        //=============================================== 鼠标移入展开二级菜单====================
        function home1 () {
            $(".first-item").mouseenter(function() {
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
                        })
                        $(".p-rw-lst-header").html(html2)
                    }
                })
            })
            // 鼠标移除隐藏
            $(".first-item").mouseleave(function() {
                $(this).children(".rw-lst-header-nav-second").css("display","none")
            })
        }
}
home ()

