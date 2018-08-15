
import Cache from './cache.util';
var Tools = {};
Tools.isEmpty = function(str){
    if(typeof str =='undefined'){
        return true;
    }
    if(typeof str=='number'){
        return str.length==0;
    }
    
    return str.replace(/(^\s*)|(\s*$)/g, "").length ==0;
}
Tools.isNumber = function(num){
    return /^[0-9]*$/.test(num);
}
Tools.isAmount = function (num){
    return /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(num);
}
Tools.dataFormat = Tools.dateFormat = function(date,fmt){// 
    
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
}
Tools.getTimeLong = function (bt,et){
    var h1 = bt.split(':');
    var h2 = et.split(':');
    
    return (parseInt(h2[0])*60 + parseInt(h2[1]) )-(parseInt(h1[0])*60+parseInt(h1[1]))
}
Tools.setMeetingId =function(mid){
    Cache.put('mid',mid)
}
Tools.getMeetingId = function(){    
    return Cache.get('mid')||0;
}
Tools.getMeeting = function(){
    return Cache.get('edit_meetingroom_info')||null;
}
Tools.delLocalMeeting = ()=>{
    Cache.del('edit_meetingroom_info')
}
Tools.timeManage = function(value){
    Cache.put('time_manage_status',value);
}
Tools.perferentialManage = function(value){
    Cache.put('perferential_manage_status',value)
}
Tools.priceManageStatus = function(value){
    Cache.put('price_manage_status',value)
}
Tools.checkTimeRang = function(beginTime,endTime){
    if(beginTime && endTime){
       
        if(new Date(beginTime.replace(/\-/g, "\/")) > new Date(endTime.replace(/\-/g, "\/"))){
            return false;
        }else{
            return true;
        }
    }else {
        return true;
    }
}
Tools.arrRemove =function(arr,data){
    var index = arr.indexOf(data);
    arr.length--;
    return arr.splice(index+1,1)
}
Tools.getQuery=function(item){      
    var svalue = location.href.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)','i'));  
    return svalue?decodeURIComponent(svalue[1]):'';
};
//判断手机号
Tools.isMobile = function(val){
    //return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(val);
    return /^1\d{10}$/.test(val);
};
 
export default Tools;