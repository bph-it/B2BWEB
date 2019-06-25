 // 头部 hade 展开列表
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

// 更多/隐藏
function shou () {

    $(".btna").click(function(){
        if(!$(this).is('.conceal')){
            $(this).parent(".p-sn-tab-foot").siblings('.body').css("max-height","300px");
            $(this).addClass("conceal").contents()[0].data = "更多";
            $(this).children().css("transform","rotate(180deg)")
        }else {
            $(this).parent(".p-sn-tab-foot").siblings('.body').css("max-height","36px");
            $(this).children().css("transform","rotate(0deg)")
            $(this).removeClass("conceal").contents()[0].data = "隐藏";
        }
    })
}
shou ()

// 多选 / 取消
function integral () {
    $(".btns").click(function () {
        $(".next-checkbox").css("display","block");
        $(".next-btn").css("display","none");
        $(".next-btn-normal").css("display","block")
    })
    // 取消
    $(".normal").click(function () {
        $(".next-checkbox").css("display","none");
        $(".next-btn").css("display","block");
        $(".next-btn-normal").css("display","none")
    })
}
integral ()

// houver 更多属性
function attribute () {
    $(".hoverable").hover(function () {
        $(this).children().addClass("hored")
        $(this).addClass("aa").removeClass("hobd")
        $(this).children(".xuan").css("transform","rotate(180deg)").addClass("hored")
        $(this).children(".detail").css("display","block")
        $(this).children().children().css("display","block")
    },function () {
        $(this).children().removeClass("hored")
        $(this).addClass("hobd").removeClass("aa")
        $(this).children(".xuan").css("transform","rotate(0deg)").removeClass("hored")
        $(this).children(".detail").css("display","none")
        $(this).children().children().css("display","none")
    })
}
attribute ()

// 促销 
function promotion () {
    $(".p-condition-select").click(function () {
        $(".next-position-bl").slideToggle("slow");
    })
}
promotion ()

// 商品列表动画效果
$(document).on('mouseenter','.c-offer-noraml',function(){
    $(this).children(".fd-right").addClass("w160p")
    $(this).children("img").addClass("w50p")
}),
$(document).on('mouseleave','.c-offer-noraml',function(){
    $(this).children(".fd-right").removeClass("w160p")
    $(this).children("img").removeClass("w50p")
}),

// 获取浏览器窗口路径
$(function(){
    // 获取浏览器窗口参数
    function getParameter(name) { 
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return unescape(r[2]); return null;
    }
        // 分页获取数字
    
        var totalRecords = 10;		//条码数
        var totalPage	//page页
    // 发起请求
        
    function paging (page) {
        var pageNo = getParameter('id');  //获取浏览器参数
            $.ajax({
                type : "get",
                url  : 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
                dataType : "json",
                data : {
                    method: "CategoyProducts",
                    cateid: pageNo || 54,         //商品id
                    pageSize: 20,                 //多少条商品
                    pageNumber: page || 1,        //第几页
                },
                success:function(data) {
                // 获取当前总数 / 每页20条数据

                    totalPage = data.count / 20 
                    var html = ""
                    data.products.forEach(function (value,index) {
                            // console.log(value)
                            html += `
                            <a href="../particulars/particulars.html?id=${value.ID}">
                                <li class="c-offerlist-wrap f-l">
                                    <div class="c-offer-noraml">
                                        <img src="${value.logo}" alt="" class="tup">
                                        <p class="c-offer-price-con cl">
                                            <span class="c-offer-price">促</span>
                                            <span class="qian">￥</span>
                                            <span class="o-tag-promotion">${value.jdPrice}元</span>
                                            <span class="f-r c-offer-price-old">￥?</span>
                                        </p>
                                        <div class="c-offer-prop-b">
                                            <a href="">${value.title}</a>
                                        </div>
                                        <div class="spec-wrap">保质期: ${value.periodDate}</div>
                                        <span>${value.partermodel}</span>

                                        <div class="c-offer-prop">满赠</div>
                                        <div class="fd-right">
                                            <span>${value.wareLocation}</span>
                                        </div>
                                    </div>
                                </li>
                             </a>
                            `
                        $(".p-product").html(html)
                        // 点击分页触发
                        kkpager.generPageHtml({
                            //总页码
                            total : totalPage,
                            //总数据条数
                            totalRecords : totalRecords,
                            mode : 'click',//默认值是link，可选link或者click
                            click : function(n){
                                //第几页
                                paging (n)
                                // do something
                                //手动选中按钮
                                this.selectPage(n);
                                return false;
                            }
                        });
                    });

                }
            })
    }
    paging()
})





