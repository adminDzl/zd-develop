
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function  bespeakService($rootScope,$state,BaseService) {
    function Bespeak(){
        this.model = {
            isFirstOpen:1,//1开启，0 关闭
            firstMoney:'',
            lastPayType:1,//1支付定金后 2会议开始前
            lastPayTime:'',//尾款支付时限
            refundFullTime:'',//全额退款时限
            refundLastTime:'',//只退尾款时限
            refundNoTime:'',//不退尾款时限
            meetingId:Tools.getMeetingId(),
            firstPayType:1,//1 分钟，2 工作日
            firstPayTime:'',//定金支付时限
            id:''
        }
        this.loadList();
    }
    Bespeak.prototype.saveOrUpdate = function(){
        if(this.model.isFirstOpen==1){
            if(!Tools.isNumber(this.model.firstMoney) || !Tools.isAmount(this.model.firstMoney)){
                Msg.setText('请输入定金金额，整数或带有小数点数值');
                return false;
            }
            if(!Tools.isNumber(this.model.firstPayTime)){
                Msg.setText('请输入时间，整数');
                return false;
            }
            if(!Tools.isNumber(this.model.refundFullTime) ){
                Msg.setText('请输入全额退款时限，整数');
                return false;
            }
        }
       
        if(!Tools.isNumber(this.model.refundLastTime) || !Tools.isAmount(this.model.refundLastTime)){
            Msg.setText('请输入只退尾款时限，整数');
            return false;
        }
        if(!Tools.isNumber(this.model.refundNoTime) || !Tools.isAmount(this.model.refundNoTime)){
            Msg.setText('请输入不退尾款时限，整数');
            return false;
        }
        
        var bs = new BaseService();
        bs.data = this.model;
       if(this.model.id==''){
         bs.url = baseUrl+"meetingsubscribe/addSave.do";
       }else{
        bs.url = baseUrl+"meetingsubscribe/updateSave.do";
       }
       
        bs.success = function(xhr){
            if(xhr.result){

            }else{
               
            }
            Msg.setText(xhr.message);
        }  
        bs.commit();
    }
    Bespeak.prototype.loadList = function (){
        var me = this;
        var bs = new BaseService();
        bs.data.meetingId = Tools.getMeetingId();
        bs.url = baseUrl+"meetingsubscribe/listmap.do";
        bs.success = function(xhr){
            if(xhr.result){
                if(xhr.data.data.length!=0){
                    me.model = xhr.data.data[0];
                    $rootScope.$apply();
                }
              
            }else{
                Msg.setText('载入数据失败');
            }
        }  
        bs.commit();
    }
    return Bespeak;
}
 
bespeakService.$inject = ['$rootScope','$state','baseService'];
export default angular.module('bespeakService',[]).service('bespeakService',bespeakService).name;