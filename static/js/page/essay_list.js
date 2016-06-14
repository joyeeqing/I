/**
 * 
 * @author gaoxiang
 */

require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {

	var essay_list={

	init:function(){
		
		//$("#content").append(funcTpl(essay_list.listTpl));
		essay_list.getData();
		essay_list.load();
	},
	
	listTpl:function(){
		/*
		{@each data.paperlist as it,index}
    	<li class="load_list">
    		<span class="index">${parseInt(index)+1}</span> 
    		<span class="author">${it.author}</span> 
    		<span class="name">
    		<a href="dissertation.html" id="h1">${it.title}</a><br/>
    		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${it.content}。。。<br/>
    		<p id="h2">【关键词】${it.keyword}</p>
    		</span>
    		<p class="time">${it.date}</p>
    	</li>
    	{@/each}
    	*/
	},

	getData:function(){
		request.post(
                _api.listpaper,
                {
                    page_id:1,
                    identify:'paper',
                    page_size:1
                },
                function(res){
                    var tpl=juicer(funcTpl(essay_list.listTpl),res);
                    $('#content').html(tpl);
                    }
                );
	},

	load:function(){
		list=$('li');
		i=1;
		$('.load').click(function() {
			i+=1;
			$.ajax({
            	type:'post',
            	url:'http://rap.taobao.org/mockjs/4112/institute/paper/listpaper.do',
            	data:{page_id:i,identify:'paper',page_size:6},
            	success:function(res){
            		var tpl=juicer(funcTpl(essay_list.listTpl),res);
            		$(tpl).appendTo($('#content')).hide().show('normal');
            	},
            });
			
		});
	},
};
essay_list.init();
});