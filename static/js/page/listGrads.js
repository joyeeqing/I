/**
 * 
 * @author gaoxiang
 */
require.config({
	baseUrl: MIS.STATIC_ROOT
});
require(['lib/jquery', 'util/request','util/funcTpl','lib/juicer'], function($, request, funcTpl) {

	var leader={

		init:function(){
             leader.getData();
             //$("#content").append(funcTpl(leader.headerTpl));
             
		},

		headerTpl:function(){
			/*
		    {@each data.personlist as it,index}
		    	<li>
		    		<div class="headpic" style="background-image:url(/img/page/head.png)">

		    			<span class="black"></span>
		    			<span class="name">姓名：${it.name}<br/></span>
		    			<span class="info">
		    				方向：${it.major}${index}<br/>
		    				专业：${it.majorin}<br/>
		    			</span>
		    			<span class="profile">
		    				个人简介：${it.profile}
		    			</span>
		    		</div>
		    	</li>
		    {@/each}
		     */
		},

		show_info:function (){
			
			$('.headpic>span').hide();

			$('#content').on('mouseover',function(e){
				$(e.target).children('span').stop(false,true).show('fast');
				$('.headpic').mouseleave(function(event) {
					if($('.detial_info').css('display')=='none'){
						$(this).children('span').hide('fast');
					}
				});
			});

			$('#content').on('click',function(e){
				if($(e.target).parent().children('.name').html()){
					var info='<img id="close_info" src="/img/page/close.png">'
								+$(e.target).parent().children('.name').html()
								+$(e.target).parent().children('.info').html()
								+$(e.target).parent().children('.profile').html();
					$('.detial_info').html(info);
					$('.detial_info').show('fast');
					$('.headpic>span').css({'opacity':'0.5','filter':'alpha(opacity=50)'});
					$('#close_info').click(function(event) {
						$('.detial_info').hide('fast');
						$('.headpic>span').hide();
						$('.headpic>span:gt(0)').css({'opacity':'1','filter':'alpha(opacity=100)'});
						event.stopPropagation();
					});
				};
			});
		},

		getData:function(){

				$.ajax({
            	type:'post',
            	url:_api.listGrads,
            	data:{page_id:1,page_size:6},
            	success:function(res){

            		$('#content').append(juicer(funcTpl(leader.headerTpl),res));
            		leader.show_info();
            	},
            	error:function(res){
            		console.log(res);

            	}
            });
		}
	};
	return leader.init();
});
