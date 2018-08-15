




function datepickerDirective() {
    return {
        restrict: 'EA',
        scope:{
            model:'=',
            myformat:'=',
            required:'@',
            noMin:'='
        },
        template:'  <input type="text" readonly class="form-control" uib-datepicker-popup="{{format}}" lang="zh" ng-model="model"  is-open="popup1.opened" ng-required="required" close-text="关闭"'+
         ' clear-text="清空" current-text="今天" datepicker-options="opts" alt-input-formats="altInputFormats" /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button></span>' ,
        link: function ($scope, elem) {         
            $scope.format = $scope.myformat?$scope.myformat:"yyyy-MM-dd";         
            $scope.altInputFormats = ['yyyy-MM-dd'];
            if(!$scope.noMin){
                $scope.opts ={
                    minDate:new Date()
                }
            }
           
            $scope.popup1 = {
                opened: false
            };
            $scope.open1 = function () {
                $scope.popup1.opened = true;
            };
        }
    };
}

 

datepickerDirective.$inject = []
export default angular.module('datepickerDirective',[]).directive('datepickerDirective',datepickerDirective).name;