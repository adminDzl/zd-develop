
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function thingsService($rootScope,$state,BaseService){     
    var service = new BaseService();
    function Things(){
        this.model = {name:'',params:'',amount:'',freeType:'',price:'0',unit:''};
      
    }
    Things.prototype.resetData = function(){
        this.model =  {name:'',params:'',amount:'',freeType:'',price:'0',unit:''};
    }
    Things.prototype.commit = function(modal,type){
        
        if(Tools.isEmpty(this.model.name)){
            Msg.setText('请输入物品名称');
            return false;
        }
        if(Tools.isEmpty(this.model.params)){
            Msg.setText('请输入参数');
            return false;
        }
        if(!Tools.isNumber(this.model.amount)){
            Msg.setText('请输入数量');
            return false;
        }
        if(Tools.isEmpty(this.model.freeType)){
            Msg.setText('请选择类型');
            return false;
        }
        if(!Tools.isAmount(this.model.price) && this.model.freeType=='2'){
            Msg.setText('请输入单价');
            return false;
        }
        if(Tools.isEmpty(this.model.unit)){
            Msg.setText('请输入单位');
            return false;
        }
        if(type=='add'){
            service.url = baseUrl+'things/addSave.do';
        }else if(type=='edit'){
            service.url = baseUrl+'things/updateSave.do';
        }
        
         
        service.data = this.model;
        service.success = function(xhr){
          if(xhr.result){
            $rootScope.$broadcast('datatables-reload')
            modal.close(1); 
          }else{
            
          }
          
          Msg.setText(xhr.message)
        }
         service.commit();
    }
    Things.prototype.del = function(data){
        service.url = baseUrl+'things/deleteById.do';
        service.data.id = data.id;
        service.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload');
                Msg.setText('删除成功')
            }else{
                Msg.setText('删除失败')
            }
           
        }
        service.commit();
    }
    Things.prototype.edit = function(data){
        
        this.model = data;
    }
    return Things;
}

 
 
thingsService.$inject = ['$rootScope','$state','baseService'];
export default angular.module('thingsService',[]).service('thingsService',thingsService).name;