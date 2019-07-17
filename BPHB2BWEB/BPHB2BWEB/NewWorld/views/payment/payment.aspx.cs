using B2BData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Com.Alipay;

public partial class NewWorld_views_payment_payment : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnpay_Click(object sender, EventArgs e)
    {
        string tid = Request.QueryString["tid"];
        if (!string.IsNullOrWhiteSpace(tid))
        {
            TradeM ctx = new TradeM();
            Trade trade = ctx.GetSingleOrder(tid);
            string out_trade_no = tid;
            string subject = "商品";
            string rmb_fee = trade.payment.ToString();
            string timeout_rule = "30m";
            List<string> titles = (from c in trade.details select c.tile).ToList();
            string title = string.Join(",",titles);
            if (title.Length > 400)
            {
                title = title.Substring(0, 350);
            }
            string body = title;
            string currency = "USD";
            string product_code = "NEW_OVERSEAS_SELLER";
            SortedDictionary<string, string> sParaTemp = new SortedDictionary<string, string>();
            sParaTemp.Add("service", Config.service);
            sParaTemp.Add("partner", Config.partner);
            sParaTemp.Add("_input_charset", Config.input_charset.ToLower());
            sParaTemp.Add("notify_url", Config.notify_url);
            sParaTemp.Add("return_url", Config.return_url);
            sParaTemp.Add("currency", currency);
            sParaTemp.Add("out_trade_no", out_trade_no);
            sParaTemp.Add("subject", subject);
            //sParaTemp.Add("timeout_rule", timeout_rule);
            sParaTemp.Add("rmb_fee", rmb_fee);
            sParaTemp.Add("body", body);
            sParaTemp.Add("product_code", product_code);
            string sHtmlText = Submit.BuildRequest(sParaTemp, "get", "确认");
            Response.Write(sHtmlText);
        }
        
    }
}