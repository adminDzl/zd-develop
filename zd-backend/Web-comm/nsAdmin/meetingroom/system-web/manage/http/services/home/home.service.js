
import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util'; 
import Cache from '../../utils/cache.util';
function homeService($rootScope,$state,BaseService,Proxy){
    
    function Home(){
       
        this.placeTypes = [];
        this.params = {roomName:'',isDisplay:'',roomType:''}
        this.placeStatuses = [{name:'全部',isDisplay:''},{name:'展示',isDisplay:'1'},{name:'隐藏',isDisplay:'2'}]
        this.loadPlaceTypes();
    }
    Home.prototype.loadPlaceTypes = function(){
        Proxy.getRoomTypes().then((xhr)=>{
            if(xhr.result){              
                this.placeTypes = xhr.data;               
            }else{
                Msg.setText('场地类型数据载入失败')
            }
        })
        
    }
    Home.prototype.queryReset = function(){
        this.params = {roomName:'',isDisplay:'',roomType:''}
    }
    Home.prototype.query = function(){
        
        $rootScope.$broadcast('datatables-reload')
    }
    Home.prototype.del = function(data){
        Proxy.delById('meetingroom',{id:data.id}).then((xhr)=>{
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload');
                Msg.setText('删除成功')
            }else{
                Msg.setText('删除失败')
            }
        })
        
    }
    Home.prototype.set = function(data,row){
     
        var status = data.isDisplay ==1?2:1;
        Proxy.setRoomAttr({id:data.id,type:4,status:status}).then((xhr)=>{
          
            if(xhr.result){
                $rootScope.$broadcast('datatables-reload');                
            }else{
                Msg.setText('设置外屏展示失败')
            }
        })

        
    }
    return Home;
}
 
homeService.$inject = ['$rootScope','$state','baseService','proxy'];
export default angular.module('homeService',[]).service('homeService',homeService).name;