function proxy(BaseService){
    this.bs = new BaseService();
    this.getRoomTypes =function(data){
       return this.bs.submit('/meetingroom/droproomtype.do',data)
    }
    this.delById = function(opUrl,data){
        return this.bs.submit('/'+opUrl+'/deleteById.do',data)
    }
    this.findById = function(opUrl,data){
        return this.bs.submit('/'+opUrl+'/findById.do',data)
    }
    this.setRoomAttr = function(data){
        return this.bs.submit('/meetingroom/roomattr.do',data);
    }
    this.getUseTypes = function(data){
        return this.bs.submit('/meetingroom/droproomuse.do',data)
    }
    this.getLayOut = function(data){
        return this.bs.submit('/meetingroom/droproomlayout.do',data)
    }
    this.add = function(opUrl,data){
        return this.bs.submit('/'+opUrl+'/addSave.do',data)
    }
    this.update = function(opUrl,data){
        return this.bs.submit('/'+opUrl+'/updateSave.do',data)
    }
    this.saveOrUpdate= function(opUrl,data,type){
        if(type=='add'){
            return this.add(opUrl,data)
        }else if(type=='edit'){
            return this.update(opUrl,data)
        }
    }

    this.delAttachById = (data)=>{
        return this.bs.submit('/attachinfo/deleteById.do',data);
    }
    this.getAddServiceList= (data)=>{
       return this.bs.submit('/addservice/listmap.do',data)
    }
    this.findMeetingByTime = (data)=>{
        return this.bs.submit('/meetingorder/findMeetingByTime.do',data)
    }
    this.saveOrder = (data)=>{
        return this.bs.submit('/meetingorder/saveOrderInfo.do',data);
    }
    this.getThingsByType = (data)=>{
        return this.bs.submit('/api/meetingroom/queryThingByMeeting.do',data)
    }
    this.getTimePrice = (data)=>{
        return this.bs.submit('/api/meetingroom/queryPriceByTime.do',data)
    }
    this.getRoomUseType = (data)=>{
        return this.bs.submit('/meetingorder/findLayoutType.do',data)
    }
    this.getCompany = (data)=>{
        // return new Promise(function(resole,reject){
        //     resole({result:true,data:[{name:'会玩科技',id:3}]} )
        // })
        return this.bs.submit('/meetingorder/findCompanyByUser.do')
    }
    this.addUser = (data)=>{
        return this.bs.submit('/personinfo/addSave.do',data);
    }
    this.editUser = (data)=>{
        return this.bs.submit('/personinfo/updateSave.do',data)
    }
    this.queryMember = (data)=>{
        return this.bs.submit('/personinfo/queryMember.do',data);
    }
    this.queryRooms = (data)=>{
        data.start = 1;
        data.length = 1000;
        return this.bs.submit('/meetingroom/listmap.do',data)
    }
    this.dataGroup = (data)=>{
        return this.bs.submit('/dictionarygroup/listmap.do',data);
    }
    this.queryOrderById = (data)=>{
        return this.bs.submit('/meetingorder/queryOrderDetailById.do',data)
    }
    this.queryAddserviceType  = (data)=>{
        return this.bs.submit('/addservice/dropservicetype.do',data)
    }
    this.findThings = (data)=>{
        return this.bs.submit('/meetingtings/findThingsList.do',data)
    }
    this.findAddService =(data)=>{
        return this.bs.submit('/meetingorder/findAddService.do',data);
    }
    this.additionalService = (data)=>{
        return this.bs.submit('/meetingorder/additionalService.do',data)
    }
    this.updateOrderAddservice = (data)=>{
        return this.bs.submit('/meetingorder/updateOrderAddservice',data)
    }
    this.updateOrderThings = (data)=>{
        return this.bs.submit('/meetingorder/updateOrderThings.do',data)
    }
    this.setPowerForMem = (data)=>{
        return this.bs.submit('/personinfo/setPowerForMem.do',data)
    }
    this.queryPersonDetail = (data)=>{
        return this.bs.submit('/personinfo/queryPersonDetail.do',data)
    }
    this.queryTakeOrderPerson =(data)=>{
        return this.bs.submit('/meetingorder/queryTakeOrderPerson.do',data)
    }
    this.allotOrder = (data)=>{
        return this.bs.submit('/meetingorder/allotOrder.do',data)
    }
    this.updateStatus = (data)=>{
        /*
        orderId 订单id
        orderStatus 订单状态 1、预支付定金 2、定金支付 3、尾款支付 4、取消待退款 5、完成 6、关闭
        payType 当订单状态为 2 或 3 时必传 支付方式 1、企业月结 2、现场支付 3、微信支付 4、支付宝支付
        payStyle 当订单状态为 2 或 3 时必传 1、定金支付 2、尾款支付
        payMoney 当订单状态为 2 或 3 时必传 支付金额*/
       return this.bs.submit('/meetingorder/updateStatus.do',data)
    }
    this.findShowInfoById = (data)=>{
        return this.bs.submit('/showinfo/findById.do',data)
    }
    this.delShowInfoById =(data)=>{
        return this.bs.submit('/showinfo/deleteById.do',data)
    }
    this.screen  = (data)=>{
        return this.bs.submit('/meetingroom/roomShowInfo.do',data)
    }
    this.testPay = (data)=>{
        /**
         * orderId
         * payType 支付方式 1、企业月结 2、现场支付 3、微信支付 4、支付宝支付
         * payStyle 1、定金支付 2、尾款支付 3、退款
         * payMoney
         */
        return this.bs.submit('/api/meetingroom/orderPayTemp.do',data)
    }
    //幻灯片
    this.request = (url,data)=>{
        return this.bs.submit(url,data)
    }


    this.statuscount = (data)=>{
        return this.bs.submit('orderstatistics/statuscount.do',data)
    }
    this.roomusecount = (data)=>{
        return this.bs.submit('orderstatistics/roomusecount.do',data)
    } 
    this.incomesource = (data)=>{
        return this.bs.submit('orderstatistics/incomeSource.do',data)
    }
    this.incomeadd = (data)=>{
        return this.bs.submit('orderstatistics/incomeAdd.do',data)
    }
    this.orderadd = (data)=>{
        return this.bs.submit('orderstatistics/orderIncomeAdd.do',data);
    }
    this.financeStatistics = (data)=>{
        return this.bs.submit('orderstatistics/financeStatistics.do',data);
    }
    this.payForm = function(orderId,money,status,desc){
       
        var form = angular.element('#payform');
        form[0].payFee.value = money;
        form[0].orderNo.value=orderId+'_'+status+'_'+new Date().getTime();
        form[0].desc.value =desc;
        form[0].returnUrl.value= window.payNoitfy+'#/manage/detailorder/'+orderId;      
        form[0].submit()
    }
}
 

proxy.$inject = ['baseService'];
export default angular.module('proxy',[]).service('proxy',proxy).name;