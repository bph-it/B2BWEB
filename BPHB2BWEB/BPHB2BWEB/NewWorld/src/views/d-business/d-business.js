// =====================富文本=======================================
var E = window.wangEditor
var editor = new E('#editor')
// 或者 var editor = new E( document.getElementById('editor') )
editor.customConfig.menus = [
    'head',
    'bold',
    'italic',
    'underline',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'foreColor',
    'backColor',
    'link',
    'list',
    'justify',
    'quote',
    'emoticon',
    'image',
    'table',
    'undo',
],
editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片        
editor.create()

// =====================上传图片=======================================
var picArr = new Array();// 存储图片
$('input:file').localResizeIMG({
  width:700,// 宽度
  quality: 0.5, // 压缩参数 1 不压缩 越小清晰度越低
  success: function (result) {
    var img = new Image();
    img.src = result.base64;
    var _str = "<span class='pic_look' style='background-image: url("+ img.src + ")'><em id='delete_pic'>-</em></span>"
    $('#chose_pic_btn').before(_str);
    var _i =  picArr.length
    picArr[_i] = result.base64;
    console.log(picArr);      //传值
    if (picArr.length == 5) {
      $("#chose_pic_btn").addClass("dis-none")
    }
  }
});

// 删除
$(document).on('click', '#delete_pic', function(event) {
  var aa = $(this).parents(".pic_look").index();
  picArr.splice(aa,1);
  $(this).parents(".pic_look").remove();
  console.log(picArr);      //传值
  if (picArr.length < 5) {
    $("#chose_pic_btn").removeClass("dis-none")
  }
});	


function business () {
    // =====================判断是否选中=======================================
    $(".next-icon-xs").change(function() { 
    if ($(this).attr("data") == "true") {
        $(this).attr("data","false")
    }else {
        $(this).attr("data",true) 
    }
    struct ()
    }); 
    // =====================选中的展现列表=======================================
    function struct () {
    tableWrap = []
    for (var i = 0 ; i<$(".next-icon-xs").length; i++) {
        if ($(".next-icon-xs").eq(i).attr("data") == "true") {
            var obj = {}
            obj.name = ($(".next-icon-xs").eq(i).next().val())
            tableWrap.push(obj)
            $(".com-struct-t").slideDown('slow')
        }
    }
    comStruct ()
    }
    // =====================选中的渲染列表=======================================
    function comStruct () {
    html = ""
    if (tableWrap.length < 1) {
        $(".com-struct-t").slideUp("slow");
    }
    tableWrap.forEach (function (val ,index) {
        html += `
        <tr class="sku-table-row">
            <td class="tm-sku-cell f12 c6">
                ${val.name}
            </td>
            <td class="tm-sku-cell f12 c6">
            颜色
            </td>
            <td class="tm-sku-cell f12 c6">
            7323930000
            </td>
            <td class="tm-sku-cell f12 c6">
                399.00
            </td>
            <td class="tm-sku-cell f12 c6">
                61
            </td>
            <td class="tm-sku-cell f12 c6">
                Thinkbaby-cj-blue
            </td>
            <td class="tm-sku-cell f12 c6">
            </td>
            <td class="tm-sku-cell f12 c6">
            0
            </td>
            <td class="tm-sku-cell f12 c6">
                Thinkbaby-cj-blue
            </td>
            <td class="tm-sku-cell f12 c6">
                已启用
            </td>
        </tr>
        `
    })
    $(".tm-sku-body-table").html(html)
    }



}



business ()

