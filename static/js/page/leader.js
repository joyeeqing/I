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
             
             $("#content").append(funcTpl(leader.headerTpl));
             
             leader.getData();
             leader.show_info();
             

		},

		headerTpl:function(){
			/*
		    {@each data.personlist as it,index}
		    	<li>
		    		<div class="headpic" style="background-image:url(/img/page/head.png)">

		    			<span class="black"></span>
		    			<span class="name">姓名：${it.name}</span>
		    			<span class="info">
		    				方向：${it.major}${index}<br/>
		    				专业：${it.majorin}
		    			</span>
		    		</div>
		    	</li>
		    {@/each}
		     */
		},

		show_info:function (){
			
			$('.headpic>span').hide();
			$('#content').on('mouseover',function(e){
				$(e.target).children('span').show('normal');
			});
			$('#content').mouseleave(function(e) {
				$(e.target).parent().children('span').hide('normal');
			});
		},

		getData:function(){
			/*request.post({
				url:'http://rap.taobao.org/mockjs/4112/institute/person/listperson.do',
				data:{page_id:1,page_size:6},
				function(res){
						var tpl=juicer($(".pic").html(),res);
						$(".pic").html(tpl);
					},
				});*/
				$.ajax({
            	type:'post',
            	url:'http://rap.taobao.org/mockjs/4112/institute/person/listperson.do',
            	data:{page_id:1,page_size:6},
            	success:function(res){
            		
            		var tpl=juicer($('#content').html(),res);
            		$('#content').html(tpl);
            		console.log(res.data.personlist[0]);
            		//$("#content").innerHTML=tpl;
            	},
            	error:function(res){
            		console.log(res);

            	}
            });
		},
	};
	leader.init();
});
