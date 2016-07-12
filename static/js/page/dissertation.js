/**
 * 
 * @author gaoxiang
 */
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request,funcTpl) {
	var proId;
	var dissertation={

	init:function(){
		dissertation.getProId();
		dissertation.getData();
	},
	
	textTpl:function(){
		/*
		<div class="essay">
    	<div class="title">
			<p>论文题目：</p>
			<div id="title_text"></div>
		</div>
    	<div id="content">
			<div id="text_time">发表日期：</div>
			<div id="text_author">作者：</div>
			<div id="content_text"></div>
		</div>
		</div>
    	*/
	},
    getProId:function(){
     
	    proId=localStorage.getItem("proId");
	    console.log(proId);
    },

	getData:function(){
		request.post(
                _api.readpaper,
                {
                	"id":proId
                },
                function(res){
                	console.log(res);
                    $(".content").append(funcTpl(dissertation.textTpl));
            		var value=res.data.paper;
            		$('#title_text').append(value.title);
            		$('#text_time').append(value.date);
            		$('#text_author').append(value.author);
            		$('#content_text').append(value.content);
            		var obj=$('#content_text')[0];
					var all=Math.ceil(parseInt(obj.scrollHeight)/ parseInt(obj.clientHeight));
					var i=parseInt($('#tag_nub').val());
					$('#btn2').on('click',function(event){
							if(i<all){

							i++;
							obj.scrollTop=(i-1)*parseInt(obj.offsetHeight);
							$('#tag_nub').val(i);
							$('#btn1').css({"color":"white","cursor":"pointer"});
						
							}else if(i==all){

								$('#btn2').css({"color":"#e3e3e3","cursor":"not-allowed"});
								return false;
							}else{
								return false;
							}
							

						});
					$('#btn1').on('click',function(event){
							if(i>1){
							i=i-1;
							obj.scrollTop=(i-1)*parseInt(obj.offsetHeight);
							$('#tag_nub').val(i);
							$('#btn2').css({"color":"white","cursor":"pointer"});
							}else if(i==1){
								$('#btn1').css({"color":"#e3e3e3","cursor":"not-allowed"});
								return false;
							}else{
								return false;
							}
								
							
						});
                    }
                );	
		},
	};
	
dissertation.init();
});
