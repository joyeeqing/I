(function() {
	"use strict"
	var headerCss = document.getElementsByTagName('script'),
		path, cssPath, headTitle = "";
    var temp;

    temp='';


	for(var i = 0; i < headerCss.length; i++){
	    cssPath = headerCss[i].getAttribute('data-css');
		headTitle = headerCss[i].getAttribute('data-title');
		if(cssPath != null && cssPath != undefined){
			cssPath = '<link rel="stylesheet" href="/css/page/' + cssPath + '.css"/>'
			break;	
		}

	}
	var html = '<!DOCTYPE html>'+
				'<html lang="en">'+
				'<head>'+
					'<meta charset="UTF-8">'+
					'<title>'+headTitle+'</title>'+
					'<link rel="stylesheet" href="/css/lib/bootstrap.css"/>'+
					'<link rel="stylesheet" href="/css/global.css"/>'
					+cssPath+
					'<script>'+
						'var MIS = {};'+
						'MIS.STATIC_ROOT = "/js"'+
					'</script>'+
					'<script src="'+temp+'/js/lib/jquery.js"></script>'+
					'<script src="'+temp+'/js/modules/api.js"></script>'+
					'<script src="'+temp+'/js/lib/juicer.js"></script>'+
                    
				'</head>'+
				'<body>';
				
    var headerTpl = function(){
		/*
		<div class="common_header">

		    <img src="/img/common/logo.png" class="icon_logo">
		   
            <div class="common_header_search">
	            <input type="text" value="" id="header_search"/>
	            <img src="/img/common/search.png" id="icon_search">
            </div>

            <div class="common_header_nav">
	            <ul class="header_nav_list">
		            <a href="index.html"><li>首页</li></a>
		            <a href="project.html"><li>研究成果</li></a>
		            <a href="news.html"><li>新闻动态</li></a>
		            <a href="essay_list.html"><li>论文专著</li></a>
		            <a href="#"><li>相关单位</li></a>
	            </ul>
            </div>
            <div class="about">
	            <ul>
	                
	            </ul>
            </div>
		</div>
		
		*/
	};
	var  header = html + headerTpl.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
	document.write(header);
    

})();
