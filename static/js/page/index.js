/**
 * 首页
 * 
 * @author fangqing
 */
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery','util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
	var paperId;
	var index = {
		
		init:function(){
			  
	        //index.getCarousel();
	        $(".carousel").append(funcTpl(index.carouselTpl_1));
	        index.carousel();
	        index.getPaperData();
	        index.getNewsData();
	        index.news_look();
            index.display();
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
                	console.log(res);
                	
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
        
        /*文章链接区*/
		display:function(){
			
			console.log($(".display >ul").html());
			

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

			lookOrigin.hover(function(){
                 $(this).css("color","#a4c3c4");

			},function(){
                 $(this).css("color","#222");
			});
		},

		disTpl:function(){
			
			/*
			<ul>
			{@each data.paperlist as item_1}
				<li>
				
					<div class="div">
						<div class="img">
							<img src="${item_1.pic_link}">
						</div>
						<div class="topic">
						    <span id="id" style="display:none">${item_1.id}</span>
							<p class="paper_title">${item_1.title}</p>
							<p class="author">by ${item_1.author}</p>
						</div>
					</div>
					
                </li>
            {@/each}
			</ul>
		
			*/
		},
        
        getPaperData:function(){
             request.post(
                _api.listpaper,
                {
                	"identify":"index"
                },
                function(res){
                	console.log(res);
                	$(".display").html(juicer(funcTpl(index.disTpl),res));
                }
            );
        },

		newTpl:function(){
           /*
             <p class="title">
	             <span><img src="/img/page/lasted-new.png">最新新闻</span>
	             <span class="lookMore">查看更多>>>></span>
             </p>

             <div class="news_list">
                {@each data.newslist as item_2}
	             <div class="news_item">
		             <div class="img">
			             <img src=${item_2.pic_link}>
		             </div>
		             <div class="detail">
			             <p class="news_head">
				             <span class="title">${item_2.title}</span>
				             <span class="date">${item_2.date}  发布</span>
			             </p>
			             <p class="news_detail">
				             ${item_2.summary}
			             </p>
			             <p class="more">
				             <a href="news_Detail.html">阅读原文</a>
			             </p>
		             </div>
	             </div>
	             {@/each}
             </div>
           */
		},

		getNewsData:function(){
			request.post(
                _api.listnews,
                {
                	"identify":"index"
                },
                function(res){
	                console.log(res);
	                $(".news").html(juicer(funcTpl(index.newTpl),res));
                }
			);
		}

	};

	index.init();
});