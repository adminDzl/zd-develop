 

import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function basedataService($rootScope,$state,BaseService,Proxy){
    var bs = new BaseService()
    function BaseData(){
        this.groupCode = '';//
        this.keyStr = '';
        this.groups = [];
        this.dataModal = {id:'',name:'',code:'',status:'',groupCode:''};
        this.groupModal = {id:'',name:'',code:'',status:''};
    } 
    BaseData.prototype.loadGroup = function(){
        Proxy.dataGroup({}).then(xhr=>{
            if(xhr.result){
                this.groups = xhr.data.data;        
           
            }
        })
        // var self  = this;
        // bs.url = baseUrl+'dictionarygroup/listmap.do';
        // bs.data.pageSize = 1000;
        // bs.success = function(xhr){
          
        //     if(xhr.result){
        //         self.groups = xhr.data.data;
        //     }else{
        //         Msg.setText('数据载入失败')
        //     }

        // }
        // bs.load();
    }
    BaseData.prototype.delGroup = function(item){
        bs.url = baseUrl+'dictionarygroup/deleteById.do';
        bs.data.id = item.id;
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload');
                Msg.setText('删除成功')
            }else{
                Msg.setText('删除失败')
            }
        }
        bs.commit();
    }
    BaseData.prototype.getText =function(text){
       
        this.dataModal.remark = text
    }
    BaseData.prototype.saveOrUpdateGroup = function(modal,type){
        var self = this;
        if(Tools.isEmpty(this.groupModal.name)){
            Msg.setText('请输名称');
            return false;
        }
        if(Tools.isEmpty(this.groupModal.code)){
            Msg.setText('请输入参数');
            return false;
        }
        
        if(type=='add') {
            bs.url = baseUrl+'dictionarygroup/addSave.do';
        }else{
            bs.url = baseUrl+'dictionarygroup/updateSave.do';
        }
        bs.data = this.groupModal;
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload')
                modal.close(1); 
              }              
              Msg.setText(xhr.message)
        }
        bs.commit();
    }
     
    BaseData.prototype.saveOrUpdateBase = function(modal,type){   
        var self = this;
        if(Tools.isEmpty(this.dataModal.name)){
            Msg.setText('请输名称');
            return false;
        }
        if(Tools.isEmpty(this.dataModal.code)){
            Msg.setText('请输入参数');
            return false;
        }
        if(Tools.isEmpty(this.dataModal.groupCode)){
            Msg.setText('请选择分组');
            return false;
        }
        if(type=='add') {
            bs.url = baseUrl+'dictionary/addSave.do';
        }else{
            bs.url = baseUrl+'dictionary/updateSave.do';
        }
        
        bs.data = this.dataModal;
        bs.success = function(xhr){
          if(xhr.result){
            $rootScope.$broadcast('datatables-reload')
            modal.close(1); 
            self.dataModal = {id:'',name:'',code:'',status:'',groupCode:''};
          }
          
          Msg.setText(xhr.message)
        }
        bs.commit();
    }
    BaseData.prototype.delBase = function(item){
        bs.url = baseUrl+'dictionary/deleteById.do';
        bs.data.id = item.id;
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload');
                Msg.setText('删除成功')
            }else{
                Msg.setText('删除失败')
            }
        }
        bs.commit();
    }
    

    return BaseData;
}
 
basedataService.$inject = ['$rootScope','$state','baseService','proxy'];
export default angular.module('basedataService',[]).service('basedataService',basedataService).name;