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

