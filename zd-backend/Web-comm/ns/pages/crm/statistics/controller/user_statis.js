(function() {
	 'use strict';
	 
	 app.controller('CrmUserStatisGrid',Grid);
	 
	 var base = '/crm/statis/order/';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	 var year = getFullYear();
	 	 var onlyUser = "true";
	 	 initGrid();
		 function initGrid(){
	 		 var sendData = {"year":year,"onlyUser":onlyUser};
	 		 
			 var sendDataType1 = {"year":year,"onlyUser":onlyUser,"type":1};
			
			 
			 var sendDataType2 = {"year":year,"onlyUser":onlyUser,"type":2};
			
		
			 /**
			  * 合计统计
			  */
			 HttpUtils.post( base + 'totalStatis', sendDataType2 ,function (data) {
				 $scope.totalStatis = data.data;
			 });
			 
			 /**
			  * 行业统计
			  */
			 HttpUtils.post( base + 'industryStatis', sendData ,function (data) {
				 $scope.industryStatis = data.data;
				 
				 var industrys = new Array();
				 var objs = new Array();
				 $scope.industryStatis.forEach(function(value,index,array){
					 industrys.push(value.industryName);
					 var obj  = {value:value.allMoney,name:value.industryName,rentMoney:value.rentMoney,sellMoney:value.sellMoney};
					 objs.push(obj);
					 
				 });
				 var myChart = echarts.init(document.getElementById("industryStatis"));
				 var option = {
				    title : {
				        text: year+'年度销售业态及租售构成统计表',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        enterable:true,
				        formatter:function(params)//数据格式
			            {
				        	
				        	var dataIndex =params.dataIndex;
				        	var data =params.data;
				            var relVal = params.name +"  ￥"+params.value+"<br/>";
				            relVal += "租赁："+data.rentMoney+" <br/>";
				            relVal +="销售:"+data.sellMoney+" <br/>";
				            return relVal;
			            }
				    },
				    legend: {
				        type: 'scroll',
				        orient: 'vertical',
				        right: 10,
				        top: 20,
				        bottom: 20,
				        data: industrys
				    },
				    series : [
				        {   
				        	name: '',
				            type: 'pie',
				            radius : '55%',
				            center: ['40%', '50%'],
				            data:objs,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0
				                }
				            }
				        }
				    ]
				 };
				 myChart.clear();
				 //设置图表的大小
				 myChart.resize({ height: 286 , width: 842 });
			     // 使用刚指定的配置项和数据显示图表。
				 myChart.setOption(option);
				 
				
			 });
			 
			 /**
			  *  漏斗图统计
			  */
			 HttpUtils.post( base + 'funnelStatis', sendDataType2 ,function (data) {
				 $scope.funnelStatis = data.data;
			
				 var stages = new Array();
				 var objs = new Array();
				 $scope.funnelStatis.forEach(function(value,index,array){
					 stages.push(value.stage);
					 var obj  = {value:value.orderNum,name:value.stage};
					 objs.push(obj);
					 
				 });
				 
				 var myChart = echarts.init(document.getElementById("funnelStatis"));
				 var option = {
						    title: {
						        text: '漏斗图',
						        subtext: '纯属虚构'
						    },
						    tooltip: {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c}%"
						    },
						    toolbox: {
						        feature: {
						            dataView: {readOnly: false},
						            restore: {},
						            saveAsImage: {}
						        }
						    },
						    legend: {
						        data: stages
						    },
						    calculable: true,
						    series: [
						        {
						            name:'漏斗图',
						            type:'funnel',
						            left: '10%',
						            top: 60,
						            //x2: 80,
						            bottom: 60,
						            width: '80%',
						            // height: {totalHeight} - y - y2,
						            min: 0,
						            max: 100,
						            minSize: '0%',
						            maxSize: '100%',
						            sort: 'descending',
						            gap: 2,
						            label: {
						                normal: {
						                    show: true,
						                    position: 'inside'
						                },
						                emphasis: {
						                    textStyle: {
						                        fontSize: 20
						                    }
						                }
						            },
						            labelLine: {
						                normal: {
						                    length: 10,
						                    lineStyle: {
						                        width: 1,
						                        type: 'solid'
						                    }
						                }
						            },
						            itemStyle: {
						                normal: {
						                    borderColor: '#fff',
						                    borderWidth: 1
						                }
						            },
						            data:objs
						        }
						    ]
				};
				 myChart.clear();
				 //设置图表的大小
				 myChart.resize({ height: 286 , width: 842 });
			     // 使用刚指定的配置项和数据显示图表。
				 myChart.setOption(option);
			 });
			 
			 /**
			  *  租赁月报表
			  */
			 HttpUtils.post( base + 'monthStatis', sendDataType1 ,function (data) {
				 $scope.monthRentStatis = data.data;
				 var months = new Array();
				 var objs = new Array();
				 $scope.monthRentStatis.forEach(function(value,index,array){
					 months.push(value.month);
					
					 objs.push(value.totalMoney);
					 
				 });
				 
				 var myChart = echarts.init(document.getElementById("monthStatisRent"));
				var option = {
					 title : {
					        text: year+'年度租赁业绩统计表',
					        x:'center'
					 },
				     color: ['#3398DB'],
				     tooltip : {
				         trigger: 'axis',
				         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				         }
				     },
				     grid: {
				         left: '3%',
				         right: '4%',
				         bottom: '3%',
				         containLabel: true
				     },
				     xAxis : [
				         {
				             type : 'category',
				             data : months,
				             axisTick: {
				                 alignWithLabel: true
				             }
				         }
				     ],
				     yAxis : [
				         {
				             type : 'value'
				         }
				     ],
				     series : [
				         {
				             name:'直接访问',
				             type:'bar',
				             barWidth: '60%',
				             data:objs
				         }
				     ]
				 };

				 myChart.clear();
				 //设置图表的大小
				 myChart.resize({ height: 286 , width: 842 });
			     // 使用刚指定的配置项和数据显示图表。
				 myChart.setOption(option);
			 });
			 
			 /**
			  *  销售月报表
			  */
			 HttpUtils.post( base + 'monthStatis', sendDataType2 ,function (data) {
				 $scope.monthSellStatis = data.data;
				 
				 var months = new Array();
				 var objs = new Array();
				 $scope.monthSellStatis.forEach(function(value,index,array){
					 months.push(value.month);
					
					 objs.push(value.totalMoney);
					 
				 });
				 
				 var myChart = echarts.init(document.getElementById("monthStatisSell"));
				var option = {
					 title : {
					        text: year+'年度销售业绩统计表',
					        x:'center'
					 },
				     color: ['#3398DB'],
				     tooltip : {
				         trigger: 'axis',
				         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				         }
				     },
				     grid: {
				         left: '3%',
				         right: '4%',
				         bottom: '3%',
				         containLabel: true
				     },
				     xAxis : [
				         {
				             type : 'category',
				             data : months,
				             axisTick: {
				                 alignWithLabel: true
				             }
				         }
				     ],
				     yAxis : [
				         {
				             type : 'value'
				         }
				     ],
				     series : [
				         {
				             name:'直接访问',
				             type:'bar',
				             barWidth: '60%',
				             data:objs
				         }
				     ]
				 };

				 myChart.clear();
				 //设置图表的大小
				 myChart.resize({ height: 286 , width: 842 });
			     // 使用刚指定的配置项和数据显示图表。
				 myChart.setOption(option);
			 });
	     };
	     
	     function getFullYear(){
			 var date=new Date;
			 var year=date.getFullYear(); 
			 return year;
		 }
		
 	 };
	 
	
    
})();



