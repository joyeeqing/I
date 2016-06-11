/*
* 新闻动态
* @qingfan
*/
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
    var page=1,
        newsId;    
    var news={

    	init:function(){
           news.getNewsData();
           news.loadMore();
           
    	},

        mouseEvent:function(){
        	$(".news_item .detail .more span").hover(function(){
	            $(this).css("color","#68a0a2")
        	},function(){
	            $(this).css("color","#222");
        	});
        },
  	
    	setStorage:function(id){
            localStorage.setItem("newsId",newsId);
            location.assign(news_Detail.html);
        },
        
        /*点击新闻阅读原文*/
        newsTurn:function(){
            $(".news_list").on('click','.news_item',function(){
                newsId=$(this).find(".news_id");
                news.setStorage();
            });
        },

    	getNewsData:function(){
    		request.post(
                _api.listnews,
                {
                	"identify":"news",
                	"page_id":page,
                	"page_size":6
                },
                function(res){
                	console.log(res);
                	$(".news").html(juicer(funcTpl(news.newsTpl),res));
                    news.mouseEvent();
                    news.setStorage();
                }
    		);
    	},

        newsTpl:function(){
            /*
             <div class="news_list">
             {@each data.newslist as item}
                 <div class="news_item">
                     <p class="news_id">${item.id}</p>
                     <div class="img">
                         <img src=${item.pic_link}>
                     </div>
                     <div class="detail">
                         <p class="news_head">
                             <span class="title">${item.title}</span>
                             <span class="date">${item.date}  发布</span>
                         </p>
                         <p class="news_detail">
                             ${item.content}
                         </p>
                         <p class="more">
                             <span>阅读原文</span>
                         </p>
                     </div>
                 </div>
              {@/each}
             </div>
            */
        },
        
        /*加载更多新闻*/
    	loadMore:function(){
    		$("#add").click(function(){
    			page++;
    			console.log(page);
    			request.post(
	                _api.listnews, 
	                {
	                	"identify":"news",
	                	"page_id":page,
	                	"page_size":6
	                },
	                function(res){
	                	var prev_tpl=$(".news").html();
	                	$(".news").html(prev_tpl+juicer(funcTpl(news.newsTpl),res));
                        news.mouseEvent();
                        news.setStorage();
	                }
    			);
    		});
    	}
    };

    return news.init();

	});