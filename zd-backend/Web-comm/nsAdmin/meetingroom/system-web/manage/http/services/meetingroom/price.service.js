
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
import Cache from '../../utils/cache.util';
function priceService($rootScope,$state,BaseService,Proxy,$timeout) {
  
    function Price(){
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
        this.opened =  Cache.get('price_manage_status')==0?false:true;//开启价格管理
        this.list = [];
        // var price_manage_status = Cache.get('price_manage_status');
        // if(price_manage_status!=null){           
        //     var opened = price_manage_status==0?false:true;  
        //     this.setStatus(opened);
        // }
       
    }
    Price.prototype.checkIsOpen = ()=>{
       
    }
    Price.prototype.setStatus = (openStatus)=>{
        this.opened = openStatus;
        
         
    }
    Price.prototype.resetData = function(){
        this.priceModel = {
            priceType:'1',// 1 按时长  2按时段
            timeLong:'',
            startTime:'',
            endTime:'',
            priceMoney:'',
            status:1,
            meetingId:''
        }
       
        this.priceModel.meetingId = Tools.getMeetingId();
    }
    Price.prototype.setOpenStatus = function(){
      //  this.opened = !this.opened;
      this.setOpen();
         
    }
    Price.prototype.saveOrUpdate = function(modal,type){
        if(this.priceModel.priceType=='1'){
            if(Tools.isEmpty(this.priceModel.timeLong)){
                Msg.setText('请填写时长');
                return false;
            }
        }else {
            if(Tools.isEmpty(this.priceModel.startTime) &&Tools.isEmpty(this.priceModel.startTime) ){
                Msg.setText('请选择时段');
                return false;
            }
        }
        if(Tools.isEmpty(this.priceModel.priceMoney)){
            Msg.setText('请填写价格');
            return false;
        }
        var bs = new BaseService();
        if(type=='add'){
            bs.url = baseUrl+'meetingprice/addSave.do';
        }else if(type=='edit'){
            bs.url = baseUrl+'meetingprice/updateSave.do';
        }
       
        bs.data =this.priceModel;
      
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload')
                modal.close(1); 
              }else{
                
              }
              
              Msg.setText(xhr.message)
        }
        bs.commit();
    }
    Price.prototype.setOpen = function(){
         var data = {};
         data.id = Tools.getMeetingId();
         data.type= 2;
         data.status  =this.opened?1:0// this.priceModel.status;
        
        Proxy.setRoomAttr(data).then(xhr=>{
            if(xhr.result){
                // this.opened = true;
              
                Tools.priceManageStatus( data.status)
            }else{
                // this.opened = false;
                // $rootScope.$apply()
                Msg.setText('设置是否开启价格管理失败')
            }
        })
    }
    Price.prototype.del = function(data){
            var bs = new BaseService();
            bs.url = baseUrl+'meetingprice/deleteById.do';
            bs.data.id = data.id;
            bs.success = function(xhr){
                if(xhr.result){
                    $rootScope.$broadcast('datatables-reload')
                }
                Msg.setText(xhr.message)
            }
            bs.commit();
    }
   
    return Price;
}
 
priceService.$inject = ['$rootScope','$state','baseService','proxy','$timeout'];
export default angular.module('priceService',[]).service('priceService',priceService).name;