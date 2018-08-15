/**
 *zhaomin 
 *字符串切割(按照字符长度计算，区分中英文：英文占1个字符，中文汉字占2个字符)
 *
 */
(function(){
	'use strict'
	
	app.filter('subStringFilter',function(){
		return function(input,len){
			return getNewStr(input,len)
		}
		
		function getNewStr(str,subLen) {  
			  var len = 0;
			  var newStr = "";
			  for (var i=0; i<str.length; i++) {  
			    if (str.charCodeAt(i)>127 || str.charCodeAt(i) == 94) {  
			       len += 2;  
			    } else {  
			       len ++;  
			    }
			    if(len < subLen){
			    	newStr += str[i];
			    }
			    else{
			    	newStr += "...";
			    	break;
			    }
			   }  
			  return newStr;  
		}		
	})
})()