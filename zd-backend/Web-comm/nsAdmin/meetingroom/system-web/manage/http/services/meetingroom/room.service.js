
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util'; 
function roomService($rootScope,$state,Proxy){
    var bean =  {
            "id":'',
            "name":"",
            "address":"",
            "area":'',
            "useType":"",
            "acreage":0,
            "openStartTime":"",
            "openEndTime":"",
            "pic":"",
            "displayPic":"",
            "description":"",
            "layType":"",
            "layTypeNum":0,
            "roomType":'',
            'roomTypeName':'',
            "roomTypeStr":'',
            'isOpen':0,
            "isDisplay":'',
            'tel':'',
            'weChat':'',
            "attach":"" 
    }
    function Room (){
        this.forEditRoomImgs = [];
        this.forEditShowImgs = [];
        this.useTypes = [];
        this.layTypes =[];
        this.roomTypes = [];
        this.roomImgs = [];//场地图
        this.showImgs = [];//显示屏
        this.attachs = [];
        this.roomModal = bean
    }
    Room.prototype.reset = function(){
        this.roomModal = null;
        this.roomModal =  {
            "id":'',
            "name":"",
            "address":"",
            "area":'',
            "useType":"",
            "acreage":0,
            "openStartTime":"",
            "openEndTime":"",
            "pic":"",
            "displayPic":"",
            "description":"",
            "layType":"",
            "layTypeNum":0,
            "roomType":'',
            'roomTypeName':'',
            "roomTypeStr":'',
            'isOpen':0,
            "isDisplay":'',
            'tel':'',
            'weChat':'',
            "attach":"" 
    }
    }
    Room.prototype.init = function(){
        this.loadLayType();
        this.loadUseType();
        this.loadRoomTypes();
            
    }
    
    Room.prototype.startEdit = function(data){
        Proxy.findById('meetingroom',{id:data.id}).then((xhr)=>{
            if(xhr.result){
                this.roomModal = xhr.data.entity;
                this.forEditRoomImgs = xhr.data.picList;
              
                this.forEditShowImgs = xhr.data.disPlayList;
                angular.forEach(xhr.data.picList,(it)=>{
                    this.roomImgs.push(it.id)
                })
                angular.forEach(xhr.data.disPlayList,(it)=>{
                    this.showImgs.push(it.id)
                })
                angular.forEach(this.layTypes,(it)=>{
                    if(it.id==this.roomModal.layType){
                        it.number = this.roomModal.layTypeNum;
                        it.checked = true
                         
                    }
                })
                if(xhr.data.useTypeList){
                    angular.forEach(this.useTypes,(it)=>{
                        angular.forEach(xhr.data.useTypeList,(its)=>{
                           
                            if(it.id==its.typeId){
                             
                                it.select = true;
                            }
                        })
                    })
                }
                // $rootScope.$broadcast('richedit', this.roomModal.description);
            }else{
                Msg.setText('')    
            } 
        })
        
    }
    Room.prototype.saveOrUpdate = function(commitType){
       
        if(Tools.isEmpty(this.roomModal.name)){
            Msg.setText('请输入场地名称');
            return false;
        }
        // if(Tools.isEmpty(this.roomModal.area)){
        //     Msg.setText('请输入场地区域');
        //     return false;
        // }
        if(Tools.isEmpty(this.roomModal.address)){
            Msg.setText('请输入场地地址');
            return false;
        }
        if(Tools.isEmpty(this.roomModal.roomType)){
            Msg.setText('请选择场地类型');
            return false;
        }
     
        var usts = [];
        angular.forEach(this.useTypes,(it)=>{
            if(it.select){
                usts.push(it.id)
            }
        }) 
        if(usts.length==0){
            Msg.setText('请选择用途');
            return false;
        }
        this.roomModal.useType = usts.join(',')
        if(Tools.isEmpty(this.roomModal.acreage)){
            Msg.setText('请输入场地面积');
            return false;
        }
        if(Tools.isEmpty(this.roomModal.layType)){
            Msg.setText('请选择摆放形式');
            return false;
        }
        angular.forEach(this.layTypes,(data)=>{
            if(data.checked){
                this.roomModal.layTypeNum = data.number;
            }
        })
        if(Tools.isEmpty(this.roomModal.layTypeNum)){
            Msg.setText('请选择容纳人数');
            return false;
        }       
        if(Tools.isEmpty(this.roomModal.openStartTime)||Tools.isEmpty(this.roomModal.openEndTime)){
            Msg.setText('请选择开放时间');
            return false;
        }
        if(parseInt(this.roomModal.openStartTime)>parseInt(this.roomModal.openEndTime)){
            Msg.setText('开时时间不能大于结束时间');
            return false;
        }
        this.roomModal.pic = this.roomImgs.join(',');
        if(Tools.isEmpty(this.roomModal.pic)){
            Msg.setText('请选择场地图片');
            return false;
        }
        this.roomModal.displayPic = this.showImgs.join(',')
        if(this.roomModal.isOpen==1 && Tools.isEmpty(this.roomModal.displayPic)){
            Msg.setText('请选择显示屏显示图片');
            return false;
        }
       this.roomModal.attach = this.attachs.join(',')
        if(Tools.isEmpty(this.roomModal.description)){
            Msg.setText('请输入场地介绍');
            return false;
        }
        if(Tools.isEmpty(this.roomModal.isDisplay)){
            Msg.setText('请选择场地状态');
            return false;
        }
        if(Tools.isEmpty(this.roomModal.tel)){
            Msg.setText('请填写联系电话');
            return false;
        }
    
        if(!Tools.isMobile(this.roomModal.tel)){
            Msg.setText('请输入正确格式的手机号码')
            return false;
        }
        if(Tools.isEmpty(this.roomModal.weChat)){
            Msg.setText('请填写联系微信号');
            return false;
        }
        
        
            Proxy.saveOrUpdate('meetingroom',this.roomModal,commitType).then((xhr)=>{
                Msg.setText(xhr.message)
                if(xhr.result){
                    if(xhr.data){
                        Tools.setMeetingId(xhr.data);
                        this.reset();
                    }              
                    setTimeout(function(){
                        $state.go('manage.meetingroom.pricemanage')
                    },1000)
                   
                }
                Msg.setText(xhr.message)
            })
            
       
       
        
      
    }
    Room.prototype.loadLayType = function(){
        Proxy.getLayOut().then((xhr)=>{
            if(xhr.result){
                this.layTypes = xhr.data;
               
            }else{
                Msg.setText('载入场地摆放形式数据失败')
            }
        })
        
    }
   
    Room.prototype.delAttach = function(it,type){
      
       
    
        
        Proxy.delAttachById({id:it.id,dataId:it.parentId,type:type}).then(res=>{
            if(res.result){
                Msg.setText('删除图片成功')
                if(type==1){
                    for(var key in this.roomImgs){
                        if(this.roomImgs[key]==it.id){
                             this.roomImgs.splice(key,1);
                        }                        
                    }
                    for(var key in this.forEditRoomImgs){
                        if(this.forEditRoomImgs[key].id==it.id){
                            this.forEditRoomImgs.splice(key,1)
                        }
                    }
               }else if(type==2){
                    for(var key in this.showImgs){
                        if(this.showImgs[key]==it.id){
                             this.showImgs.splice(key,1);
                        }
                    }
                    for(var key in this.forEditShowImgs){
                        if(this.forEditShowImgs[key].id==it.id){
                            this.forEditShowImgs.splice(key,1)
                        }
                    }
               }
               
            }else{
                Msg.setText('附件删除失败')
            }
        })
    }
    Room.prototype.loadRoomTypes = function(){
        Proxy.getRoomTypes().then((xhr)=>{
            if(xhr.result){
                this.roomTypes = xhr.data;
            }else{
                Msg.setText('载入场地摆放形式数据失败')
            }
        })
    }
    Room.prototype.loadUseType = function(){
        Proxy.getUseTypes().then((xhr)=>{
            if(xhr.result){
                this.useTypes = xhr.data;
                
            }else{
                Msg.setText('载入场地用途数据失败')
            }
        })
      
    }
    return Room;
}
 
roomService.$inject = ['$rootScope','$state','proxy'];
export default angular.module('roomService',[]).service('roomService',roomService).name;