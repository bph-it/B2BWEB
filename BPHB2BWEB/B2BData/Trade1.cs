using B2BData.entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace B2BData
{
    public partial class Trade
    {
        public List<TradeDetailInfo> details { get; set; }
    }
}
