
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function ordersService($rootScope,$state,$stateParams,Proxy){
    function Orders(){        
        this.statusMap = [{v:'1',n:'定金待支付'},{v:'2',n:'定金已支付'},{v:'3',n:'尾款支付完成'},{v:'4',n:'取消待退款'},{v:'5',n:'订单已完成'},{v:'6',n:'订单已取消'},{v:'7',n:'待审核'},{v:'8',n:'已审核'},{v:'9',n:'已驳回'},{v:'10',n:'已派单'},{v:'11',n:'已完成'},{v:'12',n:'已评价'},{v:'12',n:'已取消'}]
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
            lastPayType:''}
        this.addsList = [];
        this.attach = [];
        this.company = {};
        this.lays = [];
        this.meetingRooms = [];
        this.params ={
            bTime:null,eTime:null,
            startDate:'',
            endDate:'',
            meetingName:'',
            companyName:'',
            serviceId:'',
            orderStatus:''
        }
        this.setAttach = (id)=>{
            this.attach.push(id);
        }
        this.getAddServiceList = ()=>{
            Proxy.getAddServiceList({}).then(xhr=>{
                if(xhr.result){
                    if(xhr.data&&xhr.data.data)
                    this.addsList = xhr.data.data;
                    
                }
            })
        }
        this.query = ()=>{
            if(this.params.bTime!=null && this.params.eTime!=null){
                if(this.params.bTime.getTime()>this.params.eTime.getTime()){
                    Msg.setText('开始时间不能大于结束时间')
                    return false;
                }             
                this.params.startDate = Tools.dateFormat(this.params.bTime,'yyyy-MM-dd');
                this.params.endDate = Tools.dateFormat(this.params.eTime,'yyyy-MM-dd')
            }else if(this.params.bTime!=null && this.params.eTime==null){
                this.params.startDate =Tools.dateFormat(this.params.bTime,'yyyy-MM-dd');
                this.params.endDate = "";
                Msg.setText('请选择结束时间');
                return false;
            }else if(this.params.bTime==null && this.params.eTime!=null){
                this.params.startDate ="";
                this.params.endDate =Tools.dateFormat(this.params.bTime,'yyyy-MM-dd');;
                Msg.setText('请选择开始时间');
                return false;
            } else{
                this.params.startDate ="";
                this.params.endDate = "";
            }
             $rootScope.$broadcast('datatables-reload')
        }
        this.init = ()=>{
            this.getAddServiceList();
        }
        this.getLayout = ()=>{
            Proxy.getLayOut({meetingId:this.model.meetingId}).then(xhr=>{
                if(xhr.result){
                    if(xhr.data.length>0)
                    this.lays = xhr.data[0];
                }
            })
        }
        this.frees = [];
        this.unfrees = [];
        this.getFreeThings = (type)=>{
            Proxy.getThingsByType({meetingId:this.model.meetingId,freeType:type}).then(xhr=>{
              if(xhr.result){
                  if(type==1){
                    this.frees = xhr.data
                  }else{
                    this.unfrees = xhr.data
                  }
              }
            })
        }
        this.selectThings = (it)=>{

        }
       this.initAdd = ()=>{
           Proxy.getCompany().then(xhr=>{               
               if(xhr.result && xhr.data.length>0){
                   this.model.companyName = xhr.data[0].name;
                   this.model.companyId = xhr.data[0].id;
               }
           })
        //    var date1 =  Tools.dateFormat(new Date('2017/12/20'),'yyyy-MM-dd');
        //    var date2 =  Tools.dateFormat(new Date(),'yyyy-MM-dd');
          
          
       }
       this.rooms = [];
       this.timelong = 0;
       this.getMeetingRoom = ()=>{
           if(!this.model.date || !this.model.beginTime || !this.model.endTime){
             Msg.setText('请选择预定时间')
             return false;
           }
          
           if(parseInt(this.model.beginTime ) >=parseInt(this.model.endTime)){
            Msg.setText('开始时间不能大于或等于结束时间')
            return false;
           }
           var date =   Tools.dateFormat(this.model.date,'yyyy-MM-dd');
           var beginTime = this.model.beginTime;
           var endTime  = this.model.endTime;
           this.timelong = (Tools.getTimeLong(beginTime,endTime))/60;
           var appointmentTime = date+'_'+beginTime+'_'+endTime;
            Proxy.findMeetingByTime({
                   startTime:beginTime,endTime:endTime
                }).then(xhr=>{
                    if(xhr.result){
                        if(xhr.data.length>0){
                            this.rooms = xhr.data;
                        }else{
                            Msg.setText('没有找到符合要求的场地')
                        }
                      
                    }else{
                        Msg.setText(xhr.message);
                    }
                })
          
       }
       this.queryPrice = ()=>{
        var date =   Tools.dateFormat(this.model.date,'yyyy-MM-dd');
        var beginTime = this.model.beginTime;
        var endTime  = this.model.endTime;
        var len= (Tools.getTimeLong(beginTime,endTime))/60;
        var tDate = this.model.date;
        var btarr = beginTime.split(':');
        tDate.setHours(btarr[0]);
        tDate.setMinutes(btarr[1]);
        tDate.setSeconds('0');
        var list =[]
        for(var i = 0 ; i < len*2;i++){          
            tDate.setMinutes(tDate.getMinutes()+30);
            list.push(Tools.dateFormat(tDate,'hh:mm'))
        }
        var spl = null;
        var timeStr = [];
       for(var i = 0; i <list.length;i++){        
            if(i>1){
                spl = list.slice(i-1, i + 1);
            }else{
                spl = list.slice(i, i + 2);                  
            }
            timeStr.push(spl[0]+'_'+spl[1])        
       }
    
        var appointmentTime = date+'_'+beginTime+'_'+endTime;
            Proxy.getTimePrice({meetingId:this.model.meetingId,appointmentTime:timeStr.join(','),companyId:this.model.companyId}).then(xhr=>{
                if(xhr.result){
                    this.model.subscribeMoney = xhr.data;
                }else{
                    Msg.setText(xhr.message)
                }
            })
       }
       this.useType = [];
       
       this.getRoomUseType = ()=>{
            Proxy.getRoomUseType({meetingId:this.model.meetingId}).then(xhr=>{
                if(xhr.result){
                    this.useType = xhr.data;
                }else{
                    Msg.setText(xhr.msg)
                }
            })
       }
       this.queryByMeeting = ()=>{
          
           if(this.model.meetingId){
            this.getFreeThings(1);
            this.getFreeThings(2);          
            this.getRoomUseType();
            this.queryPrice();
           }
            
        }
       this.commit = ()=>{
           if(!Tools.isMobile(this.model.contactPhone)){
             Msg.setText('请输入正确格式的电话号码')
            return false;
           }
           if(!Tools.isNumber(this.model.numbers)){
            Msg.setText('参会人数须为整数')
            return false;
           }
           if(this.model.numbers<1){
            Msg.setText('参会人数须大于0')
            return false;
           }
            var sids = [];
            var thingMoney = 0;
            angular.forEach(this.unfrees,(it)=>{
                if(it.select && it.number){
                    sids.push(it.id+'_'+it.number)
                    thingMoney += parseInt(it.number)* parseFloat(it.price)
                }
            })
            angular.forEach(this.frees,(it)=>{
                if(it.select && it.number){
                    sids.push(it.id+'_'+it.number)
                    
                }
            })
            
            sids = sids.join(',')
            this.model.orderMoney =  this.model.subscribeMoney+thingMoney
            this.model.thingIds = sids;
            if(this.attach.length){
                this.model.attach = this.attach.join(',')
            }            
          if(!this.model.useTypeId){
            Msg.setText('请选择场地用途')
            return false;
          }
            this.model.orderTime = Tools.dateFormat(this.model.date,'yyyy-MM-dd')+' '+this.model.beginTime+'_'+this.model.endTime;
            Proxy.saveOrder(this.model).then(xhr=>{
                if(xhr.result){
                    $state.go('manage.orders')
                }else{
                    Msg.setText(xhr.message)
                }
               
            })
           
       }
       this.users = [];
       
       this.queryTakeOrderPerson =(data)=>{
          
           return Proxy.queryTakeOrderPerson({meetingId:data.meetingId})
       }
       this.saveOrderFen = (order,modal)=>{
          var user = null;
           angular.forEach(this.users,(it)=>{
              if(it.select){
                user=it;
              }
           })
           if(user==null){
             Msg.setText('请选择管理人员');
             return false;
           }
           
            var data = {orderId:order.id,personId:user.id,personName:user.personName}
            Proxy.allotOrder(data).then((xhr)=>{
                if(xhr.result){
                    Msg.setText('分配成功')
                    $rootScope.$broadcast('datatables-reload')
                    modal.close()
                }else{
                    Msg.setText('分配失败')
                }
            })
       }
    }
    return Orders;

}
 
ordersService.$inject = ['$rootScope','$state','$stateParams','proxy'];
export default angular.module('ordersService',[]).service('ordersService',ordersService).name;