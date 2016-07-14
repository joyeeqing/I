/**
 * 
 * @author gaoxiang
 */

require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
    var page=1,
        index,
        proId,
        time=0;
	var essay_list={

	init:function(){
		essay_list.getData();
		essay_list.load();
        
	},
	
	listTpl:function(){
		
        /*

    		{@each data.paperlist as it,index}
            	<li class="load_list">
                    <span class="pro_id" style="display:none;">${it.id}</span>
            		<span class="index">${parseInt(index)+1}</span> 
            		<span class="author">${it.author}</span> 
            		<span class="name">
            		<span class="h1">${it.title}</span><br/>
            		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ${it.summary}<br/>
            		<p class="h2">【关键词】${it.keyword}</p>
            		</span>
            		<p class="time">${it.date}</p>
            	</li>
        	{@/each}

    	*/
	},
    
    setStorage:function(id){
        localStorage.setItem("proId",id);
        location.assign("dissertation.html");
    },
        
    /*点击新闻阅读原文*/
    prosTurn:function(){
        $("#content").on('click','.h1',function(){
            proId=$(this).parent().parent().find(".pro_id").html();
            essay_list.setStorage(proId);

        });
    },

	getData:function(){
		request.post(
                _api.listpaper,
                {
                    "pageNow":page,
                    "identify":'article',
                    "pageSize":6
                },
                function(res){
                     var tpl=juicer(funcTpl(essay_list.listTpl),res);
                     $('#content').html(tpl);
                     console.log(res);
                     
                     essay_list.prosTurn();
                     
                    }
                );
	},

	load:function(){
		list=$('li');
		
		$('.load').click(function() {
			page++;
            request.post(
                _api.listpaper,
                {
                    "pageNow":page,
                    "identify":'article',
                    "pageSize":6
                },
                function(res){
                    console.log(res);
                    var tpl=juicer(funcTpl(essay_list.listTpl),res);
                    $(tpl).appendTo($('#content')).hide().show('normal');
                }
            );	
		});
	},
};
 return  essay_list.init();
});