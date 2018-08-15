 

var Highcharts = require('highcharts');
import Tools from '../../utils/tools.util';
import Msg from '../../utils/msg.util';
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
function censusIndexController($scope,Proxy){
    var months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    var data = function(){
        var list = [];
        var startYear = 2000;
        for(var i=0 ; i < 100 ; i++){
            list.push({name:startYear+i,value:startYear+i});
        }
        return list;
    }
    $scope.years = data();
    var now = ""+new Date().getFullYear()
    /***************************************** */
  
    $scope.year =now;
    
    $scope.statusCountData = [];
    
    function SCount (month){
        this.month  = month;
        this.data = [];
    }
    function SC(){
        this.name =name;
        this.data = [];
    }

    function initStatusCount(){
        Proxy.statuscount({year:$scope.year}).then(xhr=>{
            if(xhr.result==true){        
                var sCount = null;
               
                 var scList = []
                 $scope.statusCountData = []
                 angular.forEach(xhr.data,(it,key)=>{ 
                     sCount = new SCount(key);
                   
                     angular.forEach(it,(a,b)=>{                
                         sCount.data.push( {'type':b,'num':a})
                     })
                     $scope.statusCountData.push(sCount)
                 })
                 $scope.statusCountData.sort(function(a,b){
                    return a.month>b.month ? 1 : -1;;
                 })
                
            
                 var resultData = init(xhr.data)
                if(!statucCountChart){
                    initStatusCountChart('',resultData )
                }else {
                    for(var i = 0 ; i < resultData.length;i ++){                        
                        statucCountChart.series[i].setData(resultData[i].data);
                    }                   
                }
            }
         })
    }

    /*****((()))******/
   

    function Data_1(month){
        this.month = month;
        this.type = [];
        this.data = [];
    }
    function init(indata){
        var list1 =[];
        var data1 = null;
        for(var key in indata){
           data1 = new Data_1(key);
           for(var key1 in indata[key]){
                data1.type.push(key1)
                data1.data.push(indata[key][key1])
           }
            list1.push(data1)
        }
        list1.sort(function(a,b){
            return a.month>b.month?1:-1;
        })
        var hash1 ={name:'预支付定金', data:[]},hash2 = {name:'已支付定金', data:[]},hash3={name:'已支付尾款', data:[]},
        hash4={name:'取消待退款', data:[]},hash5={name:'已完成', data:[]},hash6={name:'已关闭', data:[]};
        for(var i = 0 ; i < list1.length;i++){
             
             for(var j = 0 ; j < list1[i].type.length;j++){
                 var d = list1[i].type[j];
                 var m =parseInt( list1[i].data[j])
                 if(d==1){
                    hash1.data.push(m);
                 }else if(d==2){
                    hash2.data.push(m);
                 }else if(d==3){
                    hash3.data.push(m);
                 }else if(d==4){
                    hash4.data.push(m);
                 }else if(d==5){
                    hash5.data.push(m);
                 }else if(d==6){
                    hash6.data.push(m);
                 }
                 
             }
             
        }
        return [hash1,hash2,hash3,hash4,hash5,hash6];
    }
    //
    var statucCountChart =null;
    function initStatusCountChart(label,series){

        statucCountChart = Highcharts.chart('statusCount', {
            chart: {
                type: 'column'
            }, title: {
                text: '订单状态统计'
            },  
            
            credits:{
                enabled: false // 禁用版权信息
           },
            exporting:{
                enabled:false
            }
            
            ,
            xAxis: {
                categories:months,
                crosshair: true
            },
          
            yAxis: {
                min: 0,
                title: {
                    text: '订单数 (次)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} 次</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                }
            },
            series:series
        });
       
       
        
    }
    
   
    $scope.$watch('year',function(a,b){
       if(a!=b){
        initStatusCount();
       }
    })
    initStatusCount();
   //***************************** */
    $scope.year1 = now;
    $scope.useCountList = [];
     
    function initData1(){
        var data =  $scope.useCountList;
        var rooms = [];
        if(data.length>0){
           angular.forEach(data[0].data,(it)=>{               
               rooms.push({name:it.name,data:[]})
           })
        }
        angular.forEach(data,it=>{
            
            angular.forEach(it.data,item=>{
                angular.forEach(rooms,room=>{
                    if(item.name==room.name){
                        room.data.push(parseInt(item.num))
                    }
                })
            })
        })
         
        if(!useCountChart){            
            initUseCountChart(rooms)
        }else{
           
            for(var i = 0 ; i < rooms.length;i ++){                        
                useCountChart.series[i].setData(rooms[i].data);
            }  
        }
    }

    function initroomusecount(){
        Proxy.roomusecount({year:$scope.year1}).then(xhr=>{
            if(xhr.result){
                $scope.useCountList = [];
                 var sCount = null;
                angular.forEach(xhr.data,(it,key)=>{
                    sCount = new SCount(key);                   
                     angular.forEach(it,(a,b)=>{                
                         sCount.data.push( {'name':b,'num':a})
                     })
                     $scope.useCountList.push(sCount)
                })
                $scope.useCountList.sort(function(a,b){
                    return a.month>b.month ? 1 : -1;;
                 })
                 initData1();
            }
        })
    }
    initroomusecount();
    $scope.$watch('year1',function(a,b){
        if(a!=b){
            initroomusecount();
           
        }
    })
    var useCountChart = null;
    function initUseCountChart(series){       
             useCountChart = Highcharts.chart('useCount', {
                title: {
                    text: '场地使用统计'
                },
                xAxis: {
                    categories:months,
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: '预定次数'
                    }
                },
                credits:{
                    enabled: false // 禁用版权信息
               },
                exporting:{
                    enabled:false
                }
                ,   
               
                series: series ,
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            })

    }
   /********************************** */
    $scope.year2 = now;
    function IncomeSrc (month,addServiceMoney,thingsMoney,roomMoney){
        this.month = month;
        this.addServiceMoney= parseFloat(addServiceMoney);
        this.thingsMoney = parseFloat(thingsMoney);
        this.roomMoney = parseFloat(roomMoney);
    }
    $scope.incomeSourceList = [];
    
   function initIncomeSource(){
       Proxy.incomesource({year:$scope.year2}).then(xhr=>{
           if(xhr.result){
            var adds_income=0,things_income = 0,room_income = 0;
            $scope.incomeSourceList = []
            angular.forEach(xhr.data,(it,key)=>{
                $scope.incomeSourceList.push(new IncomeSrc(key,it.addServiceMoney,it.tingsMoney,it.roomMoney))
               
            })
            $scope.incomeSourceList.sort(function(a,b){
                return a.month>b.month?1:-1;
            })
            angular.forEach($scope.incomeSourceList,(data)=>{
                if(data.addServiceMoney!=0){
                    adds_income+=data.addServiceMoney;
                }else if(data.thingsMoney!=0){
                    things_income +=data.thingsMoney;
                }else{
                    room_income += data.roomMoney
                }
            })
            if(!incomeSourceChart){
                initIncomeSourceChart(adds_income,things_income,room_income)
            }else{
                incomeSourceChart.series[0].setData([adds_income,things_income,room_income]);
               
            }           
           }
       })
   }
   
   var incomeSourceChart = null;
   function initIncomeSourceChart (a,b,c){
      incomeSourceChart = Highcharts.chart('incomeSource',{
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '收入来源统计'
        },
        credits:{  enabled: false  },
        exporting:{   enabled:false },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: '收入来源统计',
            data: [
                ['增值服务收入',a],
                ['物品收入',      b],              
                ['场地收入',   c]
            ]
        }]
    })
   }
   
   initIncomeSource();

   $scope.$watch('year2',function(a,b){
        if(a!=b){
            initIncomeSource();
        
        }
    })

    /**************************** */
    $scope.year3 = now;
    $scope.incomeAddList = [];
    function IncomeAdd(month,a,b,c){
        this.month = month;
        this.addMoney =parseFloat(a);
        this.tongbi = ( b);
        this.huanbi = (c);
    }
    function initIncomeAdd(){
        Proxy.incomeadd({year:$scope.year3}).then(xhr=>{
            if(xhr.result){
                $scope.incomeAddList = [];
                angular.forEach(xhr.data,(it,key)=>{
                   $scope.incomeAddList.push(new IncomeAdd(key,it.addMoney,it.tongbi,it.huanbi))
                })
                $scope.incomeAddList.sort(function(a,b){
                    return a.month>b.month?1:-1;
                })
                var data = [];
                angular.forEach($scope.incomeAddList,(item)=>{
                    data.push([item.month,item.addMoney])
                })
                if(!incomeAddChart){
                    initIncomeAddChart(data);
                }else{
                    // for(var i = 0 ; i < data.length;i ++){                        
                        incomeAddChart.series[0].setData(data);
                    // } 
                    
                   
                }   
            }
        })
    }

    $scope.$watch('year3',function(a,b){
        if(a!=b){
            initIncomeAdd();        
        }
    })
    initIncomeAdd();

    var incomeAddChart = null;
    function initIncomeAddChart(data){
        incomeAddChart = Highcharts.chart('incomeAdd', {
            chart: {
                type: 'column'
            },
            credits:{  enabled: false  },
            exporting:{   enabled:false },
            title: {
                text: '场地收入增长统计'
            },
           
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '增长 (元)'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '增长: <b>{point.y:.1f} 元</b>'
            },
            series: [{
                name: '总人口',
                data: data,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    }
    /************************ */
     /**************************** */
     $scope.year3 = now;
     $scope.orderAddList = [];
     function OrderAdd(month,a,b,c){
         this.month = month;
         this.orderAdd =parseFloat(a);
         this.tongbi = ( b);
         this.huanbi = (c);
     }
     function initOrderAdd(){
         Proxy.orderadd({year:$scope.year3}).then(xhr=>{
             if(xhr.result){
                 $scope.orderAddList = [];
                 angular.forEach(xhr.data,(it,key)=>{
                    $scope.orderAddList.push(new OrderAdd(key,it.orderAdd,it.tongbi,it.huanbi))
                 })
                 $scope.orderAddList.sort(function(a,b){
                     return a.month>b.month?1:-1;
                 })
                 var data = [];
                 angular.forEach($scope.orderAddList,(item)=>{
                     data.push([item.month,item.orderAdd])
                 })
                 if(!orderAddChart){
                    initOrderAddChart(data);
                 }else{
                     // for(var i = 0 ; i < data.length;i ++){                        
                        orderAddChart.series[0].setData(data);
                     // } 
                     
                    
                 }   
             }
         })
     }
 
     $scope.$watch('year4',function(a,b){
         if(a!=b){
             initOrderAdd();        
         }
     })
     initOrderAdd();
 
     var orderAddChart = null;
     function initOrderAddChart(data){
        orderAddChart = Highcharts.chart('orderAdd', {
             chart: {
                 type: 'column'
             },
             credits:{  enabled: false  },
             exporting:{   enabled:false },
             title: {
                 text: '场地订单增长统计'
             },
            
             xAxis: {
                 type: 'category',
                 labels: {
                     rotation: -45,
                     style: {
                         fontSize: '13px',
                         fontFamily: 'Verdana, sans-serif'
                     }
                 }
             },
             yAxis: {
                 min: 0,
                 title: {
                     text: '增长 (数量)'
                 }
             },
             legend: {
                 enabled: false
             },
             tooltip: {
                 pointFormat: '增长: <b>{point.y:.1f} 数量</b>'
             },
             series: [{
                 name: '总人口',
                 data: data,
                 dataLabels: {
                     enabled: true,
                     rotation: -90,
                     color: '#FFFFFF',
                     align: 'right',
                     format: '{point.y:.1f}', // one decimal
                     y: 10, // 10 pixels down from the top
                     style: {
                         fontSize: '13px',
                         fontFamily: 'Verdana, sans-serif'
                     }
                 }
             }]
         });
     }
     /****************** */
     var myDate = new Date()
     $scope.startTime =myDate;
     myDate.setMonth(myDate.getMonth()+1)
     $scope.endTime = myDate;
     $scope.query = {};
     $scope.$watch('startTime',function(a,b){
        if(a!=b){
            $scope.query.startTime = Tools.dateFormat($scope.startTime,'yyyy-MM-dd');
            $scope.query.endTime = Tools.dateFormat($scope.endTime,'yyyy-MM-dd')
            if($scope.startTime.getTime()>$scope.endTime.getTime()){
                Msg.setText('开始时间并不能大于结束时间')
                return false;
            }
            initfinanceStatistics( $scope.query)
        }
     })
     $scope.$watch('endTime',function(a,b){
        if(a!=b){
            $scope.query.startTime = Tools.dateFormat($scope.startTime,'yyyy-MM-dd');
            $scope.query.endTime = Tools.dateFormat($scope.endTime,'yyyy-MM-dd')
            if($scope.startTime.getTime()>$scope.endTime.getTime()){
                Msg.setText('开始时间并不能大于结束时间')
                return false;
            }
            initfinanceStatistics( $scope.query)
        }
    })
     $scope.financeStatisticsList = [];
     function FS(time){
        this.time = time;
        this.data = [];
     }
     function initfinanceStatistics(data){
         Proxy.financeStatistics(data).then(xhr=>{
            if(xhr.result){
                $scope.financeStatisticsList = [];
                var fs = null;
                var a = 0,b=0,c=0,d=0;
                angular.forEach(xhr.data,(item,key)=>{
                    fs = new FS(key)
                    angular.forEach(item,(it,val)=>{                       
                        fs.data.push({type:val,num:it})
                    })
                    
                    $scope.financeStatisticsList.push(fs)
                    angular.forEach($scope.financeStatisticsList,(it)=>{
                        angular.forEach(it.data,(item)=>{
                           if(item.type=="1"){
                                a+=item.num;
                           }else if(item.type=="2"){
                                b+=item.num;
                           }else if(item.type=="3"){
                                c+=item.num;
                           }else if(item.type=="4"){
                                d+=item.num;
                           }
                        })
                    })
                    if(!financeChart){
                        initFinanceChart(a,b,c,d)
                    }else{
                        financeChart.series[0].setData([a,b,c,d])
                    }
                })
               
            }
         })
     }
     $scope.sumIt=(list)=>{
        var money =0; 
        angular.forEach(list,(it)=>{
            money+=it.num;
         })
         return money;
     }
     initfinanceStatistics({})
     var financeChart = null;
     function initFinanceChart (a,b,c,d){
        financeChart = Highcharts.chart('finance',{
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
          },
          title: {
              text: '财务统计'
          },
          credits:{  enabled: false  },
          exporting:{   enabled:false },
          tooltip: {
              headerFormat: '{series.name}<br>',
              pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend: true
            }
        },
          series: [{
              type: 'pie',
              name: '财务统计',
              data: [
                  ['企业月结',a],
                  ['现场支付',      b],  			            
                  ['微信支付',   c],
                  ['支付宝支付',   d]
              ]
          }]
      })
     }

     $scope.currentTab = 0;
     $scope.changeTab = function (index){
         $scope.currentTab = index;
     }
}



censusIndexController.$inject = ['$scope','proxy'];
export default angular.module('censusIndexController',[]).controller('censusIndexController',censusIndexController).name
