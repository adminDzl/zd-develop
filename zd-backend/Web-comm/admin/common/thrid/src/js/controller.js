//接口
var path = "/cscmg";
var Utils =[];
var INTERFACE = {
	//项目管理列表
	p_project_list:path+"/project/list.do",
	//项目管理列表新增
	p_project_add:path+"/project/addSave.do",
	//项目管理列表修改
	p_project_update:path+"/project/updateSave.do",
	//版本管理列表
	p_version_list:path+"/version/list.do",
	//版本管理列表新增
	p_version_add:path+"/version/addSave.do",
	//版本管理列表修改
	p_version_update:path+"/version/updateSave.do",
	//模块管理列表
	p_module_list:path+"/module/list.do",
	//版本管理列表新增
	p_module_add:path+"/module/addSave.do",
	//版本管理列表修改
	p_module_update:path+"/module/updateSave.do",
	//数据字典管理列表
	p_sysdatadictionary_list:path+"/sysdatadictionary/list.do",
	//数据字典管理类别
	p_sysdatadictionary_type:path+"/sysdatadictionary/categoriesList.do",
	//数据字典管理列表新增
	p_sysdatadictionary_add:path+"/sysdatadictionary/addSave.do",
	//数据字典管理列表修改
	p_sysdatadictionary_update:path+"/sysdatadictionary/updateSave.do",
}
Utils.colResizable = function(angular,ele){
	if(!ele) ele = ".issueTable";
	setTimeout(function(){
		angular.element(ele).colResizable({
			liveDrag:true, 
			gripInnerHtml:"<div class='grip'></div>", 
			draggingClass:"dragging", 
	     resizeMode:'fit'
	 });
	},1000)};