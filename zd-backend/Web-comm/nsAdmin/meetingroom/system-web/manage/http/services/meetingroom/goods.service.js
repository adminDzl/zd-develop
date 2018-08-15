
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function goodsService($rootScope,$state,BaseService) {
    function Goods(){
        this.params = {meetingId:Tools.getMeetingId(),status:'',name:''}
        this.params1 = {meetingId:Tools.getMeetingId(),status:'',name:''}
        this.selectedGoods = [];
    }
    Goods.prototype.addSelect = function(data){
        data.meetingId = Tools.getMeetingId();
        this.selectedGoods.push(data)
       
    }
    Goods.prototype.del = function(data){
        let bs = new BaseService();
        bs.url = baseUrl +'meetingtings/deleteById.do';
        bs.data.id = data.id;
        bs.success = function(xhr){
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload')
            }
            Msg.setText(xhr.message)
        }
        bs.commit();
    }
    Goods.prototype.saveOrUpdate = function(modal,commitType){
       
        let bs = new BaseService();
        bs.data.meetingId = Tools.getMeetingId();
        if(commitType=='add'){
            bs.url = baseUrl +'meetingtings/addSave.do'
        }else if(commitType=='edit'){
            bs.url = baseUrl +'meetingtings/addSave.do'
        }
        let me =this;
        $('.checkchild').each(function(){
            let checked =  $(this).is(':checked');
           if(checked){
            let val = $(this).closest('tr').find('td').eq(7).find('input').val();
             
               bs.data.thingsId = this.value;
               bs.data.thingsAmount = val;
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
    Goods.prototype.checkSelect = function(id,select){
        angular.forEach(this.selectedGoods,function(it){
            if(it.id==id ){
                it.check =select?true:false;
            }
        });
    }
    return Goods;
}

 
goodsService.$inject = ['$rootScope','$state','baseService'];
export default angular.module('goodsService',[]).service('goodsService',goodsService).name;