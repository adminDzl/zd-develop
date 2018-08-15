/**
 * 状态说明：
 * 1、待支付定金，用户下单后但未支付预定金时的状态。
 * 2、预付定金，用户完成定金支付后状态。
 * 3、尾款支付完成，使用时间结束后状态。
 * 4、取消待退款。
 * 5、完成。
 * 6、关闭，客服手动关闭订单，或用户下单后未在规定时间内支付定金自动关闭订单。
 */
var mystatus = ['','定金待支付','定金已支付','尾款支付完成','取消待退款','订单已完成','订单已取消'];
function orderstatus(){
    return function(val){
        
       return mystatus[val];
    }
}
export default angular.module('orderstatus',[]).filter('orderstatus',orderstatus).name;