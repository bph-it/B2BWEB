//===============================================分页插件================================
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



});