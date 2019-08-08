//判断是否登录
if (cookie !== 'null' && cookie) {
    var name = `
        <p class="rw-link f-l">您好，<span class="c6">${cookie}</span></p>
        <a class="rw-link delect f-l">退出</a>
    `;
    $(".ro-view").html(name)
}else {
}

//点击退出登录
$(".delect").click(function () {
    $.cookie('token', 'null', { path: '/' });
    var name = `
        <a href='../../views/denglu/denglu.html' class='f12 rw-link'>请登录</a>&nbsp;
        <a href='../../views/zhuce/zhuce.html' class='f12 rw-link'>注册</a>
    `
    $(".ro-view").html(name)
    window.location.reload()
})

//hover 购物车弹窗
$(".wrap").hover(function () {

    //防抖
    Timeout = setTimeout(function(){zhan()},300);
},function () {
    clearTimeout(Timeout);
    $(".next-icon-xl").stop(true,true).slideUp(200);
})

// 购物车数量
function hadenum () {
    if (cookie !== 'null' && cookie) {
        _mm.request({
            data:{
                 method: 'GetCart',
                 uid :  cookie,
            },
            success :  function (res) {
                var hadenu = 0
                res.forEach(function (val,index) {
                    hadenu += val.qty
                })
                $(".hadenum").html(hadenu)
            }
        })
    }else {
        $(".hadenum").html(0)
    }
}


// 搜索框
$(".rw-dropdown-wrapper").keyup(function () {
    if(event.keyCode ==13){
        var str = $(this).val()
        console.log(str , 111)
        window.location.href = '../../views/searchPage/searchPage.html?id='+str;
    }
})

$(".fangda").click(function () {
    var str = $(".rw-dropdown-wrapper").val()
    console.log(str , 222)
    window.location.href = '../../views/searchPage/searchPage.html?id='+str;
})

// 配合防抖 性能优化
function zhan () {
    $(".next-icon-xl").stop(true,true).slideDown(150)
    if (cookie && cookie !== 'null') {
        var html3 = ''
        _mm.request({
           data:{
                method: 'GetCart',
                uid :  cookie,
           },
           success :  function (res) {
               if (res.length == 0) {
                var html1 = `
                    <span class="f12 c6">当前进货单为空，您还未添加任何商品!</span>
                `
                $(".next-icon-xl").html(html1)
               }else {
                   res.forEach(function (val , index) {
                        html3 += `
                            <div class="loge cl">
                                <img class="f-l" src="${val.picurl}" alt="">
                                <span class="f-l f12 xin">${val.title}</span>
                                <span class="f-l f12">${val.qty}</span>
                                <span class="f-l f12">￥${val.price}</span>
                            </div>
                        `
                   })
                    $(".next-icon-xl").html(html3)
               }
           }
        })
    }else {
        var html = `
            <span class="f12 c6">您还未登陆，请先登录在查看</span>
        `
        $(".next-icon-xl").html(html)
    }
}
