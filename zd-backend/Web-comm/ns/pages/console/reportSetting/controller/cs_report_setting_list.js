(function() {
	 'use strict';
	 
	 app.controller('TTableGrid',Grid);
	 
	 var editCtrl = "TTableEdit";
	 app.controller(editCtrl,DCtrl);

	 var base = '/console/reportsettings/';
	 var getData = '/console/report/';
	 var editUrl = '../admin/pages/console/reportSetting/settings_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 var currKeys = undefined;
		 var parentKeys = undefined;
		 var searchChild = false;

		 $scope.url = base + 'list';
		 $scope.childUrl = base + 'findListByParentName';

	     //配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
             if (searchChild) {
                 getGridData(1);
                 return;
             }
             getGridData();
	 	 });
	     
	     //请求后台数据
	     function getGridData(code){
	     	if (code != null) {
                var sendData = {
                    parentName:parentKeys,
                    pageNo: $scope.paginationConf.currentPage,
                    pageSize: $scope.paginationConf.pageSize
                };
                HttpUtils.get($scope.childUrl , sendData ,function (data) {
                    $scope.paginationConf.totalItems =data.data.page.total;
                    $scope.rows = data.data.page.rows;
                });
                return;
			}
	 		var sendData = {
	 			searchKeys:currKeys,
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		};
	 		HttpUtils.get($scope.url , sendData ,function (data) {
	 			$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.rows = data.data.page.rows;
	 		});
	 	 }  
	     
	     //新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.get(base + "init",sendData,function (data) {
		    	var site = {};
		    	site.data= data;
	 			site.title = 'ADD';
	 			site.code = 1;
	 			site.url =  editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				if (searchChild) {
	 					getGridData(1);
	 					return;
					}
	 				getGridData();
	 			};
	 			open(site,$modal);
		    });
	 	 };
	     //修改
	     $scope.update = function (id) {
	 		var sendData = {id:id};
	 		HttpUtils.get(base + "init",sendData,function (data) {
	 			var site = {};
	 			site.data = data;
	 			site.title = '修改';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
                    if (searchChild) {
                        getGridData(1);
                        return;
                    }
	 				getGridData();
	 			};
                // HttpUtils.get(base + "findAllParentItems", {}, function (data) {
                //     site.allParentItems = data.data;
                // });
	 			open(site,$modal);
	 		});
	 	 };
	     
	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
             searchChild = false;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 };
	     //搜索子项
		 $scope.searchChild = function (keys,e) {
             if(e && e.keyCode !== 13)
                 return
             searchChild = true;
             parentKeys = keys;
             $scope.paginationConf.currentPage == 1 ? getGridData(1) : $scope.paginationConf.currentPage = 1;
         };
	     //删除
	     $scope.deleteById = function(id) {
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(base +  'deleteById',sendData,function (data) {
                    if (searchChild) {
                        getGridData(1);
                        return;
                    }else {
	 					getGridData();
					}
	 					ModalCtrl.show('提示','删除成功！',modalCode.success);
	 				}
	 			);
	 		});
	 	 }
	    
	 }
     //打开页面
     function open(site,$modal) {
    	$modal.open({
    		size: 'lg',
 			templateUrl:site.url+'?v='+new Date().getTime(),
 			controller: site.ctrl,
 			controllerAs:'mm',
 			resolve:{
 				site:function () {
 					return site;
 				}
 			}
 		});
 	 }
    
	function DCtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {

		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		mm.site.yesOrNo = [{'value':'Y','name':'是'},{'value':'N','name':'否'}];
		mm.site.dOrMorY = [{'value':'D','name':'按日统计'},{'value':'M','name':'按月统计'},{'value':'Y', 'name':'按年统计'}];
		mm.site.isDefaultDis = [{'value':'Y','name':'显示'},{'value':'N','name':'不显示'}];
		mm.site.allTypes = [{'value':'pie','name':'饼图'},{'value':'bar','name':'条形图'}];
        mm.ecConfig = {
            theme:'default',
            dataLoaded:true
        };
        mm.ecOption = {};
        mm.isshowTB = false;
        mm.showCategaryDateformat = false;
        mm.showLegendDateformat = false;

		if(mm.site.code === 1){
			
			
		}
		if(mm.site.code === 2){
			mm.form = site.data.data;
		}


		mm.addSave = function () {
			if(mm.site.code === 1){
				var sendData = angular.copy(mm.form);
				console.log(sendData);
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
				});
			}
			$modalInstance.close();
		};
		mm.close = function () {
			$modalInstance.close();
		};

		mm.handleCategary = function () {
		    console.log('categary changed:' + mm.form.isCategoryDatetime);
            if (mm.form.isCategoryDatetime === 'N') {
                mm.showCategaryDateformat = false;
                mm.form.categoryDtFormat = '';
            } else {
                mm.showCategaryDateformat = true;
            }
        };

		mm.handleLegendDatetime = function () {
            if (mm.form.isLegendDatetime === 'N') {
                mm.showLegendDateformat = false;
                mm.form.legendDtFormat = '';
            } else {
                mm.showLegendDateformat = true;
            }
        };

        mm.showTable = function () {
        	mm.isshowTB = true;
			// mm.ecConfig.dataLoaded = true;
			var sendData = {'settingId':mm.form.id};
			if (mm.form.defType === 'pie') {
                HttpUtils.get(getData + 'pie', sendData, function (res) {
                    console.log(res);
                    mm.ecOption = {
                        title : mm.form.title,
                        tooltip : {
                            trigger: 'item',
                            formatter: "{b} : {c} ({d}%)"
                        },
                        legend: {},
                        series : [{
                            name: '',
                            type:'pie',
                            radius : '80%',
                            center: ['50%', '50%'],
                            data: res.data
                        }]
                    };
                    mm.ecConfig.dataLoaded = true;
                    console.log(mm.ecOption);
                })
            }else if(mm.form.defType === 'bar') {
                HttpUtils.get(getData + 'bar', sendData, function (res) {
                    console.log(res);
                    var series = [];
                    var ser = res.data.series;
                    angular.forEach(ser, function (data, index) {
                        series.push(
                            {
                                name: res.data.legend[index],
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: data
                            }
                        );
                    });
                    mm.ecOption = {
                        title : {
                            text: mm.form.title
                        },
                        legend: {
                            data:res.data.legend
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            type: 'category',
                            data: res.data.category
                        },
                        yAxis: {type: 'value'},
                        series: series
                    };
                    mm.ecConfig.dataLoaded = true;
                    console.log(mm.ecOption);

                })
            }

        }
	}
})();



