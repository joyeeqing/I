/*
*  已完成项目
*  @qingfan
*/
require.config({
	baseUrl:MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl){

     var comProject={

     	init:function(){
	        $(".product_content").append(funcTpl(comProject.tpl));
	        comProject.getComData();
     	},

        tpl:function(){
            
            /*
            {@each data.completedachieve as item}
                <div class="item">
                    <span class="product_no h item_1">${item.type}</span>
                    <span class="manage h item_2">${item.laeder}</span>
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
                	"page_id":1,
                	"page_size":6
                },
                function(res){
                	
                	$(".product_content")
                    .html(juicer(funcTpl(comProject.tpl),res));
                }
     		);
     	}

     	
     };

     return comProject.init();
});