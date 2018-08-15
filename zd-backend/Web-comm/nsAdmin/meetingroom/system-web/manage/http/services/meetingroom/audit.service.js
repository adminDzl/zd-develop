
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
import Cache from '../../utils/cache.util';
function auditService($rootScope,$state,BaseService,Proxy,$timeout) {
  
    function Audit(){
        this.params = {meetingId:Tools.getMeetingId()}
        this.priceModel = {
            priceType:'1',// 1 按时长  2按时段
            timeLong:'',
            startTime:'',
            endTime:'',
            priceMoney:'',
            status:1,
            meetingId:''
        }
        this.opened =  Cache.get('audit_manage_status')==0?false:true;//开启价格管理
        this.list = [];
           var audit_manage_status = Cache.get('audit_manage_status');
           if(audit_manage_status!=null){           
               var opened = audit_manage_status==0?false:true;  
               this.setStatus(opened);
           }
       
    }
    Audit.prototype.checkIsOpen = ()=>{
       
    }
    Audit.prototype.setStatus = (openStatus)=>{
        this.opened = openStatus;
    }
//  Price.prototype.resetData = function(){
//      this.priceModel = {
//          priceType:'1',// 1 按时长  2按时段
//          timeLong:'',
//          startTime:'',
//          endTime:'',
//          priceMoney:'',
//          status:1,
//          meetingId:''
//      }
//     
//      this.priceModel.meetingId = Tools.getMeetingId();
//  }
    Audit.prototype.setOpenStatus = function(){
      //  this.opened = !this.opened;
      this.setOpen();
         
    }
    Audit.prototype.setOpen = function(){
         var data = {};
         data.id = Tools.getMeetingId();
         data.type= 2;
         data.status  =this.opened?1:0// this.priceModel.status;
        
        Proxy.setRoomAttr(data).then(xhr=>{
            if(xhr.result){
                // this.opened = true;
              
                Tools.auditManageStatus( data.status)
            }else{
                // this.opened = false;
                // $rootScope.$apply()
                Msg.setText('设置是否开启审核管理失败')
            }
        })
    }
   
    return Price;
}
 
auditService.$inject = ['$rootScope','$state','baseService','proxy','$timeout'];
export default angular.module('auditService',[]).service('auditService',auditService).name;