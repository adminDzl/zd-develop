
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
/**
 * 
 * @param {*增值服务}  
 * @param {*}  
 * @param {*} BaseService 
 */
function vasService($rootScope,$state,BaseService,Proxy){ 
    var bs = new BaseService();
    function Vas(){
        this.priceTypes = [{servicePriceType:'1',name:'元/人'},{servicePriceType:'2',name:'元/套'}];
        this.vasModal = {serviceTypeCode:'',serviceName:'',servicePriceType:'',servicePrice:'',attachMap:[],attach:'',id:''};
        this.serviceTypes = [];
        this.attach = [];
        this.loadServiceTypes();
    }
    Vas.prototype.addAttach = function(id){
        this.attach.push(id);
    }
    Vas.prototype.reset = function(){
        this.attach = [];
        this.vasModal = {serviceTypeCode:'',serviceName:'',servicePriceType:'',servicePrice:'',attachMap:[],attach:'',id:''};
    }
    Vas.prototype.loadServiceTypes = function(){
        //
        var me = this;
       
        bs.url = baseUrl +'addservice/dropservicetype.do';
        bs.success = function(xhr){
            if(xhr.result){
                me.serviceTypes = xhr.data;
                $rootScope.$apply();
            }else{
                Msg.setText('服务分类数据载入失败')
            }
        }
        bs.commit();
    }
    Vas.prototype.delAttachById = function(it){
      
        Proxy.delAttachById({id:it.id,dataId:it.parentId,type:4}).then(res=>{
            if(res.result){
                Msg.setText('删除图片成功')
                for(var key in this.attachList){
                    if(this.attachList[key].id ==it.id){
                        this.attachList.splice(key,1)
                    }
                }
                for(var key in this.attach){
                    if(this.attach[key]==it.id){
                        this.attach.splice(key,1)
                    }
                }
            }
            Msg.setText(res.message)
        })
    }
    Vas.prototype.getById =function(item){
        var dtd = $.Deferred();
        var me =this;
        bs.url = baseUrl+'addservice/findById.do';
        bs.data.id = item.id;
        bs.success = (xhr)=>{
            if(xhr.result){
               this.vasModal = xhr.data.entity;
              var spt = this.vasModal.servicePriceType;
              this.attachList =  xhr.data.attachList;
              if(this.vasModal.attach!=''){
                  let atts = this.vasModal.attach.split(',');
                  angular.forEach(atts,(it) => {
                      this.attach.push(it)
                  });
                //   angular.forEach(this.priceTypes,(it)=>{
                //       if(it.servicePriceType==spt){

                //       }
                //   })
              }
               dtd.resolve(); 
            }else{
                Msg.setText('读取详情失败')
            }
        }
        bs.commit();
        return dtd.promise();
    }
    Vas.prototype.del = function(item){
      
        bs.url = baseUrl+'addservice/deleteById.do';
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
    Vas.prototype.saveOrUpdate = function(modal,type){
        if(Tools.isEmpty(this.vasModal.serviceTypeCode)){
            Msg.setText('请选择分类');
            return false;
        }
        if(Tools.isEmpty(this.vasModal.serviceName)){
            Msg.setText('请输入服务名称');
            return false;
        }
        if(Tools.isEmpty(this.vasModal.servicePrice)){
            Msg.setText('请输入服务价格，例如10.5');
            return false;
        }
        if(Tools.isEmpty(this.vasModal.servicePriceType)){
            Msg.setText('选择价格类型');
            return false;
        }
        // if(Tools.isEmpty(this.vasModal.attach)){
        //     Msg.setText('请上传附件');
        //     return false;
        // }
        
        
        var ats = this.attach.join(',');
        
        
        this.vasModal.attach = ats;
        var me = this;
         
        bs.data = this.vasModal;
        bs.url = baseUrl +(type=='add'?'addservice/addSave.do':'addservice/updateSave.do');        
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload')
                modal.close(1); 
                me.vasModal = {serviceTypeCode:'',serviceName:'',servicePriceType:'',servicePrice:'',attachMap:[],attach:''};
              }              
              Msg.setText(xhr.message)
        }
        bs.commit();
    }

    return Vas;
}

 
vasService.$inject = ['$rootScope','$state','baseService','proxy'];
export default angular.module('vasService',[]).service('vasService',vasService).name;