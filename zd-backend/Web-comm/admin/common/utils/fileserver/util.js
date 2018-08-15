var Utils = Utils || {};





Utils.fileServerUploadUrl=localStorage.fileServerUploadUrl;
Utils.fileServerViewUrl=localStorage.fileServerViewUrl;


/**
 * 上传文件
 * @param file 文件上传控件
 */
Utils.fileUpload = function(file,successCallback) {
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
	f.action = Utils.fileServerUploadUrl;
	f.enctype = "multipart/form-data";
	var option = {
		success: function (ret) {
			if(ret.data){
				pathContainer.val(ret.data[0].storagePath);
				pathContainer.attr("fieldName",ret.data[0].fieldName);
				pathContainer.attr("pdfStoragePath",ret.data[0].pdfStoragePath);
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

/**
 * 上传图片，并在上传完成后预览
 * @param file 文件上传控件
 */
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
	f.action = Utils.fileServerUploadUrl;
	f.enctype = "multipart/form-data";
	var option = {
		success: function (ret) {
			if(ret.data){
				pathContainer.val(ret.data[0].storagePath);
				pathContainer.attr("fieldName",ret.data[0].fieldName);
				pathContainer.attr("viewStoragePath",ret.data[0].pdfStoragePath);
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







