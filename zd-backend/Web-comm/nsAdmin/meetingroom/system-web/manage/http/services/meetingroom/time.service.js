
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
import Cache from '../../utils/cache.util';
function timeService($rootScope,$state,BaseService,Proxy) {
  
    function Times(){
        this.params = {meetingId:Tools.getMeetingId()}
        this.timesModel = {
            
            dateTime:new Date(),
            date:'',
            startTime:'',
            endTime:'',
            
            meetingStatus:1,
            meetingId:Tools.getMeetingId()
        }
        this.opened = Cache.get('time_manage_status')==0?false:true;//开启价格管理
        this.list = [];
    }
    
    Times.prototype.resetData = function(){
        this.timesModel = {
            
            dateTime:new Date(),
            startTime:'',
            endTime:'',
           
            meetingStatus:1,
            meetingId:Tools.getMeetingId()
        }
       
        this.timesModel.meetingId = Tools.getMeetingId();
    }
    Times.prototype.setOpenStatus = function(){
      //  this.opened = !this.opened;
       
        
           this.setOpen();
        
    }
    Times.prototype.saveOrUpdate = function(modal,type){
       
        var bs = new BaseService();
        if(type=='add'){
            bs.url = baseUrl+'meetingtime/addSave.do';
        }else if(type=='edit'){
            bs.url = baseUrl+'meetingtime/updateSave.do';
        }
        this.timesModel.date = Tools.dataFormat(this.timesModel.dateTime,'yyyy-MM-dd')
        bs.data =this.timesModel;
      
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
    Times.prototype.setOpen = function(){
        var data = {};
        data.id = Tools.getMeetingId();
        data.type= 1;
        data.status  =this.opened?1:0// this.timesModel.status;
        
        Proxy.setRoomAttr(data).then(xhr=>{
            if(xhr.result){
                Tools.timeManage(data.status)
            }else{
                Msg.setText('设置是否开启时间管理失败')
            }
        })
    }
    Times.prototype.del = function(data){
        var bs = new BaseService();
        bs.url = baseUrl+'meetingtime/deleteById.do';
        bs.data.id = data.id;
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload')
            }
            Msg.setText(xhr.message)
        }
        bs.commit();
    }
   
    return Times;
}
 
 
timeService.$inject = ['$rootScope','$state','baseService','proxy'];
export default angular.module('timeService',[]).service('timeService',timeService).name;