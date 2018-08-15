

function modalDirective(views,$rootScope) {
    $rootScope.cancel = function(){
        $rootScope.modalInstance.dismiss('cancel');  
    }
    return {
        restrict: 'E',
       scope:{
        modelId:'@',
        callback:'&',
        setting:'='
       },
        templateUrl: views.modal,
        link:function($scope){    
            
            var setting ={title:'提示',btnName:'确定',content:''}
           $scope.setting = angular.extend(setting,$scope.setting);
            $scope.yes = function(){
                
                if(typeof $scope.callback =='function'){
                    $scope.callback.call(this)
                }
                $('#'+$scope.modelId).modal('hide')
            }
             
        }
    };
}

 
modalDirective.$inject = ['views','$rootScope']
export default angular.module('modalDirective',[]).directive('modalDirective',modalDirective).name;