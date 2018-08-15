import Msg from '../../utils/msg.util';
function detailOrderServive($rootScope,$state,$stateParams,Proxy){
    function Detail(){
        this.id = $stateParams.id;
        this.unfrees = [];
        this.frees =[];
        this.firstMoney = 0;
        this.unfreemoney = 0;
        this.sermoney = 0;
        this.attachList = [];
        this.orderAddservice = [];
        this.orderPayMent = [];
        this.meeting = {};
        this.freeGoods =[];
        this.unfreeGoods = [];
        this.openTime = [];
        this.closeOrderBean = {money:0,reson:''}
        this.statusMap = [{v:'1',n:'定金待支付'},{v:'2',n:'定金已支付'},{v:'3',n:'尾款支付完成'},{v:'4',n:'取消待退款'},{v:'5',n:'订单已完成'},{v:'6',n:'订单已取消'}]
        this.payTypes = [{name:'企业月结',value:'1'}, {name:'现场支付',value:'2'}, {name:'微信支付',value:'3'},  {name:'支付宝支付',value:'4'}]
        this.model = {
            subscribeMoney:0,
            orderMoney:0,
            contactPhone:'',	 	
            meetingId: '',
            companyName	:'',
            meetingTopic:'', 		
            numbers:'',
            date:new Date(),
            beginTime:null,
            endTime:null,
            attach:'',
            contactName:'',	
            addServiceIds:'',	 
            thingIds:'',
            orderTime:'', 
            payType:'',
            lastPayType:''
        }
      
        this.queryById = ()=>{
            Proxy.queryOrderById({orderId:this.id}).then(xhr=>{
                if(xhr.result){
                    this.model = xhr.data.order;
                    this.attachList = xhr.data.attachList;
                    this.meeting =xhr.data.meetingRoom;
                    this.orderAddservice = xhr.data.orderAddservice;
                    this.orderPayMent = xhr.data.orderPayMent;
                    this.orderTime = xhr.data.orderTime;
                    if(xhr.data.orderThings && xhr.data.orderThings.length>0){
                        angular.forEach(xhr.data.orderThings,(it)=>{
                                if(it.thingsMoney!=0){
                                    this.unfrees.push(it)
                                }else {
                                    this.frees.push(it);
                                }
                        })
                        angular.forEach(this.unfrees,(it)=>{
                            this.unfreemoney += it.thingsMoney
                        })
                    }
                    angular.forEach(this.orderAddservice,(data)=>{                        
                        this.sermoney += data.addServiceCount*data.servicePrice;
                    })
                    angular.forEach(this.orderPayMent,(data)=>{
                        if(data.payMoney){
                            this.firstMoney +=parseFloat( data.payMoney);
                        }
                    })
                    this.findAddService();
                    this.findThings();
                }else{
                    Msg.setText(xhr.message);
                    setTimeout(function(){
                        $state.go('manage.orders')
                    },2000)
                }
            })
        }
        this.findThings = function(){
            Proxy.findThings({meetingId:this.meeting.id}).then(xhr=>{
                if(xhr.result){
                   angular.forEach(xhr.data.data,(data)=>{
                        if(data.freeType==1){
                            this.freeGoods.push(data);
                           
                        }else{
                            this.unfreeGoods.push(data);
                           
                        }
                   });
                   angular.forEach(this.frees,(ita)=>{//已选
                       angular.forEach(this.freeGoods,(itb)=>{//系统
                       
                           if(parseInt(ita.thingsId)==itb.id){
                               
                                itb.select =true;
                                itb.number = ita.thingsCount
                           }
                       })
                   })
                   angular.forEach(this.unfrees,(ita)=>{//已选
                    angular.forEach(this.unfreeGoods,(itb)=>{//系统
                       
                        if(parseInt(ita.thingsId)==itb.id){
                             itb.select =true;
                             itb.number = ita.thingsCount
                        }
                    })
                })
                  
                }
            })
        }
        this.sysServs = [];
        this.findAddService = function(){
            Proxy.findAddService({meetingId:this.meeting.id}).then(xhr=>{
                if(xhr.result){
                    this.sysServs = xhr.data;      
                            
                    angular.forEach(this.sysServs,(ita)=>{//系统
                        angular.forEach(this.orderAddservice,(itb)=>{//已选
                            if(parseInt(itb.serviceId)==ita.id){
                                ita.filter = true;
                            }
                        })
                    })
                }
            })
        }
        
        this.addNewAddSer = (uim)=>{
            var selectedAddServ = [];
          
            angular.forEach(this.sysServs,(item)=>{
                if(item.select){
                   
                    selectedAddServ.push(item.id+'_0');
                   
                }
            })
            
            Proxy.additionalService({orderId:this.id,addServiceIds:selectedAddServ.join(',')}).then(xhr=>{
                if(xhr.result){
                   Msg.setText('保存成功');
                   setTimeout(()=>{
                   window.location.reload()
                   },1000)
                 
                }else{
                    Msg.setText('新增服务失败')
                }
            })
        }
        this.editAddServ = (uim)=>{
            var list = [];
            angular.forEach(this.orderAddservice,(data)=>{
               
                if(data.addServiceCount){
                  var ids =   data.serviceId.split('_')
                    list.push(ids[0]+'_'+data.addServiceCount)
                }
            })
             
            Proxy.updateOrderAddservice({orderId:this.id,addServiceIds:list.join(',')}).then(xhr=>{
                if(xhr.result){
                    Msg.setText('保存成功');
                    setTimeout(()=>{
                       window.location.reload();
                    },1000)
                  
                 }else{
                     Msg.setText('新增服务失败')
                 }
            })
        }
        this.updateOrderThings = (uim)=>{
            var list = [];
            var str = [];
            var freethings = [];
            var unfreethings = [];
            list = list.concat(this.freeGoods);
            list = list.concat(this.unfreeGoods);
            angular.forEach(list,(it)=>{
                 if(it.select){
                    if(it.number){
                        str.push(it.id+'_'+it.number);
                        if(it.price){
                            freethings.push(it)
                        }else{
                            unfreethings.push(it)
                        }
                        
                    }else{
                        it.select = false;
                    }
                 }
            })
            // this.freeGoods = this.freeGoods.concat(freethings)
            // this.unfreeGoods = this.unfreeGoods.concat(unfreethings)
            
            Proxy.updateOrderThings({orderId:this.id,thingids:str.join(',')}).then(xhr=>{
               if(xhr.result){
                    Msg.setText('保存成功')
                    // this.freeGoods = this.freeGoods.concat(freethings)
                    // this.unfreeGoods = this.unfreeGoods.concat(unfreethings)
                    setTimeout(()=>{
                        window.location.reload();
                     },1000)
               }else{
                 Msg.setText('保存失败')
               }
            })
        }
        this.queryById();
        this.payAllMoney = ()=>{
            if(this.model.orderMoney==0){
                Msg.setText('此订单为免费')
                return false;
            }
            var money = 0;
            if(this.model.status==1){
                    money = this.firstMoney;
            }else if(this.model.status==2){
                money = this.model.orderMoney+this.unfreemoney+this.sermoney - this.firstMoney;
            }
            // var allMoney = this.model.orderMoney+this.unfreemoney+this.sermoney //-this.firstMoney;

            
           Proxy.payForm(this.model.id,money,this.model.status,this.model.meetingTopic)
        }
        this.backmoney = ()=>{
            if(!this.reason){
                Msg.setText('请输入取消原因')
                return false;
            }
            Proxy.updateStatus({orderId:this.model.id,orderStatus:6,remark:this.reason}).then(xhr=>{
                if(xhr.result){
                    Msg.setText('操作成功')
                    
                    setTimeout(()=>{
                        window.location.reload();
                     },1000)
               }else{
                 Msg.setText('操作失败')
               }
            })
        }
        this.endOrder = ()=>{
           
            Proxy.updateStatus({orderId:this.model.id,orderStatus:5}).then(xhr=>{
                if(xhr.result){
                    Msg.setText('操作成功')
                    
                    setTimeout(()=>{
                        window.location.reload();
                     },1000)
               }else{
                 Msg.setText('操作失败')
               }
            })
        }
    }
    return Detail;
}
detailOrderServive.$inject = ['$rootScope','$state','$stateParams','proxy'];
export default angular.module('detailOrderServive',[]).service('detailOrderServive',detailOrderServive).name;