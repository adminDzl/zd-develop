
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function valuesService($rootScope,$state,BaseService,Proxy) {
   
    function Values (){
        this.addstype = [];
        this.getAddtype = ()=>{
            Proxy.queryAddserviceType().then(xhr=>{
                if(xhr.result){
                    this.addstype = xhr.data;
                    
                }
            })
        }
        this.list = [];
        this.params = {meetingId:Tools.getMeetingId(),serviceName:'',serviceTypeCode:''}
        this.paramss = {serviceName:'',serviceTypeCode:''}
    }
    Values.prototype.getAttach = function(id){
        var bs = new BaseService();
        bs.url = baseUrl+'attachinfo/findattach.do';
        bs.data.parentId = id;
        bs.data.type = 4;
        bs.success = function(xhr){
            // console.log(xhr)
        }
        bs.commit();
    }
    Values.prototype.del = function(data){
        let bs = new BaseService();
        bs.url = baseUrl+'meetingaddservice/deleteById.do';
        bs.data.id = data.id;
        
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload');
            }   
            Msg.setText(xhr.message)
        }
        bs.commit();
    }
    Values.prototype.saveOrUpdate = function(modal,commitType){
        let bs = new BaseService();
        bs.data.meetingId = Tools.getMeetingId();
        if(commitType=='add'){
            bs.url = baseUrl +'meetingaddservice/addSave.do'
        }else if(commitType=='edit'){
            bs.url = baseUrl +'meetingaddservice/updateSave.do'
        }
        let me =this;
        $('.checkchild').each(function(){
            let checked =  $(this).is(':checked');
            if(checked){
             let val = $(this).closest('tr').find('td').eq(0).find('input').val();
               
                bs.data.serviceId = this.value;
               
                bs.success = function(xhr){
                    if(xhr.result){
                        $rootScope.$broadcast('datatables-reload')
                        modal.close()
                    }
                    Msg.setText(xhr.message)
                }
                bs.commit()             
            }           
        })
       
    }
   
    return Values;
}
 
 
valuesService.$inject = ['$rootScope','$state','baseService','proxy'];
export default angular.module('valuesService',[]).service('valuesService',valuesService).name;