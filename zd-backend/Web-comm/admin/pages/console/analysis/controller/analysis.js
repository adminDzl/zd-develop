(function () {
    'use strict';

    app.controller('TAnalysisGrid', Grid);
    function Grid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {

    	
        //请求后台数据
        function initData() {
            var sendData = { };
            HttpUtils.get("/console/reportsettings/defaultDisList", sendData, function (res) {
                $scope.list=res.data;
                setChartsData();
            });
        }
        initData();

        $scope.yearConfig = {
            theme:'default',
            dataLoaded:false
        };
        
        
        
        function 	setChartsData(){
        	
        	angular.forEach($scope.list, function(item,index) {
				if(item && item.defType == 'pie'){
                    HttpUtils.get("/console/report/pie", {'settingId': item.id}, function (data) {
						item.tableInfo = {
							title : {
							    text: item.title
                            },
							tooltip : {
								trigger: 'item',
								formatter: "{b} : {c} ({d}%)"
							},
							legend: {},
							series : [{
								  name:'',
								  type:'pie',
								  radius : '80%',
								  center: ['50%', '50%'],
								  data: data.data
								  // data:[
									//   {value:335, name:'直接访问'},
								  //     {value:310, name:'邮件营销'},
								  //     {value:234, name:'联盟广告'},
								  //     {value:135, name:'视频广告'},
								  //     {value:1548, name:'搜索引擎'}
								  //     ]
							  }]
						};
                    });

				}

                if(item && item.defType == 'bar'){
                    HttpUtils.get("/console/report/bar", {'settingId': item.id}, function (res) {
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
                        console.log(series);
                        item.tableInfo = {
                            title : {
                                text: item.title
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
                    });


                }

				// if(item && item.tableType == 'bar'){
				// 	item.tableInfo = {
				// 		legend: {
				// 			data:["企业","个人","商店"]
				// 		},
				// 		tooltip: {
				// 			trigger: 'axis'
				// 		},
				// 		xAxis: {
				// 			type: 'category',
				// 			data: ["","2018/1/13","2018/1/14","2018/1/15"]
				// 		},
				// 		yAxis: {type: 'value'},
				// 		series:[
				// 			{
				// 				name: "企业",
				// 				type: 'bar',
				// 				stack: '总量',
				// 				label: {
				// 					normal: {
				// 						show: true,
				// 						position: 'insideRight'
				// 					}
				// 				},
				// 				data: [320,100]
				// 			},
				// 			{
				// 				name: '个人',
				// 				type: 'bar',
				// 				stack: '总量',
				// 				label: {
				// 					normal: {
				// 						show: true,
				// 						position: 'insideRight'
				// 					}
				// 				},
				// 				data: [null, 202, 201,298]
				// 			},
				// 			{
				// 				name: '商店',
				// 				type: 'bar',
				// 				stack: '总量',
				// 				label: {
				// 					normal: {
				// 						show: true,
				// 						position: 'insideRight'
				// 					}
				// 				},
				// 				data: [620, 402, 501,894]
				// 			}
				// 			]
				// 	};
                //
				// }
			});

        	$scope.yearConfig = {dataLoaded:true};
        }

        $scope.parseData = function(list,data){
        	var queue = new Array();
        	for(var i = 0; i<list.length; i++){
        		var key = list[i];
        		var en ={
        			name:key,
        			type:'bar',
        			data:data[key]
        		};
        		queue[i]=en;
        	}
        	
        	return queue;
        };

    }


})();



