/*
* @qingfan
*
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
    var newsId,
        page,
        totalPages,
        pageNow;
        
	var new_Detail={

		init:function(){

	        new_Detail.getDetailId();
	        new_Detail.getOneNews();
	        
		},

		getDetailId:function(){
              newsId=localStorage.getItem("newsId");
		},
        
        getOneNews:function(){
	        request.post(
                _api.readnews,
                {
                	"id":newsId
                },
                function(res){
                    
                    $(".content").html(juicer(funcTpl(new_Detail.detailTpl),res));

                	$("#contentList > .news_content").append(res.data.news.content);

                    var allData=$("#contentList > .news_content")[0],
                        totalPages=Math.ceil(parseInt(allData.scrollHeight)/parseInt(allData.clientHeight)),
                        pageInput=$(".footer > p").find(".page");
                    var pageData = {

                        "casePage":totalPages
                    };
                    
                    $(".footer").append(juicer(funcTpl(new_Detail.footerTpl),pageData));
                    pageNow=parseInt($(".page").val());
                    
                    // 跳转下一页
		        	$('#behind').on('click',function(){

						if(pageNow < totalPages){

			                ++pageNow;
							allData.scrollTop=(pageNow-1)*parseInt(allData.clientHeight);
							$('.page').val(pageNow);
							$('#font').css({"color":"white","cursor":"pointer"});
					
						}else if(pageNow == totalPages){
                            
							$('#behind').css({"color":"#e3e3e3","cursor":"not-allowed"});
							return false;

						}else{

							return false;
						}
						
					});

			        // 跳转上一页
					$('#font').on('click',function(){

							if(pageNow > 1){

								--pageNow;
								allData.scrollTop=(pageNow-1)*parseInt(allData.clientHeight);
								$('.page').val(pageNow);
								$('#behind').css({"color":"white","cursor":"pointer"});

							}else if(pageNow == 1){

								$('#font').css({"color":"#e3e3e3","cursor":"not-allowed"});
								return false;

							}else{
								return false;
							}
								
							
						});
			    }
			);
		},

        dis:function(){

            var allData=$("#contentList > .news_content");

            
        },

		detailTpl:function(){
	        
	        /*
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
	                <div id="contentList">
		                <div class="news_content">

		                </div>
	                </div>
	        */
		},

		footerTpl:function(){
			/*
				<p>
					<span class="text"><a href="#" id="font">上一页</a></span>
					<span class="text">第<input class="page" value="1" disabled="disabled">页</span>
					<span class="text"><a href="#" id="behind">下一页</a></span>
					<span class="text-1">共 ${casePage} 页</span>
				</p>
			*/
		}

	};

	return new_Detail.init();
});