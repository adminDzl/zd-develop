//新增图片介绍
app.controller('AddImgIntroduceCtrl',function (site,$rootScope,modalCode,Project,ModalCtrl,$modalInstance) {
	var mm = this;
	mm.dataImg = angular.copy(site);
	mm.independenceTypes=[{'id':'0','text':'独立块'},{'id':'1','text':'内联块'}];
	
	var a = 0;
	if(mm.dataImg.independenceType){
		a = mm.dataImg.independenceType;
	}	
	mm.dataImg.indeTypeData = mm.independenceTypes[a];
	
	mm.valiTypes=[{'id':'0','text':'生效'},{'id':'1','text':'不生效'}];
	var b = 0;
	if(mm.dataImg.valiType){
		b = mm.dataImg.valiType;
	}
	mm.dataImg.valiTypeData = mm.valiTypes[b];
	console.log(mm.dataImg);
	if(mm.dataImg.attachmentUrl){
		mm.initIntorduceImgs = [{
			src:(mm.dataImg.attachmentPrefix?mm.dataImg.attachmentPrefix:Project.rootPath())+"/" + mm.dataImg.attachmentUrl,
					name:"",
					type:"",
					size:""
					}];
	}
	
	mm.title = "新增图片介绍";
	if(mm.dataImg.code == 2){
		mm.title = "编辑图片介绍";
	}
	
	//分类图片上传回调
	mm.intorduceImgAction = function(datas){
		mm.dataImg.attachmentUrl = datas[0].attachmentUrl;
		mm.dataImg.newAttachmentUrl = datas[0].attachmentUrl;
	}
	
	mm.close = function () {
		$modalInstance.close();
	}

	mm.addSave = function () {
		mm.dataImg.valiType = mm.dataImg.valiTypeData.id;
		mm.dataImg.valiTypeShow = mm.dataImg.valiTypeData.text;
		
		mm.dataImg.independenceType = mm.dataImg.indeTypeData.id;
		mm.dataImg.independenceTypeShow = mm.dataImg.indeTypeData.text;	
		
		if(!mm.dataImg.orderNo){
			ModalCtrl.show('提示','排序不能为空！',modalCode.success);
			return;
		}			
		
		var storeData = angular.copy(mm.dataImg);
		delete storeData.valiTypeData;
		delete storeData.indeTypeData;	
		
		site.refresh(storeData);
		if(mm.dataImg.code == 1){
			ModalCtrl.show('提示','新增成功',modalCode.success);
		}else if(mm.dataImg.code == 2){
			ModalCtrl.show('提示','修改成功！',modalCode.success);
		}
		console.log(mm.dataImg);
		$modalInstance.close();		
	}
	
	mm.cancel = function(){
		$modalInstance.close();
	}
});