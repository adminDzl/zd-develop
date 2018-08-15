(function () {
    'use strict';


	 app.controller("TTableEdit",DCtrl);
	 
	 var base = '/console/tableinfo/';
   
	function DCtrl($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {
		$scope.form = {};//清空表单数据
		$scope.select=[];
		//所属业务
		$scope.dataType=[{"id":"user","text":"用户"},{"id":"order","text":"物业订单"}];
		//下属园区
		$scope.parkList=[{"id":"a","text":"园区a","check":false},{"id":"b","text":"园区b","check":false},{"id":"c","text":"园区c","check":false}];
		//时间纬度
		$scope.timeList=[{"id":"year","text":"年"},{"id":"month","text":"月"},{"id":"day","text":"日"}];
		//类别纬度
		$scope.typeList=[{"id":"business","text":"商户","check":false},{"id":"company","text":"企业","check":false},{"id":"person","text":"个人","check":false}];
		//图表类型
		$scope.tableList=[{"id":"pie","text":"饼图"},{"id":"bar","text":"柱状图"}];
		
		
		$scope.addSave = function () {
			
			var form = getData()
			
			console.log(form);

			var sendData = angular.copy(form);
			HttpUtils.post(base + 'addSave',sendData,function (data) {
				ModalCtrl.show('提示','新增成功',modalCode.success);
				$state.go("app.table_info");
			});
			
			
		}
		
		$scope.checkpark = function(en){
			
		}
		
		$scope.close = function () {
			$modalInstance.close();
		}
		
		//选择业务类型
		$scope.selectType=function(){
			
			if($scope.form.dataType=='user'){
				//业务
				$scope.datanameList=[{"id":"totaldata","text":"总用户统计"},{"id":"newdata","text":"新增用户统计"}];
				$scope.isshowYW = true;
				
				//类别纬度
				$scope.typeList=[{"id":"business","text":"商户","check":false},{"id":"company","text":"企业","check":false},{"id":"person","text":"个人","check":false}];
				$scope.isshowWD = true;
			}
			
			if($scope.form.dataType=='order'){
				$scope.datanameList=[{"id":"totaldata","text":"总订单统计"},{"id":"newdata","text":"新增订单统计"}];
				$scope.isshowYW = true;
				
				//类别纬度
				$scope.typeList=[{"id":"join","text":"入伙","check":false},{"id":"repair","text":"报修","check":false},{"id":"meeting","text":"会议室","check":false}];
				$scope.isshowWD = true;
				
			}
			
		}
		//检测图表类型
		$scope.checkTableType=function(id){
			var form = getData();
			//饼图
			if(id=='pie'){
				checkPic(form);
			}
			//柱状图
			if(id=='bar'){
				checkBar(form);
			}
			//折线图
			if(id=='line'){
				checkLine(form);
			}
		}
		
		function checkPic(form){
			if(form.time && form.dataParam){
				ModalCtrl.show('提示','无法用饼图表示！',modalCode.info);
				$scope.form.tableType = false;
				return;
			}
			if(form.time){
				ModalCtrl.show('提示','无法用饼图表示！',modalCode.info);
				$scope.form.tableType = false;
			}
		}
		function checkBar(form){
			if(!form.dataParam){
				ModalCtrl.show('提示','无法用柱状图表示！',modalCode.info);
				$scope.form.tableType = false;
			}
		}
		function checkLine(form){
			if(!form.time || !form.dataParam){
				ModalCtrl.show('提示','无法用折线图表示！',modalCode.info);
				$scope.form.tableType = false;
			}
		}
		
		function getData(){
			var form = {};
			//所属业务
			form.dataType = $scope.form.dataType;
			//统计业务
			form.statisticsName = $scope.form.statisticsName;
			//园区id
			if($scope.form.parkType=='saas'){
				form.parkId = getCheck($scope.parkList);
			}else{
				form.parkId = $scope.form.parkType;
			}
			//时间维度
			form.time = $scope.form.time;
			//类别纬度
			form.dataParam=getCheck($scope.typeList);
			//图表类型
			form.tableType = $scope.form.tableType;
			//图表名称
			form.name = $scope.form.name;
			return form;
		}
		
		function getCheck(list){
			var temp = "";
			angular.forEach(list, function(en) {
				if(en.check){
					temp += en.id+",";
				}
			});
			return temp;
		}
		
		//显示图表
		$scope.yearConfig = {
            theme:'default',
            dataLoaded:false
        };
		
		$scope.showTable = function(){
			var form = getData();
			console.log(form);
			$scope.isshowTB = true;
			
			if(form.tableType=='pie'){
				pieTable(form);
			}
			//柱状图
			if(form.tableType=='bar'){
				if(!form.time){
					barTable(form);
				}else{
					barTableWithTime(form);
				}
			}
			//折线图
			if(form.tableType=='line'){
				
			}
			
		}
		//显示柱状图(无时间)
		function barTable(form){

			var ldata = getTextById(form.dataParam);
			
			var data=[];
			angular.forEach(ldata, function(en,index) {
				if(en){
					data.push(32+index*10);
				}
			});
			console.log(ldata);
			$scope.statusNumOption = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                	type: 'category',
                    data: ldata
                },
                yAxis: {type: 'value'},
                series:[
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:data
                    }
                ]
            };
			$scope.yearConfig = {dataLoaded:true};
		}
		function getTextById(ids){
			var list = ids.split(",");
        	var data = [];
        	angular.forEach(list,function(en){
        		if(en){
        			var text = "";
        			angular.forEach($scope.typeList,function(a){
        				if(a.id==en){
        					text = a.text;
        				}
        			});
        			data.push(text);
        		}
        	});
        	return data;
		}
		
		//显示柱状图
		function barTableWithTime(form){

			var ldata = getTextById(form.dataParam);
			
			var time = [];
			if(form.time=="day"){
				time=["2018/1/12","2018/1/13","2018/1/14","2018/1/15"];
			}else if(form.time=="month"){
				time=["2018/1","2018/2","2018/3","2018/4"];
			}
			
			
			$scope.statusNumOption = {
				legend: {
                    data:["企业","个人","商店"]
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                	type: 'category',
                    data: ["2018/1/12","2018/1/13","2018/1/14","2018/1/15"]
                },
                yAxis: {type: 'value'},
                series:[
                    {
                    	name: '企业',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [320, 302, 301,345]
                    },
                    {
                    	name: '个人',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [220, 202, 201,298]
                    },
                    {
                    	name: '商店',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [620, 402, 501,894]
                    }
                ]
            };
			$scope.yearConfig = {dataLoaded:true};
		}
		
		function getText(ids){
			var list = ids.split(",");
        	var data = [];
        	angular.forEach(list,function(en){
        		if(en){
        			var text = "";
        			angular.forEach($scope.typeList,function(a){
        				if(a.id==en){
        					text = a.text;
        				}
        			});
        			var e = {value:100, name:text};
        			data.push(e);
        		}
        	});
        	return data;
		}
		
		
		//显示饼图
        function pieTable(form){
        	
        	var data = getText(form.dataParam);
        	
        	
        	$scope.statusNumOption={
        		title : {},
        		tooltip : {
        			trigger: 'item',
        			formatter: "{b} : {c} ({d}%)"
        		},
        		legend: {},
        		series : [{
        		              name:form.name,
        		              type:'pie',
        		              radius : '80%',
        		              center: ['50%', '50%'],
        		              data:data
        		          }]
        	};

        	$scope.yearConfig = {dataLoaded:true};
        }

		
		
		
	}
    
})();



