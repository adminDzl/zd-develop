import Msg from '../../utils/msg.util';
import Tools from '../../utils/tools.util';
function staffService($rootScope,$state,$stateParams,Proxy){
    function Staffs(){
        this.staffs = [];
        this.model = {userId:null,personName:'',personPhone:'',personMail:'',power:0}
        this.params = {};
        this.rooms = [];
        this.setStaff = (id)=>{
            var index = this.staffs.indexOf(id)
            if(index!=-1){
                this.staffs.splice(index,1)
            }else{
                this.staffs.push(id)
            }           
        }
        this.commitEdit = (modal)=>{
            
            // this.model = {userId:null,personName:'',personPhone:''}
            if(Tools.isEmpty(this.model.personName)){
                Msg.setText('请输入姓名');
                return false;
            }
            if(Tools.isEmpty(this.model.personPhone)){
                Msg.setText('请输入电话');
                return false;
            }
            Proxy.editUser({id:this.model.id,userId:this.model.userId,personName:this.model.personName,personPhone:this.model.personPhone,personMail:this.model.personMail}).then(xhr=>{
                if(xhr.result){
                    $rootScope.$broadcast('datatables-reload')
                    modal.close();
                    Msg.setText(xhr.message)
                }else{
                    Msg.setText('修改员工失败')
                }
            })
        }
        this.addUser = (modal)=>{
            var ids = this.staffs.join(',');
            if(ids==''){
                Msg.setText('请选择人员')
                return false;
            }
            Proxy.addUser({userId:ids}).then(xhr=>{
                if(xhr.result){
                    $rootScope.$broadcast('datatables-reload')
                    modal.close();
                }else{
                    Msg.setText('新增员工失败')
                }
            })
        }
        this.init =()=>{
            Proxy.queryRooms({}).then(xhr=>{
                if(xhr.result){
                    this.rooms = xhr.data.data;                     
                }else {
                    Msg.setText('载入场地信息失败')
                }
            })
        }
        this.sysRoomData = ()=>{
            angular.forEach( this.rooms,(room)=>{
                angular.forEach(this.model.roomList,(it)=>{
                    if(room.id==it.id){
                        room.filter = true;
                    }
                })
            })
        }
        this.saveRole = (uim)=>{
            var power = [];
            if(this.role_view){
                power.push(1);
            }
            if(this.role_finish){
                power.push(2);
            }
            if(this.role_close){
                power.push(3);
            }
            if(power.length==0){
                Msg.setText('请选择权限')
                return false;
            }
            this.model.power = power.join(',')
            
            var list = [];
            angular.forEach(this.rooms,(room)=>{
                if(room.select){
                    list.push(room.id)
                    room.select = false;
                }
            })
            if(list.length==0){
                Msg.setText('请勾选负责场地')
                return false;
            }
              
            this.model.meetingId = list.join(',');
            this.model.personInfoId = this.model.id;
            Proxy.setPowerForMem(this.model).then((xhr)=>{
                if(xhr.result){
                    $rootScope.$broadcast('datatables-reload')
                    Msg.setText('保存成功');
                    uim.close()
                }else{
                    Msg.setText('保存失败')
                }

            })
        }
        this.viewDetail =(data)=>{           
            $state.go('manage.staffdetail',{id:data.id});           
        }
        this.person = {};
        this.meetings = [];
        this.inList = [];
        this.outList = [];
        this.role_view = false;
        this.role_finish = false;
        this.role_close = false;
        this.loadDetailById = (id)=>{
             Proxy.queryPersonDetail({personInfoId:id}).then(xhr=>{
                if(xhr.result){
                    this.person = xhr.data.person;
                    this.meetings = xhr.data.meeting;
                    if(xhr.data.orderList){
                        if(xhr.data.orderList.downList){
                            this.outList = xhr.data.orderList.downList
                        }
                        if(xhr.data.orderList.noList){
                            this.inList = xhr.data.orderList.noList;
                        }
                    }
            
                }else{
                    Msg.setText('载入信息出错')
                }
            })
        }
      
        
    }
    return Staffs;
}
staffService.$inject = ['$rootScope','$state','$stateParams','proxy'];
export default angular.module('staffService',[]).service('staffService',staffService).name;