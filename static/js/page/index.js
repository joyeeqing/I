/**
 * 首页
 * 
 * @author fangqing
 */
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
	
	var index = {
		
		init:function(){
			
	        //index.carousel();
	        index.getCarousel();
	        index.getPaperData();
	        index.getNewsData();
	        // $(".carousel").append(funcTpl(index.carouselTpl));
	        // $(".display > ul").append(funcTpl(index.disTpl));
	        //$(".news").append(funcTpl(index.newTpl));
	        index.news_look();

		},
        
        /*轮播*/
		carousel:function(){
           
           var Imgs=$(".carousel").find(".pic"),
               dis=$(".disc").find("li"),
               timer,
               i=0;
               function handler(){
           	    i++;
	           	if(i>2){
	           		i=0;
	           	}
	            Imgs.eq(i).show().siblings().hide();
                dis.eq(i).addClass("selected").siblings().removeClass("selected");
           
                }

           timer=setInterval(handler,1000);

           Imgs.on('mouseover',function(){
           	   clearInterval(timer);
               dis.click(function(){
               	   var index=$(this).attr("index");
	               $(this).addClass('selected').siblings().removeClass('selected');
                   Imgs.eq(index).show().siblings().hide();
               });
           }).on('mouseout',function(){
               timer=setInterval(handler,1000);
           });

           $(".circles").on('mouseover',function(){
           	clearInterval(timer);
           }).on('mouseout',function(){
           	timer=setInterval(handler,1000);
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
			<div class="carousel_con">
	   
				{@each data.bigpiclist as item}
					<div class="pic">
					    <img src=${item.pic_link}>
				    </div>
	            {@/each}

	        </div>
			*/
		},
        
        /*文章链接区*/
		display:function(){
			
       
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
					<a href="#">
						<div class="div">
							<div class="img">
								<img src="${item_1.pic_link}">
							</div>
							<div class="topic">
							    <span class="id" style="display:none">${item_1.id}</span>
								<p>${item_1.title}</p>
								<p class="author">by ${item_1.author}</p>
							</div>
						</div>
					</a>
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