//新增文件介绍
app.controller('AddTextIntroduceCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
	var mm = this;
	mm.dataNew = angular.copy(site);
	mm.independenceTypes=[{'id':'0','text':'独立块'},{'id':'1','text':'内联块'}];
	var a = 0;
	if(mm.dataNew.independenceType){
		a = mm.dataNew.independenceType;
	}
	mm.dataNew.indeTypeData = mm.independenceTypes[a];
	
	mm.valiTypes=[{'id':'0','text':'生效'},{'id':'1','text':'不生效'}];
	
	var b = 0;
	if(mm.dataNew.valiType){
		b = mm.dataNew.valiType;
	}	
	mm.dataNew.valiTypeData = mm.valiTypes[b];
	
	mm.title = "新增文字介绍";
	if(mm.dataNew.code == 2){
		mm.title = "编辑文字介绍";
	}
	mm.close = function () {
		$modalInstance.close();
	}

	mm.addSave = function () {
		mm.dataNew.valiType = mm.dataNew.valiTypeData.id;
		mm.dataNew.valiTypeShow = mm.dataNew.valiTypeData.text;
		
		mm.dataNew.independenceType = mm.dataNew.indeTypeData.id;
		mm.dataNew.independenceTypeShow = mm.dataNew.indeTypeData.text;
		
		if(!mm.dataNew.content){
			ModalCtrl.show('提示','内容不能为空！',modalCode.success);
			return;
		}
		
		if(!mm.dataNew.orderNo){
			ModalCtrl.show('提示','排序不能为空！',modalCode.success);
			return;
		}		
		
		var storeData = angular.copy(mm.dataNew);
		delete storeData.valiTypeData;
		delete storeData.indeTypeData;	
		
		site.refresh(storeData);
		if(mm.dataNew.code == 1){
			ModalCtrl.show('提示','新增成功',modalCode.success);
		}else if(mm.dataNew.code == 2){
			ModalCtrl.show('提示','修改成功！',modalCode.success);
		}
		console.log(mm.dataNew);
		$modalInstance.close();
	}
	
	mm.cancel = function(){
		$modalInstance.close();
	}
});