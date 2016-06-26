/*
*@qingfan
*
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
    var newsId,
        page,
        totalPages,
        startPage;
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

                	var caseNewsArr=[],
                	    content,
                	    count,
                	    start,
                	    end;

                    content=res.data.news.content;
                    start=0;
                    page=1;
                    count=1772;
                    temp=1772; 
                    startPage=1;
                    end=content.toString().length;
                    totalPages=Math.ceil(end/count);
                    var pageInput=$(".footer > p").find(".page");

                    for(var i = 0; i < totalPages; i++){
                    	if(i == totalPages-1){
	                        caseNewsArr.push(content.substring(start,end));
                    	}else{
                    		caseNewsArr.push(content.substring(start,temp));
                    	}
                    	temp +=count;
	                    start += count;
                    }

                    var caseNewsArrData = {

                    	"caseNewsList":caseNewsArr
                    };
                    
                    var pageData = {

                        "casePage":totalPages
                    };

                    var caseNewTpl=juicer(funcTpl(new_Detail.cTpl),caseNewsArrData);
                    $(".content").append(caseNewTpl);

                    $(".footer").append(juicer(funcTpl(new_Detail.footerTpl),pageData));
                    new_Detail.turnCss();                    
                    pageInput.val(page);
                    new_Detail.newsPage(page);
                    
                    new_Detail.turnPage();
                }
	        );
		},

		//新闻页面显示
		newsPage:function(page){
			
			var newsPages=$(".news_content");
			
			newsPages.eq(page-1).show().siblings().hide();
			$(".footer > p").find(".page").val(page);
		},

		turnPage:function(){

			$("#font").click(function(){
                				
				new_Detail.newsPage(new_Detail.lastPage());
			});

			$("#behind").click(function(){
				
				new_Detail.newsPage(new_Detail.nextPage());
			});
		},

		nextPage:function(){
            $("#behind").css({"color":"#060606"});
	        /* 判断是否到最后一页 */
			if(page == totalPages&&page == startPage) {
                 
				$("#behind").css({"color":"#e3e3e3","cursor":"not-allowed"});
				$("#font").css({"color":"#e3e3e3","cursor":"not-allowed"});				
				return totalPages;

			} else if(page == totalPages && page !== startPage){
                $("#behind").css({"color":"#e3e3e3","cursor":"not-allowed"});
                return totalPages;
			}else {
				$("#font").css({"color":"#060606","cursor":"default"});
				return ++ page;
			}
		},

		lastPage:function(){
	       $("#font").css({"color":"#060606"});

	        /* 判断是否到初始页 */
			if(page == startPage && page == totalPages) {
                $("#behind").css({"color":"#e3e3e3","cursor":"not-allowed"});
				$("#font").css({"color":"#e3e3e3","cursor":"not-allowed"});	
				return startPage;

			} else if(page == startPage && page !== totalPages){
               $("#font").css({"color":"#e3e3e3","cursor":"not-allowed"});	
               return startPage;

			}else {
				$("#behind").css({"color":"#060606","cursor":"default"});
				return -- page;
			}
            		
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
	        	if(page == startPage){

	        	}else{
	        		$(this).css({"color":"#fff"});
	        	}
	            
	        },function(){
	        	if(page==startPage){

	        	}else{
	        		$(this).css({"color":"#060606"});
	        	}
	            
	        });

	        $("#behind").hover(function(){
	        	if(page == totalPages){

	        	}else{
	        		$(this).css({"color":"#fff"});
	        	}
	            
	        },function(){
	        	if(page==totalPages){
                    
	        	}else{
	        		$(this).css({"color":"#060606"});
	        	}
	            
	        });
            
		},

		footerTpl:function(){
			/*
				<p>
					<span class="text" id="font">上一页</span>
					<span class="text">第<input class="page">页</span>
					<span class="text" id="behind">下一页</span>
					<span class="text-1">共 ${casePage} 页</span>
				</p>
			*/
		}

	};

	return new_Detail.init();
});