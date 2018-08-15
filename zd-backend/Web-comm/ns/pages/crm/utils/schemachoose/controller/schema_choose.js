/**
 * Created by longHuang on 2016/7/21.
 */
(function () {
    'use strict'

    app.factory('schemaChoose',function ($modal) {
        return {
            choose:choose
        };
        function choose(sendback,paramMap) {
            var site = {
                paramMap:paramMap,
                callback:function (data) {
                    sendback(data);
                }
            };
            chooseHtml(site);
        };

        function chooseHtml(site,m) {
        	var settings = {
                templateUrl:'../admin/pages/crm/utils/schemachoose/schema_choose.html?version='+new Date().getTime(),
                controller:'SchemaChooseCtrl',
                size:'sm',
                backdrop:'static',
                resolve:{
                    site:function () {
                        return site;
                    }
                }
            }
        	if(site.paramMap&&site.paramMap.templateUrl){
        		settings.templateUrl = site.paramMap.templateUrl;
        	}
            $modal.open(settings);
        }
    });
    app.controller('SchemaChooseCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {
    	
    	$scope.title = '选择目标层级';
    	$scope.sear = {};
        

		$scope.selected={};
		$scope.schemaTree={};
		$scope.schemaList=[];
		initTree()
        function initTree(data) {
        		var sendData={};
        		/*if(site.paramMap.sendData!=null){
        			sendData=site.paramMap.sendData;
        		}*/
        		
        		HttpUtils.get('/crm/room/schema/list'/*'/authority/resource/grid'*/,sendData,function (response) {
    			 	var schemaList = response.data;
    				$.each(schemaList,function(i,e){
    					e.expanded=true;
    					$.each(e.children,function(i,ee){
    						ee.expanded=true;
    					});
    				});
    			 	$scope.schemaList = schemaList;
        		});
        }
	    $scope.onNodeSelect = function(schema) {
	    	 $scope.selected=schema;
	    }
        
        $scope.close = function () {
            $modalInstance.close();
        };
        //回调函数
        $scope.commit = function () {
        	if($.trim($scope.selected.id)==''){
				ModalCtrl.show('提示','请指定导入到的层级！',modalCode.warning);
        		return;
        	}
        	site.callback($scope.selected);
            $modalInstance.close();
        };

       
    });
})();