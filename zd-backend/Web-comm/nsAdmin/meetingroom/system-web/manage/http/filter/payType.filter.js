/**
 * 定金支付方式 1、企业月结 2、现场支付 3、微信支付 4、支付宝支付
 */
var payStatus = ['','企业月结','现场支付','微信支付','支付宝支付']
function paytype(){
    return function(val){
       if(val){
           if(isNaN(val)){
               return val
           }
        return payStatus[val];
       }
       return '';
    }
}
export default angular.module('paytype',[]).filter('paytype',paytype).name;