/**
 * 首页
 * 
 * @author fangqing
 */
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery','util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
	var paperListId,newsId;
	var index = {
		
		init:function(){
			  
	        //index.getCarousel();
	        $(".carousel").append(funcTpl(index.carouselTpl_1));
	        //$(".display > ul").append(funcTpl(index.disTpl));
	        index.carousel();
	        index.getPaperData();
	        index.getNewsData();
	        
            // index.display(); // async
		},
        
        /*无缝图片滚动*/
		carousel:function(){

           var ulTag=$(".carousel > ul"),
               liNum=ulTag.find("li").length,
               i=0,
               timer,
               Imgs=$(".carousel > ul").find("li");
               dis=$(".disc").find("li");

           
           function handler(){
               i++;
               if(i > liNum - 1){
	               	i=0;
               }

               if(i == 0){
	                	ulTag.css({"margin-left":"0px"});
	                }else{
	                	ulTag.animate({"margin-left":-1366*i+"px"},500); 
	                }

	           	dis.eq(i).addClass("selected")
	           	       .siblings().removeClass("selected");


           }     
           ulTag.width(1366*3);
              
           timer=setInterval(handler,2000);

           /*鼠标移动触发事件*/
           ulTag.on("mouseover",function(){
           	    clearInterval(timer);

                dis.click(function(){
                    var _this=$(this);
                    /*取得当前位置的图片*/
                    i=_this.attr("index");
	                _this.addClass('selected')
	                     .siblings().removeClass('selected');
                    ulTag.animate({"margin-left":i*-1366+'px'});
                });
           }).on('mouseout',function(){

               timer=setInterval(handler,2000);
           });

           $(".circles").on('mouseover',function(){
	            clearInterval(timer);
           }).on('mouseout',function(){
	            timer=setInterval(handler,2000);
           })
	    
		},
        
        /*获取首页轮播的图片*/
        getCarousel:function(){
        	 request.post(
                _api.loadbigpic,
                {},
                function(res){
                	$(".carousel").html(juicer(funcTpl(index.carouselTpl),res));
                }
            );
        },
           
		carouselTpl:function(){

			/*
			<ul class="carousel_con">
	   
				{@each data.bigpiclist as item}
					<li class="pic">
					    <img src=${item.pic_link}>
				    </li>
	            {@/each}

	        </ul>
			*/
		},

		carouselTpl_1:function(){

			/*
			<ul class="carousel_con">
	   
                    <li class="pic">
	                    <img src="/img/page/ca_1.png">
                    </li>	   
					<li class="pic">
					    <img src="/img/page/ca_2.png">
				    </li>
				    <li class="pic">
					    <img src="/img/page/ca_1.png">
                    </li>
	        </ul>
			*/
		},
        
		/*新闻查看*/
		news_look:function(){
			var lookMore=$(".lookMore"),
			    lookOrigin=$(".more").find("a");

			lookMore.hover(function(){
	            lookMore.css("color","#288285");
			},function(){
                lookMore.css("color","#222");
			});

			lookMore.click(function(){
				location.assign("news.html");
			});

			lookOrigin.hover(function(){
                 $(this).css("color","red");

			},function(){
                 $(this).css("color","#222");
			});
            // console.log("!!!");
		},

		disTpl:function(){
			
			/*
			
			{@each data.paperlist as item}
				<li>
					<div class="div">
						<div class="img">
							<img src="${item.pic_link}">
						</div>
						<div class="topic">
						    <span class="paperListId" style="display:none">${item.id}</span>
							<p class="paper_title">${item.title}</p>
							<p class="author">by ${item.author}</p>
						</div>
					</div>
                </li>
            {@/each}

			*/
		},
        
        getPaperData:function(){
             request.post(
                _api.listpaper,
                {
                	"identify":"index"
                },
                function(res){
                	var tmp=juicer(funcTpl(index.disTpl),res);//数据
                	$(".display > ul").append(tmp);   //dom节点是加载在html中的
                	index.display();
                	index.paperTurn();
                }
            );
        },
        
        requestPaperId:function(){
	        localStorage.setItem("paperId",paperListId);
	        location.assign("essay_list.html");
        },

        /*点击论文跳转阅读原文*/
        paperTurn:function(){
        	$(".papers").on("click","li",function(){
        		paperListId=$(this).find("paperListId").html();
        		index.requestPaperId();
        	});
        },

		newTpl:function(){
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
				             ${item.summary}
			             </p>
			             <p class="more">
				             <a href="#">阅读原文</a>
			             </p>
		             </div>
	             </div>
	             {@/each}
             </div>
           */
		},

		requestNewsId:function(){
			localStorage.setItem("newsId",newsId);
			location.assign("news_Detail.html");
		},

		/*点击新闻阅读原文*/
        newsTurn:function(){
        	$(".news_list").on("click",".news_item",function(){
        		newsId=$(this).find(".item_id").html();
        		index.requestNewsId();
        	});
        },

		getNewsData:function(){
			request.post(
                _api.listnews,
                {
                	"identify":"index"
                },
                function(res){
	                var tmp=juicer(funcTpl(index.newTpl),res);
	                $(".news > .c").append(tmp);
	                index.news_look();
	                
                }
			);
		}

	};

	index.init();
});