/*
*  在研项目
*  @qingfan
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl){
     var page=1;
     var onProject={

     	init:function(){
	        
	        onProject.getData();
            //onProject.loadMore();
     	},

        tpl:function(){
            
            /*
            {@each data.doingachieve as item}
                <div class="item">
                    <span class="product_no h item_1">${item.type}</span>
                    <span class="manage h item_2">${item.leader}</span>
                    <span class="product_name h item_3">${item.title}</span>
                    <span class="date h item_4">${item.startline}</span>
                </div>
            {@/each}  


            */
        },

        getData:function(){

     		request.post(
                _api.listgetachieving,
                {
                    "pageNow":page,
                    "pageSize":6
                },
                function(res){
                    console.log(res);
                	$(".product_content")
                    .html(juicer(funcTpl(onProject.tpl),res));
                   
                }
     		);
     	},

        /*加载更多*/
        loadMore:function(){
            $(".more").click(function(){
                page++;
                console.log(page);
                request.post(
                    _api.listgetachieving,
                    {
                        "pageNow":page,
                        "pageSize":6

                    },
                    function(res){
                        console.log(res);
                        $(".product_content").append(juicer(funcTpl(onProject.tpl),res));
                    }
                );
            });
            
        }
     	

     };

     return onProject.init();
});