//判断是否登录
if (cookie !== 'null' && cookie) {
    var name = `
        <p class="rw-link f-l">您好，<span class="c6">${cookie}</span></p>
        <a class="rw-link delect f-l">退出</a>
    `;
    $(".ro-view").html(name)
}else {
    console.log("还没登录")
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
    // hoverDuring: 1000, 
    $(".next-icon-xl").stop(true,true).slideDown(600)
},function () {
    $(".next-icon-xl").stop(true,true).slideUp(600);
})
