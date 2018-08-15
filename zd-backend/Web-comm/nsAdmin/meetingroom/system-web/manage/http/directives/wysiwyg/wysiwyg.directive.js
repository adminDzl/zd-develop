 


var wysiwyg = require('bootstrap-wysiwyg');
  
 require('jquery-hotkeys')
function wysiwygeDirective(views){
    return {
        restrict:'EA',
        templateUrl:views.richedit,
        scope:{
            getText:'&',
            model:'='
        },
        link: function ($scope, elem) {
          
            var lock = false;
            var k = null;
            $scope.$on('$destroy',function(){
                modelwatch();
                richedit();
            })
           var richedit = $scope.$on('richedit',function(h,html){
               
                if(k==null){
                    k=$('#'+$scope.id )
                }
                 k.html(html)
           })
          var modelwatch =   $scope.$watch('model',function(v1,v2){
               if(lock){
                   return false;
               }
               lock = true;               
                if(k==null){
                    k=$('#'+$scope.id )
                }
               
                k.html(v1)
           })
            $scope.id = 'Id_'+new Date().getTime();
            setTimeout(function(){
                
                 k = $('#'+$scope.id );
                 k.wysiwyg()
                
                
            },1000)
            $scope._getText= function(){
             
                if(typeof $scope.getText =='function'){
                    $scope.getText({text:k.html()})
                }
              
               
            }
           
        }
    }
}
 
wysiwygeDirective.$inject = ['views']
 
export default angular.module('wysiwyge',[]).directive('wysiwyge',wysiwygeDirective).name;