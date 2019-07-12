using B2BData.entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace B2BData
{
    public class TradeM
    {
        public Trade GetSingleOrder(string tid)
        {
            using (b2b_sysEntities ctx = new b2b_sysEntities())
            {
                Trade trade = ctx.Trade.FirstOrDefault(c => c.tid == tid);
                trade.details = GetTradeDetailInfo(tid);
                return trade;
            }
        }
        public List<TradeDetailInfo> GetTradeDetailInfo(string tid)
        {
            List<TradeDetailInfo> lst = new List<TradeDetailInfo>();
            using (b2b_sysEntities ctx = new b2b_sysEntities())
            {
                var query = from c in ctx.TradeDetail
                            join p in ctx.itemnew on c.numiid equals p.ID
                            where c.tid == tid
                            select new TradeDetailInfo
                            {
                                num = c.num,
                                numiid = c.numiid,
                                oid = c.oid,
                                outeriid = c.outeriid,
                                outerskuid = c.outerskuid,
                                picurl = p.logo,
                                price = c.price.Value,
                                skuid = c.skuid.Value,
                                tid = c.tid,
                                tile = c.title
                            };
                lst = query.ToList();
            }
            return lst;
        }
    }
}
