 

var dataTable = require('datatable/jquery.dataTables.min');
require('datatables-bootstrap3-plugin')
var oStatus = ['','定金待支付','定金已支付','尾款支付完成','取消待退款','订单已完成','订单已取消','待审核','已审核','已驳回','已派单','已完成','已评价'];
var pStatus = ['','企业月结','现场支付','微信支付','支付宝支付']
var data =['','全部','场地租金','物品使用','增值服务',''];
var daystr = ['','一','二','三','四','五','六','天'];
var Filters = {}
Filters.payStatus = function(aRow,aData){
    var str = '',str1='';
    var pt =   $(aRow).find('td').eq(5);
    var lpt = $(aRow).find('td').eq(6);
    this.orderStatus(aRow,aData)
    if(aData.payType){
        if(isNaN(aData.payType)){
             
            pt.html( aData.payType)
             return false;
        }
        pt.html(pStatus[aData.payType]);
    }
    if(aData.lastPayType){
        if(isNaN(aData.lastPayType)){
             
            lpt.html( aData.lastPayType)
             return false;
        }
        lpt.html(pStatus[aData.lastPayType]);
    }
   
   
}
Filters.orderStatus = function(aRow,aData){
    var str = '';
    if(aData.orderStatus){
        str = oStatus[aData.orderStatus]
    }
    
    $(aRow).find('td').eq(7).html(str)
}
Filters.favFilter = function(aRow,aData){
    
    var str = ''
    if(aData.useSocpe!=null && aData.useSocpe!='' && aData.useSocpe!='null'){
       
        str= data[aData.useSocpe]
    }
    $(aRow).find('td').eq(3).html(str);
    var sffix = aData.perferentialType==1?'元':'折';
    $(aRow).find('td').eq(2).html(aData.perferentialMargin+sffix)
}
Filters.goodsFilter = function(aRow,aData){
    var str = '';
    if(aData.freeType==1){
        str ='免费';         
    }else if(aData.freeType==2){
        str = '付费';
    }
    $(aRow).find('td').eq(3).html(str)
}
Filters.timeStatus = function(aRow,aData){
    var str = '';
    if(aData.meetingStatus==0){
        str ='不开放';         
    }else if(aData.meetingStatus==1){
        str = '已预定';
    }
    $(aRow).find('td').eq(4).html(str);
    if(aData.week){
        var ws =  aData.week.substr(0,2)
        var ds = aData.week.substr(2,1)
       
        $(aRow).find('td').eq(1).html(ws+daystr[ds]);
    }
}
Filters.priceStatus = function(aRow,aData){
    var td = $(aRow).find('td');
    if(aData.timeLong==null||aData.timeLong=='null'){
        var bDate = aData.startTime.split(':')
        var bMi = parseInt(bDate[0])*60+parseInt(bDate[1]);
        var eDate = aData.endTime.split(':');
        var eMi =parseInt(eDate[0])*60+parseInt(eDate[1]);       
        td.eq(1).html('￥'+aData.priceMoney+'/半小时')
        td.eq(0).html( aData.startTime+'~'+ aData.endTime)//(eMi-bMi)/60
        
    }else{
        td.eq(1).html('￥'+aData.priceMoney+'/小时')
        td.eq(0).html(aData.timeLong+'小时')
       
    }
} 
Filters.valuesAddFilter = function(aRow,aData){
    var str = [];
    // console.log(aData)
    if(aData.attach){
       
        for(var i =0 ; i< aData.attach.length;i++){
            str.push('<a href="javascript:;" onClick="getAttach(\''+aData.attach[i]+'\')">套餐介绍</a>')
        }
    }
   str =  str.join('|');
    
    $(aRow).find('td').eq(4).html(str.toString())
}
Filters.baseDataStatus = function(aRow,aData){
    var str = '';
    if(aData.status==1){
        str ='未生效';         
    }else if(aData.status==2){
        str = '已生效';
    }
    // $(aRow).find('td').eq(3).html(str)
}
Filters.baseGroupDataStatus = function(aRow,aData){
    var str = '';
    if(aData.status==1){
        str ='未生效';         
    }else if(aData.status==2){
        str = '已生效';
    }
    // $(aRow).find('td').eq(2).html(str)
}
Filters.homeStatus = function(aRow,aData){
    var str = '';
    if(aData.isDisplay==2){
        str ='隐藏';         
    }else if(aData.isDisplay==1){
        str = '展示';
    }
   
    $(aRow).find('td').eq(7).html(str)
}
Filters.maddvasFilter = function(aRow,aData){
    $(aRow).find('td').eq(2).html(aData.servicePrice+'元')
}
Filters.thingsFilter = function(aRow,aData){
    var str = '';
    if(aData.freeType==1){
        str ='免费';         
    }else if(aData.freeType==2){
        str = '付费';
    }
    $(aRow).find('td').eq(3).html(str)
}
Filters.vasStatus = function(aRow,aData){
    var imgs = [];
    if(aData.attachList){
        for(var i = 0 ; i < aData.attachList.length;i++){
            imgs.push('<img src="'+aData.attachList[i]+'" style="width:380px"/>')
        }
        
    }
    
    var a = $('<a href="javascript:;" data-container="body" class="popset" data-toggle="popover" data-placement="left"  ></a>')
    a.html('预览')
    $(aRow).find('td').eq(3).empty().append(a);
    setTimeout(()=>{       
     a.popover({content: imgs.join('</br>'),html:true});
     a.on('shown.bs.popover',function(){
        var k = $(this).attr('aria-describedby')
       $('.popover').each(function(){
           if(this.id!=k){
               $(this).remove();
           }
       })
     })
     $('body').on('click',function(e){
        if(e.target.className=='popset')return false;
        $('.popover').each(function(){
            
                $(this).remove();
             
        })
     })
    },20)
}
Filters.roleFilter = function(aRow,aData){
    var str = [];
    if(aData.roomList&& aData.roomList.length>0){
        for(var i = 0 ; i < aData.roomList.length;i++){
          if(aData.roomList[i])
            str.push(aData.roomList[i].name)
        }
    }
    $(aRow).find('td').eq(2).html(str.join(','))
}
function datatableDirective($rootScope,$compile) {
    return {
        restrict: 'AE',      
        scope:{
            url:'=',
            setting:'=',           
            columns:'=',
            filters:'@',
            searchParams:'=',
            indentifyKey:'@',
            btns:'@',//d-e-v 
            del:'&',
            output:'&',
            edit:'&',
            role:'&',
            set:'&',
            osset:'&',
            fen:'&',
            view:'&'
        },
       link: function ($scope, elem) {
           //table.api().ajax.reload()   table.ajax.reload();
         var btns = [];
         
         if($scope.btns){
             btns = ($scope.btns).split('-')
         }
         $scope.$on('$destroy',function(){
            listener();
            listener = null;
            dataTable = null;
         })
         //重载
       var listener = $rootScope.$on('datatables-reload',function(){   
               
            $dataTable.ajax.reload();
        })         
        var url = $scope.url;     
        var conf = {            
             lengthChange:false,    
             fnRowCallback:function(nRow,aData,index){      
                if(btns.indexOf('i')!=-1){
                    $('.input_edit',nRow).bind('keyup',function(){
                       
                        var val = $(this).val();
                      
                        $scope.$apply(function(){
                            $scope.output({data:aData,val:val})
                        })
                    })
                }          
                if(btns.indexOf('e')!=-1){
                    $('.text-primary', nRow).bind('click', function() {
                     
                        $scope.$apply(function() {
                            $scope.edit({data:aData});
                        });
                    });
                } 
                if(btns.indexOf('d')!=-1){
                    $('.text-danger', nRow).bind('click', function() {
                       
                        $scope.$apply(function() {
                            $scope.del({data:aData});
                        });
                    });
                }
                if(btns.indexOf('v')!=-1){
                    $('.text-info', nRow).bind('click', function() {       
                                           
                        $scope.$apply(function() {
                            $scope.view({data:aData});
                        });
                    });
                }
                if(btns.indexOf('s')!=-1){
                    $('.text-success', nRow).bind('click', function() {  
                        $scope.$apply(function() {
                            $scope.set({data:aData,row:nRow});
                        });
                    });
                }
                if(btns.indexOf('os')!=-1){
                    $('.btn-osset', nRow).bind('click', function() {  
                        $scope.$apply(function() {
                            $scope.osset({data:aData,row:nRow});
                        });
                    });
                }
                if(btns.indexOf('r')!=-1){
                    $('.btn-role',nRow).bind('click',function(){
                        $scope.$apply(function() {
                            $scope.role({data:aData,row:nRow});
                        });
                    })
                }
                if(btns.indexOf('f')!=-1){
                    $('.btn-fen',nRow).bind('click',function(){
                        $scope.$apply(function() {
                            $scope.fen({data:aData,row:nRow});
                        });
                    })
                }
                if(typeof Filters[$scope.filters] =='function'){
                  
                  (Filters[$scope.filters])(nRow,aData)
                }
            
            // $compile(nRow,aData,index)($scope)
        },       
             ajax:function(d,callback,setting){
                 for(var key in d){
                     if(key.indexOf("columns")==0||key.indexOf("order")==0||key.indexOf("search")==0){ //以columns开头的参数删除
                         delete d[key];
                     }
                 }
                //  console.log($scope.searchParams)
                 //附加查询参数
                 if($scope.searchParams){
                     $.extend(d,$scope.searchParams); //给d扩展参数
                 } 
                 $.ajax({
                     type:'post',
                     url:url,
                     cache:false,
                     data:d,
                     dataType:'json',
                     headers: {
				        "Authorization":localStorage.token
				    },
                     success:function(res){
                         setTimeout(function(){
                              if(res.result){
                                 var result = {};
                                 result.draw - res.data.draw;
                                 result.recordsFiltered = res.data.recordsFiltered;
                                 result.recordsTotal = res.data.recordsTotal;
                                 result.data = res.data.data;
                                 var dataCount = $('#dataCount');
                                 if(dataCount[0]){
                                     dataCount.html(result.recordsTotal);
                                 }
                                 callback(result);
                              }else{
                                  alert(res.message)
                              }
                               
                           
                         }, 200);
                     }
                 })
             },
             
             ordering:false,
             searching:false,
             serverSide:true,      
             "Info": true,
             "oLanguage": {
                 //国际语言转化
                 "oAria": {
                     "sSortAscending": " - click/return to sort ascending",
                     "sSortDescending": " - click/return to sort descending"
                 },
                 "sLengthMenu": "显示 _MENU_ 记录",
                 "sZeroRecords": "对不起，查询不到任何相关数据",
                 "sEmptyTable": "未有相关数据",
                 "sLoadingRecords": "玩命加载中...",
                 "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
                 "sInfoEmpty": "当前显示0到0条，共0条记录",
                 "sInfoFiltered": "（数据库中共为 _MAX_ 条记录）",
                 "sProcessing": "玩命加载中...",
                 "sSearch": "模糊查询：",
                 "sUrl": "",
                 //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
                 "oPaginate": {
                     "sFirst": "首页",
                     "sPrevious": " 上一页 ",
                     "sNext": " 下一页 ",
                     "sLast": " 尾页 "
                 }
             },
             
             aoColumns:$scope.columns
        }
        if($scope.btns){
            conf = angular.extend(conf,{  columnDefs:[{
                targets:$scope.columns.length,
                data:function(nRow){
                   
                },
                render:function(no,display,data){     
                    
                    return getRenderHtml($scope,data);
                }
            }]
          })
        }
        // console.log(conf)
        var $dataTable = elem.DataTable(conf)
            
        var indentifyKey = $scope.indentifyKey;          
        
         function getRenderHtml($scope,data){           
                var str = [];
                for(var k in btns){
                    if(btns[k]=='v'){
                        str.push('<a href="javascript:;" class="text-info">详情</a>')
                    }else if(btns[k]=='e'){
                        str.push('<a href="javascript:;" class="text-primary">编辑</a>')
                    }else if(btns[k]=='d'){
                        str.push('<a   data-toggle="modal" data-target="#myModal"  class="text-danger">删除</a>')
                    }else if(btns[k]=='s'){
                        str.push('<a href="javascript:;" class="text-success btn-set">展示</a>')
                    }else if(btns[k]=='i'){
                        str.push('<input type="text" disabled class="input_edit"/>')
                    }else if(btns[k]=='r'){
                        str.push('<a href="javascript:;" class="text-success btn-role">权限</a>')
                    }else if(btns[k]=='f'){
                        str.push('<a href="javascript:;" class="text-success btn-fen">分配</a>')
                    }else if(btns[k]=='os'){
                        str.push('<a href="javascript:;" class="text-success btn-osset">展示</a>')
                    }
                }
                
                 str = str.join('&nbsp;');
                
                return str.toString();
            }
            
        }
    };
}
 

datatableDirective.$inject = ['$rootScope','$compile']
export default angular.module('datatableDirective',[]).directive('datatableDirective',datatableDirective).name;