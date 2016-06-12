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

        /*阅读原文鼠标事件*/
        mouseEvent:function(){
        	$(".news_item .detail .more span").hover(function(){
	            $(this).css({"color":"#68a0a2",
                             "text-decoration":"underline"})
        	},function(){
	            $(this).css({"color":"#222",
                             "text-decoration":"none"});
        	});
        },
  	 

    	setStorage:function(id){
            localStorage.setItem("newsId",id);
            location.assign("news_Detail.html");
        },
        
        /*点击新闻阅读原文*/
        newsTurn:function(){
            $(".news_list").on('click','.news_item',function(){
                newsId=$(this).find(".news_id").html();
                news.setStorage(newsId);
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
                    news.newsTurn();
                }
    		);
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
	                	
	                	$(".news").append(juicer(funcTpl(news.newsTpl),res)).show('normal');
                        news.mouseEvent(); 
	                }
    			);
    		});
    	},

        newsTpl:function(){
            /*
             <div class="news_list">
             {@each data.newslist as item}
                 <div class="news_item">
                     <p class="news_id" style="display:none">${item.id}</p>
                     <div class="img">
                         <img src=${item.picture.link}>
                     </div>
                     <div class="detail">
                         <p class="news_head">
                             <span class="title">${item.title}</span>
                             <span class="date">${item.date}  发布</span>
                         </p>
                         <p class="news_detail">
                             
                         </p>
                         <p class="more">
                             <span>阅读原文</span>
                         </p>
                     </div>
                 </div>
              {@/each}
             </div>
            */
        }
        
    };

    return news.init();

	});