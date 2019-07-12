using B2BData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

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
            string total_fee = trade.payment.ToString();
        }
        
    }
}