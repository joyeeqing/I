/*
*@qingfan
*
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
    var newsId;
	var new_Detail={

		init:function(){

	        //new_Detail.getStorgeId();
	        new_Detail.getDetailId();
	        new_Detail.getOneNews();
		},

		getDetailId:function(){
              newsId=localStorage.getItem("newsId");
              console.log(newsId);
		},

		getOneNews:function(){
	        request.post(
                _api.readnews,
                {
                	"id":newsId
                },
                function(res){
                	$(".content").html(juicer(funcTpl(new_Detail.detailTpl),res));
                }
	        );
		},

		detailTpl:function(){
	        
	        /*
		        <div class="news_detail">

	                <div class="news_title">
		                <p>
	                        <span>新闻标题 :</span>
	                        <span>${data.news.title}</span>
		                </p>
		                <p>
			                <span>发布日期：${data.news.date}</span>
                            <span>作者：${data.news.publisher}</span>
			            </p>
	                </div>

	                <div class="news_content">
		                <p>
			                ${data.news.content}
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