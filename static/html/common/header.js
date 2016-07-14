﻿(function() {
	"use strict"
	var headerCss = document.getElementsByTagName('script'),
		path, cssPath, headTitle = "";
    var temp;

    temp='/Institute/static';


	for(var i = 0; i < headerCss.length; i++){
	    cssPath = headerCss[i].getAttribute('data-css');
		headTitle = headerCss[i].getAttribute('data-title');
		if(cssPath != null && cssPath != undefined){
			cssPath = '<link rel="stylesheet" href="'+temp+'/css/page/' + cssPath + '.css"/>'
			break;	
		}

	}
	var html = '<!DOCTYPE html>'+
				'<html lang="en">'+
				'<head>'+
					'<meta charset="utf-8">'+
					'<title>'+headTitle+'</title>'+
					'<link rel="stylesheet" href="'+temp+'/css/lib/bootstrap.css"/>'+
					'<link rel="stylesheet" href="'+temp+'/css/global.css"/>'
					+cssPath+
					'<script>'+
						'var MIS = {};'+
						'MIS.STATIC_ROOT = "'+temp+'/js"'+
					'</script>'+
					'<script src="'+temp+'/js/lib/jquery.js"></script>'+
					'<script src="'+temp+'/js/modules/api.js"></script>'+
					'<script src="'+temp+'/js/lib/juicer.js"></script>'+
                    
				'</head>'+
				'<body>';
				
    var headerTpl = function(){
		/*
		<div class="common_header">
            
            <div class="header_con">
			    <img src="/Institute/static/img/common/logo.png" class="icon_logo">
			   
	            <div class="common_header_search">
		            <input type="text" value="" id="header_search"/>
		            <img src="/Institute/static/img/common/search.png" id="icon_search">
	            </div>
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
