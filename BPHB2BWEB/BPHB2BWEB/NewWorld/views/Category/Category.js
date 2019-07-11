function Category () {
//===============================================获取路径================================
	function getParameter(name) { 
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r!=null) return unescape(r[2]); return null;
	}
	
	$(document).ready(function () {
//===============================================一级菜单================================
		hadenum ()
		// 模块化格式
		var tabulation = (function () {
			// 展开一级菜单 1
			function areveal () {
				$(".rw-lst-header-nav-fixed-header").stop(true,true).slideDown("slow");
				_mm.request({
					data:{
						method     : "GetCategoy",
						ishomeview : 1,
						type       : 1
					},
					success : function (res) {
						console.log(res)
						var html1 = ""
						res.forEach(function (val,index) {
							html1 += `
							<li class="first-item" data-type="${val.ID}">
								<span class="f14">${val.cname}</span>
								<div class="absolute rw-lst-header-nav-second">
									<ul class="cl p-rw-lst-header">
				
									</ul>
								</div>
							</li>
							`
						})
						$(".rw-lst-header-nav-first").html(html1)
						category2 ()
					}
				})
			}
			// 收起一级菜单 2
			function shut () {
				$(".rw-lst-header-nav-fixed-header").stop(true,false).slideUp("slow");
			}
			return {
				areveal  :  areveal,     //展开一级菜单 1
				shut     :  shut         //收起一级菜单 2
			}
		})
		var category = tabulation();  // 创建模块化闭包
		// 当鼠标移入 展开 / 收起 一级菜单  1 / 2
		$(".rw-lst-header-nav-header").hover(function () {
			// category.areveal()      //展开  
			Timeout = setTimeout(function(){category.areveal()},150);
		},function () {
			clearTimeout(Timeout);
			category.shut()         //收起  
		})
//===============================================二级菜单================================
		function category2 () {
			$(".first-item").hover(function () {
				console.log(1)
				$(this).children(".rw-lst-header-nav-second").css("display","block")
				var parentid = $(this).attr("data-type")
				// 鼠标移入二级菜单渲染
				_mm.request({
					data:{
						method   : "GetCategoy",
						type     : 2,
						parentid : parentid,
					},
					success      : function (res) {
						var html2 = ""
						res.forEach(function (val,index) {
							html2 += `
									<li class="f-l second-category-item">
										<a href="../Category/Category.html?id=${val.ID}">${val.cname}</a>
									</li>
							`
						})
						$(".p-rw-lst-header").html(html2)
					}
				})
			},function () {
				$(this).children(".rw-lst-header-nav-second").css("display","none")
			})
		}
	})
//===============================================商品展示列表================================
function Category1 (pageNumber) {
	var _id = getParameter("id")
	_mm.request({
		data:{
			method     : "CategoyProducts",
			cateid     : _id,				        //窗口id
			pageSize   : 12,					        //多少条数据
			pageNumber  : pageNumber || 1		    //第几页
		},
		success      : function (res) {
			var _count = Math.ceil(res.count / 8)
			if (res.count !== 0) {
				html = "",
				res.products.forEach(function (val,index) {
					html += `
						<div class="c-offerlist-wrap f-l relative">
							<a href="../particulars/particulars.html?id=${val.ID}" class="o-image-thumb-container dis-inBlock">
								<img src="${val.logo}" alt="">
							</a>
							<div class="c-offer-info-box">
								<div class="c-offer-price-con">
									<span class="c-offer-price"> ￥ </span>
									<span class="c-offer-price">${val.jdPrice}元</span>
								</div>
								<p class="c-offer-prop-b dis-inBlock">
									${val.title}
								</p>
							</div>
							<div class="c-offer-img-mask-bg absolute t-c-f">库存1962包</div>
						</div>
					`
				})
				$(".c-offerlist").html(html)

			}else {
				html1 = `
					<img class="t-c-f tuwu" src="../../assets/image/bjimg/wu.jpg" alt="">

					<div class="shang t-c-f">
						商品未上架
					</div>
				`
				$(".c-offerlist").html(html1)

			}
			

			//===============================================分页插件================================

	
			//init
			$(function(){
				var totalPage = _count;						//总页码
				var totalRecords = 1;					    //条码数
				var pageNo = getParameter('pno');		    //获取窗口id
				if(!pageNo){
					pageNo = 1;
				}
				//生成分页
				//有些参数是可选的，比如lang，若不传有默认值
				kkpager.generPageHtml({
					// 窗口id
					pno : pageNo,
					//总页码
					total : totalPage,
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

		}
	})
  }
Category1 ()

}
Category () 

