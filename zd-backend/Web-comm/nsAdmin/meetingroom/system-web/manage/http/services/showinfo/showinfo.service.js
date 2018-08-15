
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
/**
 * 
 * @param {*外屏信息展示}  
 * @param {*}  
 * @param {*} BaseService 
 */
function showInfoService($rootScope,$state,BaseService,Proxy){ 
   
    function ShowInfo(){
        this.pics = [];
        this.times = 5;
        this.detail = [];
        this.showInfoModel = {date:new Date(),showDate:'',startTime:'',endTime:'',showTopic:'',picTime:''};
        this.showInfos = [];
        
    }
    ShowInfo.prototype.addPicTime = function(pid,timeStr){
        Msg.setText('上传图片成功，请及时保存当前操作')
          this.pics.push(pid)
        // angular.forEach(this.pics,function(it){
        //     if(it.id==''){
        //         it.id = pid
        //     }
        //     if(it.tm=='' && timeStr!=''){
        //         it.tm = timeStr;
        //     }
        // })
    }
    ShowInfo.prototype.reset = function(){
        this.detail = []
        this.showInfoModel = {showDate:'',date:new Date(),startTime:'',endTime:'',showTopic:'',picTime:''};
    }
   ShowInfo.prototype.delPic = function(data){
        
       Proxy.delAttachById({dataId:data.id,id:data.showPic,type:5}).then(xhr=>{
           if(xhr.result){
             this.detail = Tools.arrRemove(this.detail,data)
             Msg.setText('删除图片成功，请及时保存当前操作')
           }else{
            Msg.setText('删除失败')
           }
       })
   }
    ShowInfo.prototype.getById =function(item,foo){
       
         Proxy.findShowInfoById({id:item.id}).then(xhr=>{
             if(xhr.result){
                this.showInfoModel = xhr.data.entity;
                this.showInfoModel.date = new Date(this.showInfoModel.showDate);
               
                this.detail = xhr.data.detail;
                angular.forEach(this.detail,(it)=>{
                    console.log(it)
                    this.pics.push(it.showPic+'_'+it.showTime)
                })
                foo()
             }else{
                Msg.setText('读取详情失败')
             }
         })
    //    var dtd = $.Deferred();
    //    var me =this;
    //     bs.url = baseUrl+'showinfo/findById.do';
    //     bs.data.id = item.id;
    //     bs.success = function(xhr){
    //         if(xhr.result){
    //            me.showInfoModel = xhr.data.entity;
    //            me.showInfoModel.date = new Date(me.showInfoModel.showDate)
    //            dtd.resolve(); 
    //         }else{
    //             Msg.setText('读取详情失败')
    //         }
    //     }
    //     bs.commit();
    //     return dtd.promise();
    }
    ShowInfo.prototype.del = function(item){
       Proxy.delShowInfoById({id:item.id}).then(xhr=>{
        if(xhr.result){
            $rootScope.$broadcast('datatables-reload');
            Msg.setText('删除成功')
        }else{
            Msg.setText('删除失败')
        }
       })
      
    }
    ShowInfo.prototype.saveOrUpdate = function(modal,type){
       
        if(Tools.isEmpty(this.showInfoModel.showTopic)){
            Msg.setText('请输入主题名称');
            return false;
        }

        // if(Tools.isEmpty(this.showInfoModel.showDate)){
        //     Msg.setText('请选择展示日期');
        //     return false;
        // }
        
        if(Tools.isEmpty(this.showInfoModel.startTime)){
            Msg.setText('请选择开始时间');
            return false;
        }
        if(Tools.isEmpty(this.showInfoModel.endTime)){
            Msg.setText('请选择结束时间');
            return false;
        }
        
        var pics = [];
       
        
            angular.forEach(this.pics,(it)=>{
              
                pics.push(it+'_'+this.times)
            })
            if(pics.length==0){
                Msg.setText('请上传图片和播放时间');
                return false;
            }
            pics = pics.join(',')
       
       
        this.showInfoModel.picTime = pics;
        
         if(this.showInfoModel.date){
            this.showInfoModel.showDate =Tools.dataFormat(this.showInfoModel.date,'yyyy-MM-dd')
         }
        // if(Tools.isEmpty(this.showInfoModel.attach)){
        //     Msg.setText('请上传附件');
        //     return false;
        // }
        var url = (type=='add'?'showinfo/addSave.do':'showinfo/updateSave.do'); 
        Proxy.request(url,this.showInfoModel).then(xhr=>{
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload')
                modal.close(1); 
                this.pics = [];
                this.showInfoModel = {serviceTypeCode:'',serviceName:'',servicePriceType:'',servicePrice:'',attachMap:[],attach:''};
              }              
              Msg.setText(xhr.message)
        })
        
    }

    return ShowInfo;
}

 
showInfoService.$inject = ['$rootScope','$state','baseService','proxy'];
export default angular.module('showInfoService',[]).service('showInfoService',showInfoService).name;

