﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace B2BData
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class b2b_sysEntities : DbContext
    {
        public b2b_sysEntities()
            : base("name=b2b_sysEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<payOrder> payOrder { get; set; }
        public virtual DbSet<Trade> Trade { get; set; }
        public virtual DbSet<TradeDetail> TradeDetail { get; set; }
        public virtual DbSet<itemnew> itemnew { get; set; }
        public virtual DbSet<skunew> skunew { get; set; }
    }
}
