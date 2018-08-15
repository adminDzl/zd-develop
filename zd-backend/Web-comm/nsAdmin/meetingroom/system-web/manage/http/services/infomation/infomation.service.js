
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function infomationService($rootScope,$state,BaseService){
   
    
    function Infomation(){
        this.rooms = [];
      
        this.loadRooms();
    } 
    Infomation.prototype.update = function(){
        var bs = new BaseService();
       
        bs.url = baseUrl+'roominfo/updateSave.do';
        angular.forEach(this.rooms,function(it){
            if(it.mobile!='' || it.wechat!=''){
                bs.data  = it;
                
                bs.success = function(xhr){
                    if(xhr.result){
                        Msg.setText('编辑成功');
                    }else{
                        Msg.setText('编辑失败')
                    }
                }
                bs.commit()
            }
        })
    }
    Infomation.prototype.loadRooms = function(){
        var bs = new BaseService();
        var me = this;
        bs.url = baseUrl+'roominfo/listmap.do';
        bs.data = {start:0,length:2000};
        bs.success = function(xhr){
            if(xhr.result){
                me.rooms = xhr.data.data;
                $rootScope.$apply();
            }else{
                Msg.setText('载入场地信息出错')
            }
        }
        bs.commit();
    }
    return Infomation;
}
 
infomationService.$inject = ['$rootScope','$state','baseService'];
export default angular.module('infomationService',[]).service('infomationService',infomationService).name;