// 一级列表
$(document).ready(function () {
    $.ajax({
        type: 'get',
        url: 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
        dataType: 'json',
        data:{
            method:"GetCategoy",
            ishomeview:1,
            type: 1,
            },
        success: function (data) {
            console.log(data)
            var osc = ejs.render($('#tpl').html(), { data: data });
            $('.fist-hover').html(osc);
        }
    })
})
// 展开列表 二级菜单
$(document).on('mouseenter','.fist-hover .first-item',function(){
    $(this).addClass("box").children(".rw-lst-header-nav-second").css("display","block");
    var parentid = $(this).attr("parentid");
    console.log(111)
    $.ajax({
        type: 'get',
        url: 'http://192.168.2.254:9000/interface/B2BAPI.ashx',
        dataType: 'json',
        data:{
            method:"GetCategoy",
            type: 2,
            parentid:parentid,
            },
        success: function (data) {
            console.log(data)
            var html = "";
            data.forEach(function (value,index) {
                html += `
                    <div class="rw-view second-category-item f-l">
                        <div class="rw-view third-category">
                            <a href="../Category/Category.html?id=${value.ID}">${value.cname}</a>
                        </div>
                    </div>
                `
            })
            $(".second-category").html(html)
        }
    })
})
$(document).on('mouseleave','.fist-hover .first-item',function(){
    $(this).removeClass("box").children(".rw-lst-header-nav-second").css("display","none");
})