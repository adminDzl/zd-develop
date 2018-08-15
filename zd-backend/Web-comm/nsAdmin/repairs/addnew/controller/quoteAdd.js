/**
 * 新建报事
 */
(function(){
	'use strict'
	app.controller('QuoteAddCtrl',function($scope,$modal,$state,HttpUtils,ModalCtrl,modalCode,$element,$location){
		
		$scope.form={};
		$scope.site={};

		var ch = undefined; //二级分类
		
		function initAdd(){
			var sendData = {serviceId:$scope.form.serviceId};
	 		HttpUtils.post("/pnc/orderchief/back/initAdd",{},function (data) {
	 			$scope.site.sortDataList = data.data.sortData;
	 			$scope.site.areaList = data.data.areaList;
	 		});
		}
		initAdd();
		
		$scope.choose = function (item,id) {
	    	if(ch){
	        	if(ch == item){
	            	ch.isChoose = !ch.isChoose;
	            }else{
	            	ch.isChoose = false;
	                ch = item;
	                ch.isChoose = true;
	            }
	        }else{
	        	ch = item;
	        	ch.isChoose = true;
	        }
	    	$scope.form.sortChiefId = id; //一级分类id
	    };
	    
	    
	    //附件上传
	    $scope.initFiles = function (){};
	    var attaFiletList = [];
	    $scope.attaFile = function(datas){
			attaFiletList = datas;
	    };
	    function getUrlsToDatas(urls) {
            var datas = [];
            angular.forEach(urls,function (v) {
                datas.push({bigImgUrl:v.attachmentUrl});
            });
            return datas;
        };
	    
	  //保存
	    $scope.addSave = function(){
	    	console.log($scope.form);
	    	//检测数据
			if(!ch || !ch.sortSubId){
				ModalCtrl.show('提示','请选择报事类型！',modalCode.warning,function (){}); 	
				return;
			}
			$scope.form.sortSubId = ch.sortSubId;
			//数据
			var sendData = angular.copy($scope.form);
			var imgPath=$("input[name='foodImg']").val();
			sendData.attachmentURL = JSON.stringify([imgPath]);
			console.log(sendData);
			HttpUtils.post('/pnc/orderchief/back/addSave',sendData,function (data) {
				ModalCtrl.show('提示','新增成功',modalCode.success);
				if($location.search().address){
					//TODO 返回ID给呼叫中心
					sendIdToCc(data.orderEntity.id,$location.search().address);
				}else{
					$state.go('app.totalorder_manage');
				}
			});
	    };

		function sendIdToCc(id,address) {
			var ifr = document.createElement('iframe');
			ifr.src = address+'?id='+id+'&t='+new Date().getTime();
			ifr.style.display = 'none';
			document.body.appendChild(ifr);
		}
	    
	});
})()




















