
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
import Cache from '../../utils/cache.util';
function favourableService($rootScope,$state,BaseService,Proxy) {
  
    function Favourable(){
        this.params = {meetingId:Tools.getMeetingId()}
        this.favourableeModel = {
             status:1,
             meetingId:Tools.getMeetingId(),
             perferentialType:1,
             userScope:'',
             perferentialName:'',
             perferentialMargin:'',
             perferentialSocpe:''
        }
        this.useScopes = [{id:'1',name:'全部'},{id:'2',name:'场地租金'},{id:'3',name:'物品使用'},{id:'4',name:'增值服务'}]
        this.opened = Cache.get('perferential_manage_status')==0?false:true;//开启价格管理
        this.list = [];
    }
    
    Favourable.prototype.resetData = function(){
         
        this.favourableModel = {
            status:1,
            meetingId:Tools.getMeetingId(),
            perferentialType:1,
            perferentialName:'',
            userScope:'',
            perferentialMargin:'',
            perferentialSocpe:''
        }
        this.favourableModel.meetingId = Tools.getMeetingId();
    }
    Favourable.prototype.setOpenStatus = function(){
      //  this.opened = !this.opened;
      this.setOpen();
         
    }
    Favourable.prototype.saveOrUpdate = function(modal,type){
        
        if(Tools.isEmpty(this.favourableModel.perferentialName)){
            Msg.setText('请输入优惠名称');
            return false;
        }
        if(Tools.isEmpty(this.favourableModel.perferentialMargin)||!Tools.isNumber(this.favourableModel.perferentialMargin)||!Tools.isAmount(this.favourableModel.perferentialMargin)){
            Msg.setText('请输入优惠幅度，整数，或带小数点数值');
            return false;
        }
        if(Tools.isEmpty(this.favourableModel.perferentialType)){
            Msg.setText('请选择优惠类型');
            return false;
        }
        if(Tools.isEmpty(this.favourableModel.userScope)){
            Msg.setText('请选择适用范围');
            return false;
        }
         
      
         if(this.list.length==0){
            Msg.setText('请选择优惠范围');
            return false;
         }
       var  cs = this.list.join(',')
        
        this.favourableModel.perferentialSocpe = cs;
        this.favourableModel.useSocpe = this.favourableModel.userScope;
        
        var bs = new BaseService();
        if(type=='add'){
            bs.url = baseUrl+'meetingperferential/addSave.do';
        }else if(type=='edit'){
            bs.url = baseUrl+'meetingperferential/updateSave.do';
        }
       
        bs.data =this.favourableModel;
      
        bs.success = function(xhr){
            if(xhr.result){
                setTimeout(function(){
                    $rootScope.$broadcast('datatables-reload')
                }, 200);
               
                modal.close(1); 
              }else{
                
              }
              
              Msg.setText(xhr.message)
        }
        bs.commit();
    }
    Favourable.prototype.setOpen = function(){
        var data ={};
        data.id = Tools.getMeetingId();
        data.type= 3;
        data.status  =this.opened?1:0// this.favourableModel.status;
        
        Proxy.setRoomAttr(data).then(xhr=>{
            if(xhr.result){
                Tools.perferentialManage(data.status)
            }else{
                Msg.setText('设置是否开启优惠管理失败')
            }
        })
    }
    Favourable.prototype.del = function(data){
            var bs = new BaseService();
            bs.url = baseUrl+'meetingperferential/deleteById.do';
            bs.data.id = data.id;
            bs.success = function(xhr){
                if(xhr.result){
                    $rootScope.$broadcast('datatables-reload')
                }
                Msg.setText(xhr.message)
            }
            bs.commit();
    }
   
    return Favourable;
}
 
favourableService.$inject = ['$rootScope','$state','baseService','proxy'];
export default angular.module('favourableService',[]).service('favourableService',favourableService).name;