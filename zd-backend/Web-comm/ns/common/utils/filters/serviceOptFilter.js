/**
 *zhaomin 此文件暂时无用
 */
(function(){
	'use strict'
	
	app.filter('serviceOptFilter',function($stateParams,$sce){
		return function(rowData,setPrimaryUser){
			var orderType = $stateParams.orderType;
			if(orderType == 5 && rowData.orderStatus <= 4){ // 我协助的
				return $sce.trustAsHtml("<ul class='ul-n'><li><a href='#' class='a-link' ng-click='viewRecord(\""+rowData.id+"\",1);'>备注</a></li></ul>");
			}
			
			if(rowData.orderStatus == 1){
				return  $sce.trustAsHtml("<ul class='ul-n'><li><a class='a-link' ng-click='function(){"+setPrimaryUser+"}'>分配</a></li><li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\",7);'>取消服务单</a></li></ul>");
			}
			else if(rowData.orderStatus == 2){
				var opt = "";
				opt += "<ul class='ul-n'><li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\","+rowData.orderStatus+");'>现场确认</a></li><li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\",7);'>取消服务单</a></li>";
				if(orderType == 2){
					opt += "<li><a href='#' class='a-link' ng-click='setPrimaryUser(\""+rowData.id+"\");'>修改负责人</a></li>";
				}
				opt += "</ul>";
				return $sce.trustAsHtml(opt);				
			}
			else if(rowData.orderStatus == 3 && orderType != 5){
				return  $sce.trustAsHtml(" <ul class='ul-n'><li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\","+rowData.orderStatus+");'>费用确认</a></li><li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\",7);'>取消服务单</a></li></ul>");
			}	
			else if(rowData.orderStatus == 4){
				var opt = "";

				// orderType:2,全部订单，权限最高，除了请求协助，其余每个操作权限都有
				if(orderType == 2){
					opt += "<ul class='ul-n'><li><a href='#' class='a-link' ng-click='viewRecord(\""+rowData.id+"\",1);'>备注</a></li>";
					opt += " <li><a href='#' class='a-link' ng-click='modifyAmount(\""+rowData.id+"\");'>费用调整</a></li>" +
					" <li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\","+rowData.orderStatus+");'>维修成功</a></li>";
					
					if(rowData.hasAppointAssistAuth == true){
						opt += "<li><a href='#' class='a-link' ng-click='set_assistPerson(\""+rowData.id+"\");'>指派协助人</a></li>";
					}
					opt += "</ul>";
				}
				
				if(orderType == 1){ // 分配给我
					opt += "<ul class='ul-n'><li><a href='#' class='a-link' ng-click='viewRecord(\""+rowData.id+"\",1,1);'>备注</a></li><li><a href='#' class='a-link' ng-click='viewRecord(\""+rowData.id+"\",1,0);'>请求协助</a></li>" +
					"<li><a href='#' class='a-link' ng-click='modifyAmount(\""+rowData.id+"\");'>费用调整</a></li>" +
					"<li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\","+rowData.orderStatus+");'>维修成功</a></li>";
					opt += "</ul>";
				}
				
				if(orderType == 6){ // 请求协助的报修单
					opt += "<ul class='ul-n'><li><a href='#' class='a-link' ng-click='viewRecord(\""+rowData.id+"\",1);'>备注</a></li><li><a href='#' class='a-link' ng-click='set_assistPerson(\""+rowData.id+"\");'>指派协助人</a></li>" +
					"<li><a href='#' class='a-link' ng-click='modifyAmount(\""+rowData.id+"\");'>费用调整</a></li>" +
					"<li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\","+rowData.orderStatus+");'>维修成功</a></li>";
					opt += "</ul>";
				}
				
				return $sce.trustAsHtml(opt);
			}	
			else if((rowData.orderStatus == 5 || rowData.orderStatus == 6) && orderType == 4){ // 仅待回访订单才有该操作
				if(rowData.visitContent == ''){
					return  $sce.trustAsHtml("<ul class='ul-n'><li><a href='#' class='a-link' ng-click='processOrder(\""+rowData.id+"\","+rowData.orderStatus+");'>回访信息录入</a></li></ul>");
				}else{
					return  $sce.trustAsHtml("<ul class='ul-n'><li><a href='#' class='a-link' ng-click='viewVisitContent(\""+rowData.id+"\");'>回访信息查看</a></li></ul>");
				}
			}	
			return "";
		}
	})
})()