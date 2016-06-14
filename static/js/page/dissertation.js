/**
 * 
 * @author gaoxiang
 */
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
	var dissertation={

	init:function(){
		dissertation.getData();
		$('#btn1').click(function(event) {
			$('#content_text').css('margin-top','-690px');
			return false;
		});
		
	},
	
	textTpl:function(){
		/*
		<div class="essay">
    	<div class="title">
			<p>论文题目：</p>
			<div id="title_text"></div>
		</div>
    	<div class="content">
			<div id="text_time">发表日期：</div>
			<div id="text_author">作者：</div>
			<p id="content_text"></p>
		</div>
		</div>
    	*/
	},

	getData:function(){
		request.post(
                _api.readpaper,
                {id:1},
                function(res){
                    $(".content").append(funcTpl(dissertation.textTpl));
            		var value=res.data.paper;
            		$('#title_text').append(value.title);
            		$('#text_time').append(value.date);
            		$('#text_author').append(value.author);
            		$('#content_text').append(value.content);
                    }
                );	
		},

	};
dissertation.init();
});
