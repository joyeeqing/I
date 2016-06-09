/*
*@qingfan
*
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
    var id;
	var new_Detail={

		init:function(){

	        //new_Detail.getStorgeId();
	        $(".content").append(funcTpl(new_Detail.detailTpl));
	        $(".footer").append(funcTpl(new_Detail.footerTpl));
		},

		getStorgeId:function(){

			id=localStorage.getItem(newId);

		},

		detailTpl:function(){
	        
	        /*
		        <div class="news_detail">

	                <div class="news_title">
		                <p>
	                        <span>新闻标题 :</span>
	                        <span>乔布斯访问杭州</span>
		                </p>
		                <p>
			                <span>发布日期：</span>
                            <span>作者：</span>
			            </p>
	                </div>

	                <div class="news_content">
		                <p>
		                </p>
	                </div>

		        </div>
	        */
		},
		footerTpl:function(){
			/*
				<p>
					<span class="text" id="font">上一页</span>
					<span class="text">第<span id="at"> </span>页</span>
					<span class="text" id="behind">下一页</span>
					<span class="text-1">共 页</span>
				</p>
			*/
		}

	};

	return new_Detail.init();
});