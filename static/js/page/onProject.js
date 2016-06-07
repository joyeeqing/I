/*
*  在研项目
*  @qingfan
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl){

     var onProject={

     	init:function(){
	        
	        onProject.getData();
     	},

        tpl:function(){
            
            /*
            {@each data.notcompletedachieve as item}
                <div class="item">
                    <span class="product_no h item_1">${item.type}</span>
                    <span class="manage h item_2">${item.laeder}</span>
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
                    "page_id":1,
                    "page_size":6
                },
                function(res){
                    console.log(res);
                	$(".product_content")
                    .html(juicer(funcTpl(onProject.tpl),res));
                }
     		);
     	}

     	

     };

     return onProject.init();
});