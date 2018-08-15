var wzUtils = wzUtils || {};
var Public = Public ? Puiblic : {};
//图片前缀
wzUtils.filePreviewUrl;

//园区id
wzUtils.parkId;


// 该代码来自http://www.ghugo.com/mobile-h5-fluid-layout-for-iphone6/
(function (doc, win) {
	
	if(getParam("parkId")){
		localStorage.wzparkId = getParam("parkId");
	}
	
	if(localStorage.wzparkId){
		wzUtils.parkId=localStorage.wzparkId;
	}else{
		wzUtils.parkId=1;
		localStorage.wzparkId=1;
	}
	
    // 分辨率Resolution适配
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>640){
            	clientWidth=640;
            }else if(clientWidth<320){
            	clientWidth=320;
            }
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    
    // 一物理像素在不同屏幕的显示效果不一样。要根据devicePixelRatio来修改meta标签的scale,要注释上面的meta标签
    (function(){
        return;
        var dpr = scale =1;
         var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
           scale = 1 / dpr;
           
           // 
           var metaEl = "";
           metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    })();
        
})(document, window);    


//获取url 参数值
function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}


//弹出提示框
function setTipBox(setContent){
	$(".tipbox").show();
	if($(".tipbox").length>0){
		$(".tipContent").text(setContent);
	}else{
		$(".weChat_box").append('<div class="tipbox"><p class="tipContent">'+setContent+'</p></div>');
	}
	setTimeout(function(){
		$(".tipbox").hide();
	},2000);
}

//判断浏览器
function browserRedirect(fn) { 
	var sUserAgent= navigator.userAgent.toLowerCase(); 
	var bIsIpad= sUserAgent.match(/ipad/i) == "ipad"; 
	var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os"; 
	var bIsMidp= sUserAgent.match(/midp/i) == "midp"; 
	var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 
	var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb"; 
	var bIsAndroid= sUserAgent.match(/android/i) == "android"; 
	var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce"; 
	var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile"; 
	 
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { 
		fn();
	}
} 

function checkHasLimitCom(unitId,userUnitId){
	var result =false;
	for(var i= 0;i<userUnitId.length;i++){
		var userUnitIdNum = userUnitId[i];
		if(unitId==userUnitIdNum){ //该公司在当前权限公司内
			result = true;
			return result;
		};
	};
	
}

function uploadImg(_this){
	var that = this;
	var fileName=$(_this).attr("name");
    var url=addSmartiParameter(contextUrl + '/contentFileUp/fileUp.do?responseFunction=upSucCallback&fileInputName='+fileName);
    var paramJson= {
            restrictType:'0',
            restricts:[
               {value:'jpeg'},{value:'jpg'},{value:'png'},{value:'bmp'}
            ]
    };
    var upSucCallback=function(responseResult){                           
        /*var attachmentsSize=responseResult.attachmentSize/1024;
        if(attachmentsSize/1024>3){
        	showTit("附件不能超过3M","no",function(){

            });
        }else{*/
            var rel=$(_this).attr("rel");    
            $("#"+rel).addClass("wrap-up-img");
            var attachmentsName=responseResult.attachmentName;
            var attachmentsType=responseResult.attachmentType;
            var attachmentsSize=responseResult.attachmentSize;
            var attachmentsUrl=responseResult.attachmentUrl;
            var attachmentsUrlAll="../"+responseResult.attachmentUrl;
            var singleImg='<div class="single-wrap-img" file-url="'+attachmentsUrl+'" file-size="'+attachmentsSize+'" file-type="'+attachmentsType+'" file-name="'+attachmentsName+'"><img src="'+attachmentsUrlAll+'"><em></em></div>'
            $("#"+rel).prepend(singleImg);
            $("#"+rel).find("em").on(that.clickType,function(){                    	
                $(this).parent().remove();                    
            });
        /*}; */               
    };
    var fileId=$(_this).attr("id");
    sendFileUploadParam(url,paramJson,upSucCallback,fileId); 
}

function IsPC() 
{ 
    var userAgentInfo = navigator.userAgent; 
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
    var flag = true; 
    for (var v = 0; v < Agents.length; v++) { 
        if (userAgentInfo.indexOf(Agents[v]) > 0) { 
            flag = false; 
            break;
        }
    } 
    return flag; 
};

if(IsPC){
   Public.eventType="click"; 
}else{
    Public.eventType="tap";
};

//带json 限制参数的文件上传
function sendFileUploadParam(loadUrl, paramJson, callBackFun, fileElementId) {
    loadingImg();

    var paramUrl = "";
    var restrictShow = "";
    var fileType = "";

    var canDoFlag = false;

    paramUrl += "&restrictType=" + paramJson.restrictType;

    for (i = 0; i < paramJson.restricts.length; i++) {
        paramUrl += "&restrict=" + paramJson.restricts[i].value;
        restrictShow += paramJson.restricts[i].value + "、"
    }

    var fileName = document.getElementById(fileElementId).value;

    if (fileName.lastIndexOf(".") != -1) {
        var fileType = (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)).toLowerCase();
    } else {
        if (paramJson.restrictType == 0) {
            removeLoading();
            return showTit("只允许上传" + restrictShow + "格式文件!", "no", function () {
                return;
            });
            return false;
        }
    }

    if (paramJson.restrictType == 0) {
        for (i = 0; i < paramJson.restricts.length; i++) {
            if (paramJson.restricts[i].value == fileType) {
                canDoFlag = true;
                break;
            }
        }
    }


    if (paramJson.restrictType == 1) {
        canDoFlag = true;
        for (i = 0; i < paramJson.restricts.length; i++) {
            if (paramJson.restricts[i].value == fileType) {
                canDoFlag = false;
                break;
            }
        }
    }


    if (!canDoFlag) {

        if (paramJson.restrictType == 0) {
            removeLoading();
            return showTit("只允许上传" + restrictShow + "格式文件!", "no", function () {
                return;
            });
        } else if (paramJson.restrictType == 1) {
            removeLoading();
            return showTit("只允许上传" + restrictShow + "格式以外文件!", "no", function () {
                return;
            });
        }

    }	
    //showProgressing();  
    $.ajaxFileUpload({

        url: loadUrl + paramUrl + "&rfm=" + Math.random(),
        //          data:"",
        secureuri: false,
        fileElementId: fileElementId, //文件选择框的id属性
        dataType: "json", //服务器返回的格式
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            removeLoading();
            return showTit("服务器响应数据错误!或服务器已关闭。", "no", function () {
                return;
            });
        },
        success: function (responseResult) { 
            removeLoading();             
            callBackFun(responseResult);

        }
    });

}


$(function(){
	/*var url = contextUrl + "/wx/getJsSdkConfig.json";
	$.ajax({
		type :'post',    
        url : url, 
        data:{requestUrl:location.href.split('#')[0]},
        dataType:'json',       
        success : function(ret) {
        	if(ret && ret.result){
				wx.config({
			        debug: false, //
				    appId: ret.appId, // 必填，公众号的唯一标识
				    timestamp: ret.timestamp, // 必填，生成签名的时间戳
				    nonceStr: ret.nonceStr, // 必填，生成签名的随机串
				    signature: ret.signature,// 必填，签名，见附录1
			        jsApiList: [
			        	//分享给朋友
			            'onMenuShareAppMessage',
			            //分享到朋友圈
			            'onMenuShareTimeline'
			        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			        
			    });
				
				wx.ready(function () {
					//分享给朋友
					wx.onMenuShareAppMessage({
					    title: 'CC+智慧园区', // 分享标题
					    desc: '中国领先的智慧园区运营服务平台', // 分享描述
					    link: location.href, // 分享链接
					    imgUrl: 'http://smarti.yuanqu.cc/smarti/static/login/img/logo.png', // 分享图标
					    type: 'link', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
					});
					wx.onMenuShareTimeline({
					    title: 'CC+智慧园区', // 分享标题
					    link: location.href, // 分享链接
					    imgUrl: 'http://smarti.yuanqu.cc/smarti/static/login/img/logo.png', // 分享图标
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
					});
				});
				
				
			}
    	}
    });*/
});
