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

                	var caseNewsArr=[],
                	    content,
                	    count,
                	    start,
                	    end,
                	    page,
                	    totalPages,
                	    startPage;

                	//获取新闻内容
                    content=res.data.news.content;

                    start=0;
                    page=0;
                    count=2000;
                    temp=2000;
                    totalPages=0;
                    startPage=0;
                    end=content.toString().length;
                    totalPages=Math.ceil(end/count);
                    console.log(totalPages);
                 
                    for(var i = 0; i < totalPages; i++){
                    	if(i == totalPages-1){
	                        caseNewsArr.push(content.substring(start,end));
                    	}else{
                    		caseNewsArr.push(content.substring(start,temp));
                    	}
                    	temp +=count
	                    start += count;
                    }
                    console.log(caseNewsArr);
                    var caseNewsArrData = {

                    	"caseNewsList":caseNewsArr
                    };
                    
                    var pageData = {

                        "casePage":totalPages
                    };

                    var caseNewTpl=juicer(funcTpl(new_Detail.cTpl),caseNewsArrData);
                    $(".content").append(caseNewTpl);
                    new_Detail.newsPage(page);

                    $(".footer").append(juicer(funcTpl(new_Detail.footerTpl),pageData));
                    //new_Detail.footer();
                }
	        );
		},

		//新闻页面显示
		newsPage:function(page){
			console.log(page);
			var newsPages=$(".news_content");
			console.log(newsPages);
			newsPages.eq(page).show().siblings().hide();

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
	        */
		},

		cTpl:function(){
	        
	        /*
	        <div class="contentList">
		        {@each caseNewsList as newsCase}
			        <div class="news_content">
			                <p>
				                ${newsCase}
			                </p>
		            </div>

		        {@/each}
	        </div>
	        */
		},

		turnCss:function(){

			/*跳转页面样式*/
	        $("#font").hover(function(){
	            $(this).css({"color":"#fff","text-decoration":"underline"});
	        },function(){
	            $(this).css({"color":"#060606","text-decoration":"none"});
	        });

	        $("#behind").hover(function(){
	            $(this).css({"color":"#fff","text-decoration":"underline"});
	        },function(){
	            $(this).css({"color":"#060606","text-decoration":"none"});
	        });
            
		},

		nextPage:function(){
            $("#behind").css({"color":"#060606"});

	        /* 判断是否到最后一页 */
			if(page == totalPages) {

				$("#behind").css({"color":"#e3e3e3","curosr":"not-allowed"});				
				return totalPages;

			} else {
				return ++ page;
			}			
	        
		},

		lastPage:function(){
	        $("#font").css({"color":"#060606"});

	        /* 判断是否到初始页 */
			if(page == startPage) {

				$("#font").css({"color":"#e3e3e3","curosr":"not-allowed"});	
				return startPage;
			} else {
				
				return -- page;
			}			
		},

		footerTpl:function(){
			/*
				<p>
					<span class="text" id="font">上一页</span>
					<span class="text">第 <span id="at"></span> 页</span>
					<span class="text" id="behind">下一页</span>
					<span class="text-1">共 ${casePage} 页</span>
				</p>
			*/
		}

	};

	return new_Detail.init();
});