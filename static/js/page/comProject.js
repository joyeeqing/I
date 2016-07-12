/*
*  已完成项目
*  @qingfan
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl){
     var page=1,
         pageSize=1;
     var comProject={

     	init:function(){
	        $(".product_content").append(funcTpl(comProject.tpl));
	        comProject.getComData();
            comProject.loadMore();
     	},

        tpl:function(){
            
            /*
            {@each data.completedachieve as item}
                <div class="item">
                    <span class="product_no h item_1">${item.type}</span>
                    <span class="manage h item_2">${item.leader}</span>
                    <span class="product_name h item_3">${item.title}</span>
                    <span class="date h item_4">${item.deadline}</span>
                </div>
            
            {@/each}
            */
        },

     	getComData:function(){
     		request.post(
                _api.listcompletedachieve,
                {
                	"pageNow":1,
                	"pageSize":pageSize
                },
                function(res){
                	
                	$(".product_content")
                    .html(juicer(funcTpl(comProject.tpl),res));
                    console.log(res);
                }
     		);
     	},
        /*加载更多*/
        loadMore:function(){
            
            $(".more").click(function(){
                page++;
                request.post(
                    _api.listcompletedachieve,
                    {
                        "pageNow":page,
                        "pageSize":pageSize
                    },
                    function(res){
                        var tpl=juicer(funcTpl(comProject.tpl),res)
                        $(tpl).appendTo(".product_content").show('normal');
                        
                    }
                    );
            });
        }
     	
     };

     return comProject.init();
});