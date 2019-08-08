var baseUrl = 'http://192.168.2.254:9000/interface/B2BAPI.ashx';//基础链接
// get请求
var _mm = {
    request : function (param) {
        $.ajax({
            type        : param.method   || 'get',
            url         : param.url      || baseUrl,
            dataType    : param.type     || 'json',
            data        : param.data     || "",
            success     : function (res) {
                param.success(res)
            },error  : function (err) {

            }
        })
    }
}
// post请求
var _uu = {
    request : function (param) {
        $.ajax({
            type        : 'post',
            url         : "http://192.168.2.254:9000/interface/B2BAPI.ashx?"+param.url+" ",
            dataType    : 'json',
            data        : JSON.stringify(param.data),
            success     : function (res) {
                param.success(res)
            },error  : function (err) {
                
            }
        })

    }

}



//试验post

// _uu.request({
//     url :"method=login",
//     data:{'password':'hou15039243322',
//             'uid':'a2471999097',
//         },
//     success : function (res) {
//         console.log(res,"aaaaa")
//     }
// })