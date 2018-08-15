var Utils = Utils || {};

/**
 * 在URL中查找所需的变量名的值
 */
Utils.getValueInPathByName = function(name){
	var href = window.location.href;
	var hs = href.split("?");
	if(hs.length>1){
		var needStr = hs[1];
		var ns = needStr.split("&");
		for(var i=0;i<ns.length;i++){
			var n = ns[i];
			var t = n.split("=");
			
			if(t.length>1){
				if(name==t[0]){
					return t[1];
				}
			}
		}
	}
};

Utils.errorTip = function(target,msg){
	var $msg_span = target.siblings(".error_msg");
	if($msg_span.length<=0){
		msg = msg || "请验证输入内容是否合法";
		var html = "<span class='error_msg'>"+msg+"</span>";
		$(html).insertAfter(target);
	}
};

//得到头部的高度
Utils.getHerderHeight = function(){
	var header = $(".header");
	if(header.length>0){
		var height = header.height();
		return height;
	}else{
		return 0;
	}
};

Utils.scrollToTopWin = function(obj){
	var offset = obj.offset();
	if(offset){
		var top = offset.top;
		var headerHeight = Utils.getHerderHeight();
		window.scrollTo(0,top-headerHeight);
	}
};

/**
 * 获取当前最大ZIndex
 */
Utils.getMaxZIndex = function(){
	var maxZIndex = 0;
    $("*").each(function () {
        var i = parseInt($(this).css("z-index")) ? parseInt($(this).css("z-index")) : 0;
        if (i > maxZIndex) {
            maxZIndex = i;
        }
    });
    return maxZIndex;
};

Utils.SHOWTYPES = {
	YES:"yes",
	NO:"no"
};

/*
 * 提示框
 * msg：提示信息
 * flag：提示的类别，有yes，no两类参数 取值 通过Utils.SHOWTYPES进行选择 
 * foo：在隐藏提示框时触发的回调
 */
Utils.showTit = (function ($, w) {
    return function (msg, flag,foo,time) {
    	if(msg){
    		time = time || 1000;
            var _ico = "success_result";
            if (flag == "no") _ico = "err_result";//no的样式
            if ($("#shadeBGDiv").length <= 0) $("body").append("<div id=\"shadeBGDiv\" class=\"shadeDiv\"></div>");
            $("#successInfor").remove();
                $("body").append("<div class=\"public_result_div\" id=\"successInfor\"><span class=\""+_ico+"\">" + msg + "</span></div>");
           
            var left = ($(window).width() - $("#successInfor").width()) / 2;
            var top = ($(window).height() - $("#successInfor").height()) / 2;
            var zindex = Utils.getMaxZIndex();
            $("#successInfor").css({"left": left, "top": top,"z-index":zindex+2});
            $("#shadeBGDiv").css({"z-index":zindex});
            $("#shadeBGDiv").css({"opacity":"0.1"}).fadeIn("fast");
            $("#successInfor").fadeIn("fast");
            w.titHide = function () {           
                $("#successInfor").fadeOut("fast");    
                $("#shadeBGDiv").fadeOut("fast");
                if(foo){
                	foo();
                }
                
            };
            setTimeout("titHide()", time);
    	}
    };
})(jQuery, window);

/**
 * 加密
 * @param value 要加密的字符串
 * @param n 以n进制来进行加密
 */
Utils.encryption = function(value, n) {
	value = value || "";
	var monyer = new Array();
	var i;
	for (i = 0; i < value.length; i++){
		var nv =  value.charCodeAt(i).toString(n) + " ";
		monyer += nv;
	}
	return monyer;
};

/**
 * 解密
 * @param value 要解密的字符串
 * @param n 以n进制来进行解密
 */
Utils.decryption = function(value,n){
	var monyer = new Array();var i;
    var s=value.split(" ");
    for(i=0;i<s.length;i++)
        monyer+=String.fromCharCode(parseInt(s[i],n));
   return monyer;
};

/**
 * 按enter触发事件
 */
Utils.enterKey = 13;
Utils.triggerEventByEnterKey = function(){
	$("[enter-trigger]").bind("keyup",function(e){
		var key = e.keyCode;
		var that = this;
		if(key == Utils.enterKey){
			var t = $($(that).attr("trigger-btn"));
			t.removeAttr("hasClicked");
			t.click();
		}
	});
};

/**
 * 异步加载数据
 * @param url:加载数据的地址，
 * @param data:传到服务器端的数据
 * @param callback:访问服务器成功后的回调函数
 * @param errorCallback:访问服务器失败后的回调函数，
 * @param async:false,是否是同步加载，true为异步，FALSE为同步
 */
Utils.ajaxLoadData = function(url,data,callback,errorCallback,async,dataType){
	async = typeof(async)!="undefined" ? async : true;
	dataType = dataType || "json";
	$.ajax({
		url:url,
		data:data,
		dataType:dataType,
		type:"post",
		//contentType:contentType,
		success:function(result){
			result = result || "";
			var ret = result.result;
			if(ret && ret=="sessionTimeOut"){
				window.location.href = contextUrl + "/login/action";
			}
			if(callback){
				callback(result);
			}
		},
		async:async,
		error:function(errorMsg){
			var msg = "链接服务器失败";
			if(errorMsg.responseText){
				if(typeof(errorMsg.responseText)=="string"){
					try{
						msg = eval('('+errorMsg.responseText+')');
						msg = msg.errormsg;
					}catch(e){
						
					}
					
				}else{
					msg = errorMsg.responseText.errormsg;
				}
			}
			if(errorCallback){
				errorCallback(msg);
			}
		}
	});
};

/**
 * 分页组件
 */
Utils.Page = (function() {
	var Page = function(options) {
		var opt = options ? options : {};
		this.targetContentId = opt.targetContentId ? opt.targetContentId : "";// 显示查询到结果的区域
		this.url = opt.url ? opt.url : "";
		this.contextUrl = opt.contextUrl ? opt.contextUrl : "";
		this.pageBtnsContentId = opt.pageBtnsContentId ? opt.pageBtnsContentId
				: "";// 显示分页按钮的区域
		this.rowTemplateId = opt.rowTemplateId ? opt.rowTemplateId : "";// 每一行的模板
		this.tmplEvents = opt.tmplEvents;
		this.allNumContentId = opt.allNumContentId ? opt.allNumContentId : "";// 显示所有条数的区域
		this.resultFilter = opt.resultFilter ? opt.resultFilter : null;// 过滤要遍历的数据
		this.callback = opt.callback ? opt.callback : null;// 成功加载所有html后的回调
		this.allNumberAreaId = opt.allNumberAreaId ? opt.allNumberAreaId : "";// 每一行的模板
		this.pageNow = 1;
		this.pageSize = 10;
		this.allPageSize = 0;
		this.showPageNum = 7;// 显示多少个页面数
		this.param = options.param;
		this.filterParam = null;
		this.forAuth2 = typeof (opt.forAuth2) != "undefined" ? opt.forAuth2
				: false;
		this.loadTBodyData(this.param);
		// this.initPageBtns();
	};
	Page.prototype.setCurrentPage = function() {
		$(_this).siblings(".page_a").removeClass("current");
		$(_this).addClass("current");
		var pageNow = $(_this).text();
		var pageNowInt = parseInt(pageNow);
		if (isNaN(pageNowInt)) {
			return;
		}
		if (pageNowInt == ManagerSet.productManager.pageNow) {// 如果点击的页面跟当前页相等，则返回
			return;
		}
		ManagerSet.productManager.pageNow = pageNowInt;
		ManagerSet.productManager.loadTBodyData();
	};
	Page.prototype.refreshData = function(data) {
		this.pageNow = 1;
		this.loadTBodyData(data);
	};

	Page.prototype.refreshCurrentPageData = function(data) {
		this.loadTBodyData(data);
	};

	Page.prototype.initPageBtns = function(allPageSize) {
		var that = this;
		var htmlStr = '';
		var hasDots = false;
		htmlStr = '<a href="javascript:void(0)" title="上一页" class="page_a jsBtnA prev_page">&nbsp;<img src="'
				+ contextUrl
				+ '/static/user/img/prev.png"/></a><span id="pageBtns">';
		for (var i = 0; i < allPageSize; i++) {
			var pageNow = i + 1;
			var pe = allPageSize - that.pageNow;
			if (that.pageNow >= 5) {
				if (i < 2) {
					cBtnStr = '<a href="javascript:void(0)" class="page_a current_page jsBtnA " title="第'
							+ pageNow + '页">' + pageNow + '</a>';
					htmlStr = htmlStr + cBtnStr;
				}
			}
			if (pe > 3) {
				if (i == that.pageNow - 2 && i > 0) {
					htmlStr = htmlStr + "<span>...</span>";
				}
				if (i >= (that.pageNow - 2) && i <= (that.pageNow + 2)) {
					if (pageNow == that.pageNow) {
						cBtnStr = '<a href="javascript:void(0)" class="page_a current_page jsBtnA current" title="第'
								+ pageNow + '页">' + pageNow + '</a>';
					} else {
						cBtnStr = '<a href="javascript:void(0)" class="page_a current_page jsBtnA " title="第'
								+ pageNow + '页">' + pageNow + '</a>';
					}
					htmlStr = htmlStr + cBtnStr;
				} else {
					if (i == (that.pageNow + 2)) {
						htmlStr = htmlStr + "<span>...</span>";
					}
				}
			} else {
				if (i == (that.pageNow - 2)) {
					htmlStr = htmlStr + "<span>...</span>";
				}
				if (i > (that.pageNow - 3)) {
					if (pageNow == that.pageNow) {
						cBtnStr = '<a href="javascript:void(0)" class="page_a current_page jsBtnA current" title="第'
								+ pageNow + '页">' + pageNow + '</a>';
					} else {
						cBtnStr = '<a href="javascript:void(0)" class="page_a current_page jsBtnA " title="第'
								+ pageNow + '页">' + pageNow + '</a>';
					}
					htmlStr = htmlStr + cBtnStr;
				}
			}
		}
		htmlStr += '</span><a href="javascript:void(0)" title="下一页" class="page_a jsBtnA next_page"">&nbsp;<img src="'
				+ contextUrl + '/static/user/img/next.png"/></a>';
		htmlStr += '<input type="text" class="page_search_input"/>';
		htmlStr += '<a href="javascript:void(0)" class="page_a jsBtnA page_a_go">Go</a>';
		$("#" + this.pageBtnsContentId).html(htmlStr);

		if (allPageSize == 0) {
			$("#" + this.pageBtnsContentId).hide();
		} else {
			$("#" + this.pageBtnsContentId).show();
		}
		$("#" + this.pageBtnsContentId).find(".current_page").bind("click",
				function() {// 点击某一页
					$(this).siblings(".page_a").removeClass("current");
					$(this).addClass("current");
					var pageNow = $(this).text();
					var pageNowInt = parseInt(pageNow);
					if (isNaN(pageNowInt)) {
						return;
					}
					if (pageNowInt == that.pageNow) {// 如果点击的页面跟当前页相等，则返回
						return;
					}
					that.pageNow = pageNowInt;
					that.loadTBodyData();
				});

		$("#" + this.pageBtnsContentId).find(".prev_page").bind(
				"click",
				function() {// 上一页
					if (1 == that.pageNow) {
						return;
					}
					that.pageNow = that.pageNow - 1;
					that.loadTBodyData();
					$("#pageBtns .page_a").removeClass("current");
					$("#pageBtns .page_a").eq(that.pageNow - 1).addClass(
							"current");
				});

		$("#" + this.pageBtnsContentId).find(".next_page").bind(
				"click",
				function() {// 下一页
					if (that.allPageSize == that.pageNow) {
						return;
					}
					that.pageNow = that.pageNow + 1;
					that.loadTBodyData();
					$("#pageBtns .page_a").removeClass("current");
					$("#pageBtns .page_a").eq(that.pageNow - 1).addClass(
							"current");
				});

		$("#" + this.pageBtnsContentId).find(".page_a_go").bind(
				"click",
				function() {// 下一页
					var pageNow = $(this).prev().val();
					var pageNowInt = parseInt(pageNow);
					if (isNaN(pageNowInt)) {
//						PublicUtil.showTit("请输入数字", "no");
						return;
					}

					if (pageNowInt <= 0 || pageNowInt > that.allPageSize) {
//						PublicUtil.showTit("输入数字必须在 0 与  " + that.allPageSize
//								+ " 之间", "no");
						return;
					}

					if (pageNowInt == that.pageNow) {// 如果点击的页面跟当前页相等，则返回
						return;
					}
					that.pageNow = pageNowInt;
					that.loadTBodyData();
					$("#pageBtns .page_a").removeClass("current");
					$("#pageBtns .page_a").eq(that.pageNow - 1).addClass(
							"current");
				});
	};

	Page.prototype.loadTBodyData = function(data) {

		var target = null;
		if (typeof (this.targetContentId) == "string") {
			target = $("#" + this.targetContentId);
		} else {
			target = this.targetContentId;
		}
		var length = target.prev().find("th").length
				|| target.prev().find("td").length || 7;
		var loadDiv = $('<tr><td colspan="' + length
				+ '"><div class="loading"></div></td></tr>');
		target.css({
			"postion" : "relative"
		});
		target.html(loadDiv);
		var sendData = {
			"pageSize" : this.pageSize,
			"currentPage" : this.pageNow
		};

		var contentType = null;
		if (this.forAuth2 == true) {
			sendData = JSON.stringify(data);
		}

		if (data) {
			this.filterParam = data;
		}
		if (this.filterParam) {
			$.extend(sendData, this.filterParam);
		}
		var that = this;
		var url = this.url;
		var data = sendData;
		var callback = function(result) {
			if (typeof (that.allNumberAreaId) == "string") {
				$("#" + that.allNumberAreaId).text(result.totalRecords);

			} else {
				that.allNumberAreaId.text(result.totalRecords);
			}
			that.allPageSize = result.totalPages;
			var list = null;
			if (that.resultFilter) {
				list = that.resultFilter(result);
			} else {
				list = result.list;
			}

			// 把当前索引号添加进去
			for (var i = 0; i < list.length; i++) {
				var h_ = list[i];
				h_.DATAINDEX_ = (that.pageNow - 1) * that.pageSize + i + 1;
			}
			var html = "";
			if (that.tmplEvents) {
				html = $("#" + that.rowTemplateId).tmpl(list, that.tmplEvents);
			} else {
				html = $("#" + that.rowTemplateId).tmpl(list);
			}

			var bindTargets = html.find(".js_bind_data");
			if (typeof (that.targetContentId) == "string") {
				// if(html.length!=0){
				$("#" + that.targetContentId).html(html);
				// }
				bindTargets = $("#" + that.targetContentId).find(
						".js_bind_data");
			} else {
				that.targetContentId.html(html);
				bindTargets = that.targetContentId.find(".js_bind_data");
			}

			for (var i = 0; i < list.length; i++) {
				var h_ = $(bindTargets[i]);
				h_.data("personInfor", list[i]);
				h_.attr("html", i);
			}

			that.initPageBtns(result.totalPages);
			target.find(".load_icon").remove();
			if (list.length == 0) {
				var dom = target.get(0);
				var nodeName = dom.nodeName;

				nodeName = nodeName.toLowerCase();
				if (nodeName == "tbody") {
					var length = target.prev().find("th").length || target.prev().find("td").length || 7;
					target.append("<tr><td colspan='"
									+ length
									+ "' class='t_a_c'>暂无数据</td></tr>");
				} else {
					target.append("<div class='no_data_div'>暂无数据</div>");
				}
			}
			if (that.callback) {
				that.callback(html,result);
			}
		};
		if (this.forAuth2 == true) {
			$.ajax({
				url : this.url,
				data : sendData,
				dataType : "json",
				type : "post",
				contentType : "application/json",
				success : callback
			});
		} else {
			Utils.ajaxLoadData(url, data, callback);
		}
	};
	return Page;
})();

Utils.localStorage = {};

Utils.localStorage.init = function(){
	if(window.localStorage){
		Utils.localStorage.obj =  window.localStorage;
	}else{
		Utils.localStorage.obj = null;
	}
};

Utils.localStorage.add = function(name,value){
	if(Utils.localStorage.obj){
		try{
			Utils.localStorage.obj.setItem(name,value);//如果超过本地存储的最大限度，则去掉当前存储
		}catch(QuotaExceededError){
			Utils.localStorage.remove(name);
		}
		
	}
};


Utils.localStorage.get = function(name){
	if(Utils.localStorage.obj){
		return Utils.localStorage.obj.getItem(name);
	}
};

Utils.localStorage.remove = function(name){
	if(Utils.localStorage.obj){
		Utils.localStorage.obj.removeItem(name);
	}
};

Utils.getStyle = function(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj, false)[attr];
	}
};

Utils.move = function(obj, json, fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json){
			var iCur=0;
			if(attr=='opacity'){
				iCur=parseInt(parseFloat(Utils.getStyle(obj, attr)*100));
			}
			else{
				iCur=parseInt(Utils.getStyle(obj, attr));
		    }
		    var iSpeed=(json[attr]-iCur)/3;
		    if(iSpeed>0){
			     iSpeed=Math.ceil(iSpeed);
		    }
		    else{
			    iSpeed=Math.floor(iSpeed);
		    }
			if(iCur!=json[attr]){
				bStop=false;
			}
		    if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		if(bStop==true){
			clearInterval(obj.timer);
			if(fn){fn();}
		}
	},30);
};

/**
 * 页面
 */
Utils.serializeToObj = function(contentObj, validateNameStr){
	validateNameStr = validateNameStr || "";
	validateNameArr = validateNameStr.split(",");
	Utils.serializeToObj.validate = true;
	if(!contentObj){
		return; 
	}
	var obj = {};
	var inputs = contentObj.find("input");
	for(var i=0;i<inputs.length;i++){
		var input = $(inputs[i]);
		var name = input.attr("name");
		if(!name){
			continue;
		}
		var value = input.val();
		obj[name] = value;
		if(validateNameStr.indexOf(name)>=0){
			for(var j=0; j<validateNameArr.length; j++){
				if(name==validateNameArr[j]){
					if(!Utils.validate(input, value)){
						Utils.serializeToObj.validate = false;
					}
				}
			}
		}
	}
	
	var selects = contentObj.find("select");
	for(var i=0;i<selects.length;i++){
		var select = $(selects[i]);
		var name = select.attr("name");
		if(!name){
			continue;
		}
		var value = select.val();
		value = value=="请选择"? "":value;
		obj[name] = value;
		if(validateNameStr.indexOf(name)>=0){
			for(var j=0; j<validateNameArr.length; j++){
				if(name==validateNameArr[j]){
					if(!Utils.validate(select, value)){
						Utils.serializeToObj.validate = false;
					}
				}
			}
		}
	}
	
	var textareas = contentObj.find("textarea");
	for(var i=0;i<textareas.length;i++){
		var textarea = $(textareas[i]);
		var name = textarea.attr("name");
		if(!name){
			continue;
		}
		var value = textarea.val();
		obj[name] = value;
		if(validateNameStr.indexOf(name)>=0){
			for(var j=0; j<validateNameArr.length; j++){
				if(name==validateNameArr[j]){
					if(!Utils.validate(textarea, value)){
						Utils.serializeToObj.validate = false;
					}
				}
			}
		}
	}
	return obj;
};

Utils.clone=function(myObj){
  if(typeof(myObj) != 'object') return myObj;
  if(myObj == null) return myObj;
  if(myObj instanceof Array && myObj.length==0){
	  return [];
  }
  var myNewObj = new Object();
  if(myObj instanceof Array){
	  myNewObj = [];
  }
 
  
  for(var i in myObj)
    myNewObj[i] = Utils.clone(myObj[i]);
  
  return myNewObj;
};

Utils.initTab = function(){
	var nav_left = $("#tit2 a");
	var nav_bg = document.getElementById("bg1");
	for (var i = 0; i < nav_left.length; i++) {
		nav_left[i].index = i;
		nav_left[i].onmouseover = function() {
			Utils.move(nav_bg, {left : (this.index * 132)});
		};
		nav_left[i].onmouseout = function() {
			var index = $("#tit2 a.this").parent("li").index();
			Utils.move(nav_bg, {left : (index * 132)});
		};
	}
};

Utils.unShow = function(o){
	$(o).parents(".part").hide();
};


Utils.uploadFileTypes = "*.psd;*.excel;*.word;*.visio;*.xmind;*.rp;*.pdf;*.doc;*.docx;*.xls;*.xlsx;*.zip;*.rar;*.ppt;*.pptx;*.txt;";
Utils.uploadImageypes = "*.jpg;*.png;*.gif;*.jpeg;";
Utils.setFileTypeClass = function(type){
	var index = type.indexOf(".");
	if(index!=-1){
		type = type.substring(index+1);
	}
	if(type=="xlsx" || type=="xls"){
		return "wendangicon-x";
	}else if(type=="doc" || type=="docx"){
		return "wendangicon-w";
	}else if(type=="pdf"){
		return "wendangicon-pdf";
	}else if(type=="ppt" || type=="pptx"){
		return "wendangicon-p";
	}else if(type=="zip"){
		return "wendangicon-z";
	}else if(type=="rar"){
		return "wendangicon-z";
	}else if(type=="txt"){
		return "wendangicon-t";
	}else if(type=="psd"){
		return "wendangicon-psd";
	}else if(type=="rp"){
		return "wendangicon-rp";
	}else if(type=="xmind"){
		return "wendangicon-xmind";
	}else if(type=="visio"){
		return "wendangicon-visio";
	}
};
//不能预览的文件类型数组
Utils.canNotViewTypes = ["xlsx","xls","zip","rar","psd","rp","xmind","visio"];
//判断该类型是否在不能预览的列表中
Utils.isInNotCanView = function(typeClass){
	var types = Utils.canNotViewTypes;
	for(var i=0,l=types.length;i<l;i++){
		var clazz = Utils.setFileTypeClass(types[i]);
		if(clazz===typeClass){
			return true;
		}
	}
	return false;
};

Utils.imageLoadError = function(obj,contextUrl_){
	if(!contextUrl_){
		contextUrl_ = contextUrl;
	}
	if(!contextUrl){
		contextUrl = "/smarti";
	}
	$(obj).attr("src",contextUrl_+"/static/common/img/errordefaultimage.png");
};


//初始化上传附件
//<div class="sns_upload_class" upload-type='file,image' result-name=""
//target-content-id=""></div>
Utils.upload = {};
Utils.upload.uploadClassName = "sns_upload_class";
Utils.upload.init = function(content) {
	var url = contextUrl + "/getFileServerUrl.json";
	var data = { ticket: Utils.getValueInPathByName("ticket")|| "" };
	var callback = function(ret){
		if(ret && ret.result){
			Utils.imageContextUrl = ret.filectx;
			Utils.uploadFileServer = ret.uploadfilectx;
			Utils.uploadImageServer = ret.imageUploadUrl+"?isScaleImge=true";
			Utils.cropImageServer = ret.curserverctx+"&imageType=topic";
			Utils.fileViewServer = ret.filectx;
			
			content = content || document;
			var targets = $(content).find("." + Utils.upload.uploadClassName);
			for (var i = 0; i < targets.length; i++) {
				var t = $(targets[i]);
				var typeStr = t.attr("upload-type");
				var types = typeStr.split(",");
				var date = new Date();
				var time = date.getTime();
				var fileBtnId = "fileBtn" + time;
				var imageBtnId = "imageBtn" + time;
				for (var k = 0; k < types.length; k++) {
					var type = types[k];
					if (type == "file") {
						var fileBtn = $("<div class='upload_accessory_btn'><div id='"
								+ fileBtnId + "'></div><div>");

						fileBtn.attr("title", "上传附件");
						t.append(fileBtn);

					} else if (type == "image") {
						var imageBtn = $("<div class='upload_image_btn'><div id='"
								+ imageBtnId + "'></div><div>");
						imageBtn.attr("title", "上传图片");
						t.append(imageBtn);
					}
				}

				var content = null;
				var contentId = t.attr("target-content-id");
				var imgBtnWidth = t.attr("img-btn-w");
				var imgBtnHeight = t.attr("img-btn-h");
				if (!contentId) {
					content = $("<div></div>");
					contentId = "context" + time;
					t.prepend(content);
				} else {
					content = $("#" + contentId);
				}
				content.attr("id", contentId);

				// 是否支持多个图片上传
				var multiple = t.attr("upload-multiple");
				if (multiple == false) {
					// content.find(".fi_adjun").remove();
				}

				var imgCallback = t.attr("img-upload-success");
				var fileCallback = t.attr("file-upload-success");

				var uploadOpt = {
					"uploadTypes" : typeStr,
					"fileBtnId" : fileBtnId,
					"imgBtnId" : imageBtnId,
					"fileContentId" : contentId,
					"imgContentId" : contentId,
					"imgBtnWidth" : imgBtnWidth,
					"imgBtnHeight" : imgBtnHeight,
					"multiple" : multiple,
					"imageUploadSuccess" : window[imgCallback],
					"fileUploadSuccess" : window[fileCallback]
				};
				var upload = new Upload(uploadOpt);

				var resultName = t.attr("result-name");
				window[resultName] = upload;

				t.removeClass(Utils.upload.uploadClassName);
			}
		}
	};
	Utils.ajaxLoadData(url, data, callback);
};


Utils.previewImage = function(file,successCallback) {
	var _this = $(file);
	var targetContent = {};
	if(_this.prev().length>0){
		targetContent = _this.prev();
		targetContent.attr("relation","prev");
	}else if(_this.next().length>0){
		targetContent = _this.next();
		targetContent.attr("relation","next");
	}else{
		targetContent = _this.parent();
		targetContent.attr("relation","parent");
	}
	
	var preview = _this.siblings("[preview-container]");
	preview = (!preview || preview.length==0)? _this.parent().siblings("[preview-container]"):preview;
	var pathContainer = _this.siblings("[file-path-container]");
	var f = document.createElement("form");
	f.className="d-n";
	document.body.appendChild(f);
	var fileCopy = file.cloneNode(true);
	f.appendChild(file);
	f.method = "post";
	f.action = uploadImageServer;
	f.enctype = "multipart/form-data";
	var option = {
		success: function (ret) {
			if(ret.data){
				pathContainer.val(ret.data[0].storagePath);
				
				var MAXWIDTH = 100;
				var MAXHEIGHT = 100;
				var div = preview[0];
				if (file.files && file.files[0]) {
					div.innerHTML = '<img>';
					var img = preview.find("img")[0];
					img.onload = function() {
						var rect = Utils.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
						img.width = rect.width;
						img.height = rect.height;
						img.style.marginLeft = rect.left + 'px';
						img.style.marginTop = rect.top + 'px';
					};
					var reader = new FileReader();
					reader.onload = function(evt) {
						img.src = evt.target.result;
					};
					reader.readAsDataURL(file.files[0]);
					
					if(successCallback){
						successCallback();
					}
					
				} else {
					var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
					file.select();
					var src = document.selection.createRange().text;
					div.innerHTML = '<img>';
					var img = preview.find("img")[0];
					img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
					var rect = Utils.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
					status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
					div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;margin-left:" + rect.left + "px;" + sFilter + src + "\"'></div>";
				}
			}
        }
	};
	$(f).ajaxSubmit(option);
	
	if(targetContent.attr("relation")=="prev"){
		$(fileCopy).insertAfter(targetContent);
	}else if(targetContent.attr("relation")=="next"){
		$(fileCopy).insertBefore(targetContent);
	}else if(targetContent.attr("relation")=="parent"){
		targetContent.append($(fileCopy));
	}
};

Utils.clacImgZoomParam = function(maxWidth, maxHeight, width, height) {
	var param = {
		top: 0,
		left: 0,
		width: width,
		height: height
	};
	if (width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;
		if (rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
};

Utils.getRootPath = function(){
	var rootPath = Utils.rootPath;
	if(!rootPath){
		var strFullPath = window.document.location.href;
		var strPath = window.document.location.pathname;
		var pos = strFullPath.indexOf(strPath);
		var prePath = strFullPath.substring(0,pos);
		var postPath = strPath.substring(0,strPath.substr(1).indexOf('/')+1);
		rootPath = (prePath+postPath);
		Utils.rootPath = rootPath;
	}
	return rootPath;
};

Utils.close = function(){
	$(".js_close").bind("click",function(){
		$(".js_close_win").hide();
	});
};

/**
 * 验证不通过时加上红框提示
 * target 目标容器
 * flag 判断值
 * flagReverse 对flag取反
 */
Utils.validate = function(target, flag, flagReverse){
	target = target || {};
	flagReverse = flagReverse || false;
	var result = true;
	if(flagReverse? !flag:flag){
		target.removeClass("validate_err");
	}else{
		var tip = Utils.tipContent;
		if(tip){
			Utils.showTit(Utils.tipContent, Utils.SHOWTYPES.NO);
			Utils.tipContent = "";
		}
		target.addClass("validate_err");
		Utils.immediately(target,function(){
			$this = $(this);
			var mode = $(this).attr("validate-mode");
			var regStr = Utils.validate.regMap[mode];
			if(regStr){
				var reg = new RegExp(regStr);
				if(!reg.test($this.val())){
					Utils.errorTip($this, Utils.validate.errorMsg[mode]);
				}else{
					$this.siblings(".error_msg").remove();
				}
			}
			$this.removeClass("validate_err");
		});
		result = false;
	}
	return result;
};
Utils.validate.regMap = {
	"num" : "^[0-9]*$",
	"zipcode" : "^[0-9][0-9]{5}$"
};
Utils.validate.errorMsg = {
	"num" : "请输入数字",
	"zipcode" : "请输入正确的邮政编码"
};

/**
 * Input框内容变化触发事件
 * target 目标容器
 * callBack 内容变化后触发的回调函数
 */
Utils.immediately = function(target, callBack){
	target = target || {};
	callBack = callBack || $.noop;
	if ("\v" == "v") {
		target.each(function(k,v){
			target[k].onpropertychange = callBack;
		});
	}else{
		target.each(function(k,v){
			target[k].addEventListener("input", callBack, false);
		});
	}
};

/**
 * 默认提示回调（1、成功提示信息需要预先赋值给Utils.tipContent；2、错误提示内容为后台抛出的异常信息）
 */
Utils.tipContent = "";			//提示内容
Utils.mySuccessCallback = null; //成功回调函数
Utils.myErrorCallback = null;   //失败回调函数
Utils.jumpUrlAfterTime = 2*1000;//成功后多少秒跳转到指定Url
Utils.jumpUrl = "";				//成功后跳转到指定Url
Utils.callBack = function(ret){
	var result = ret.result;
	var errorMsg = ret.errorMsg;
	if(result || !errorMsg){
		Utils.showTit(Utils.tipContent, Utils.SHOWTYPES.YES);
		Utils.tipContent = "";
		if(Utils.mySuccessCallback){
			Utils.mySuccessCallback(ret);
			Utils.mySuccessCallback = null;
		}
		if(Utils.jumpUrl){
			setTimeout(function(){
				window.location.href = Utils.jumpUrl;
			}, Utils.jumpUrlAfterTime);
		}
	}else{
		Utils.showTit(errorMsg, Utils.SHOWTYPES.NO);
		if(Utils.myErrorCallback){
			Utils.myErrorCallback(ret);
			Utils.myErrorCallback = null;
		}
	}
};

/**
 * 获取新上传文件、预览图片路径，多个文件以逗号分隔
 * @param source 新上传数据源
 * @param previewSource 预览数据源
 */
Utils.getUploadFilePath = function(source, previewSource){
	source = source || {};
	previewSource = previewSource || {};
	var files = source["files"];
	var images = source["images"];
	var filePath = "";
	//获取预览图片路径
	for(var i=0; i<previewSource.length; i++){
		var shortPath = previewSource[i].shortPath;
		shortPath = shortPath.replace(Utils.imageContextUrl,"");
		if(filePath) filePath+=",";
		filePath += shortPath;
	}
	//获取新上传的文件、图片路径
	var dealFun = function(arr){
		for (var i = 0; i < arr.length; i++) {
			if(filePath){
				filePath += ",";
			}
			filePath += arr[i].shortPath;
		}
	};
	dealFun(files);
	dealFun(images);
	return filePath;
};


/*************Session缓存Start***************/
Utils.session = {};
//保存Session
Utils.session.set = function(key, value){
	window.sessionStorage[key] = JSON.stringify(value);
};
//获取Session
Utils.session.get = function(key){
	var vStr = window.sessionStorage.getItem(key);
	return JSON.parse(vStr);
};
//移除Session
Utils.session.del = function(key){
	window.sessionStorage.removeItem(key);
};
/*************Session缓存End***************/


contextUrl = Utils.getRootPath();
$(function(){
	Utils.triggerEventByEnterKey();
	Utils.initTab();
	Utils.localStorage.init();
	Utils.close();
});