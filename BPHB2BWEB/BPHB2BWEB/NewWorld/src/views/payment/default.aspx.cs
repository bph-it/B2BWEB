using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Xml;
using Com.Alipay;

/// <summary>
/// 功能：即时到账交易接口接入页
/// 版本：3.4
/// 修改日期：2016-03-08
/// 说明：
/// 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
/// 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
/// 
/// /////////////////注意///////////////////////////////////////////////////////////////
/// 如果您在接口集成过程中遇到问题，可以按照下面的途径来解决
///1、支持中心（https://global.alipay.com/service/service.htm）
///2、支持邮箱（overseas_support@service.alibaba.com）
///     业务支持邮箱(global.service@alipay.com)

/// 如果不想使用扩展功能请把扩展功能参数赋空值。
/// </summary>
///function:the access page of cross border payment interface 
///version:3.4
///modify date:2016-03-08
///instructions:
///This code below is a sample demo for merchants to do test.Merchants can refer to the integration documents and write your own code to fit your website.Not necessarily to use this code.  
///Alipay provide this code for you to study and research on Alipay interface, just for your reference.

/// /////////////////note///////////////////////////////////////////////////////////////
///If you have problem during integration，we provide the below ways to help 
  
///1、Development documentation center（https://global.alipay.com/service）
///2、Technical assitant email（overseas_support@service.alibaba.com）
///      Business assitant email (global.service@alipay.com)
  
///If you want to use the extension,please add parameters according to the documentation.
  
public partial class _Default : System.Web.UI.Page 
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void BtnAlipay_Click(object sender, EventArgs e)
    {
        ////////////////////////////////////////////请求参数////////////////////////////////////////////
        ////////////////////////////////////request parameter////////////////////////////////////
        //商户订单号，商户网站订单系统中唯一订单号，必填
		//merchant order no,the unique transaction ID specified in merchant system ,not null
        string out_trade_no = WIDout_trade_no.Text.Trim();

        //订单名称，必填
	    //order name  ,not null		
        string subject = WIDsubject.Text.Trim();

        //付款金额，必填
		//payment amount in foreign currency ,not null	
        string total_fee = WIDtotal_fee.Text.Trim();

        //商品描述，可空
		//product description ,nullable
        string body = WIDbody.Text.Trim();
		
		//币种信息
		//The settlement currency code the merchant specifies in the contract. ,not null 
		string currency =WIDcurrency.Text.Trim();

        string product_code =WIDproduct_code.Text.Trim();

        string split_fund_info = WIDsplit_fund_info.Text.Trim();
        ////////////////////////////////////////////////////////////////////////////////////////////////

        //把请求参数打包成数组
        //package the request parameters
        SortedDictionary<string, string> sParaTemp = new SortedDictionary<string, string>();
        sParaTemp.Add("service", Config.service);
        sParaTemp.Add("partner", Config.partner);
        sParaTemp.Add("_input_charset", Config.input_charset.ToLower());
        sParaTemp.Add("notify_url", Config.notify_url);
        sParaTemp.Add("return_url", Config.return_url);
		sParaTemp.Add("currency", currency);
        sParaTemp.Add("out_trade_no", out_trade_no);
        sParaTemp.Add("subject", subject);
        sParaTemp.Add("total_fee", total_fee);
        sParaTemp.Add("body", body);
        sParaTemp.Add("product_code", product_code);
        sParaTemp.Add("split_fund_info", split_fund_info);
        //其他业务参数根据在线开发文档，添加参数：
        //To add other parameters,please refer to development documents.Document address:https://global.alipay.com/service
        //如sParaTemp.Add("参数名","参数值");
        //eg:sParaTemp.put("parameter name","parameter value");	
        //建立请求
        //build request
        string sHtmlText = Submit.BuildRequest(sParaTemp, "get", "确认");
        Response.Write(sHtmlText);
        
    }
}
