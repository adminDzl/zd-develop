 

var fileinput = require('bootstrap-fileinput');
var zh = require('bootstrap-fileinput/js/locales/zh');
import Msg  from '../../utils/msg.util';
require('bootstrap-fileinput/css/fileinput.min.css');
// var BaseService = require('../../services/base.service')
function filestyleDirective(view,BaseService){
    var bs = new BaseService();
    bs.url =baseUrl+'attachinfo/addSave.do';
    bs.data = {};
    return {
        restrict:'AE',
        scope:{
            onSuccess:'&',
            extention:'=',
            filetype:'=' //1、会议室图片 2、会议室展示图片3、会议室附件4、增值服务附件5、外屏展示信息图片6、订单附件
        },
        link: function ($scope, elem) {
           
            var extention = ['jpg', 'gif', 'png','jpeg','docx','doc','xls','xlsx'];
            if($scope.extention){
                extention = $scope.extention;
            }
            $(elem[0]).fileinput({
                language: 'zh',
                
                showUpload: false, 
                showPreview:true,
                uploadUrl:'https://file-test.yuanqu.cc:8080/fileserver/upload?isScaleImge=true',//http://filetest.qiyesq.com:8080/fileserver/upload?isScaleImge=true
                showUpload: true,
                showCaption:false,
                dropZoneEnabled:false,
                allowedFileExtensions:extention,//['jpg', 'gif', 'png','docx','doc','xls','xlsx'],
                maxFileCount: 10 
            }).on('fileuploaded',function(event, res){
                 
                
               if(res.response.data && res.response.data.length>0){
                   angular.forEach(res.response.data,function(file,i){
                    bs.data.storagePath = file.storagePath;
                    bs.data.fileName =  file.storagePath.substr(file.storagePath.lastIndexOf('\\')+1,file.storagePath.length) // res.files[i].name;
                    bs.data.postfix = file.postfix;
                    bs.data.imageHight = file.imageHight;
                    bs.data.imageWidth = file.imageWidth;
                    bs.data.type = $scope.filetype;
                    bs.success = function(xhr){
                        if(xhr.result){

                            if(typeof $scope.onSuccess =='function'){                                
                                $scope.onSuccess({data:xhr.data})//返回一个ID
                            }else{
                                Msg.setText('上传图片成功，请及时保存当前操作')
                            }
                        }else{
                            Msg.setText('图片上传失败')
                        }
                    }
                    bs.commit();
                })
               }else{
                Msg.setText('图片上传失败')
               }
             
            })
        }
    }
}
 
filestyleDirective.$inject = ['views','baseService']
export default angular.module('filestyleDirective',[]).directive('filestyleDirective',filestyleDirective).name;