//===============================================分页插件================================
$('#excel-file').change(function(e) {
    var files = e.target.files;

    var fileReader = new FileReader();
    fileReader.onload = function(ev) {
        try {
            var data = ev.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                }), // 以二进制流方式读取得到整份excel表格对象
                persons = []; // 存储获取到的数据
        } catch (e) {
            console.log('文件类型不正确');
            return;
        }

        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref'];
                console.log(fromTo);
                persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                // break; // 如果只取第一张表，就取消注释这行
            }
        }

        console.log(persons);
        //清空表格
        $(".tablehead").html("");
        $(".tablebody").html("");
        for(var j=0;j<persons.length;j++){
            var arr=persons[j];
            if(j==0){
                $(".tablehead").append("<tr class='exceltitle'></tr>");
            }
            $(".tablebody").append("<tr class='excelcontent'></tr>");
            for (var i in arr) {
                //alert(i+"---"+arr[i]);
                if(j==0){
                $(".exceltitle").append("<th>"+i+"</th>");
                }
                $(".excelcontent").eq(j).append("<td>"+arr[i]+"</td>");
            }
        }
        
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
});


$(function(){

    // var totalPage = _count;						//总页码
    var totalRecords = 1;					    //条码数
    // var pageNo = getParameter('pno');		    //获取窗口id
    // if(!pageNo){
    //     pageNo = 1;
    // }
    //生成分页
    //有些参数是可选的，比如lang，若不传有默认值
    kkpager.generPageHtml({
        // 窗口id
        // pno : pageNo,
        //总页码
        // total : totalPage,
        //总数据条数
        totalRecords : totalRecords,
        mode : 'click',
        click : function(n){
            Category1(n)
            console.log(n)
            //手动选中按钮
            this.selectPage(n);
            return false;
        }
        
    });
    // 查询信息 == 取消
    $(".btn-primary").click(function () {
        $("#table").addClass("dis-none")
    })
    // 查询信息 == x
    $(".close").click(function () {
        $("#table").addClass("dis-none")
    })
    // 查询信息
    $(".see").click(function () {
        $("#table").removeClass("dis-none")
    })






});