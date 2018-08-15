
import Tools from '../../utils/tools.util';
function headDirective(views) {
    return {
        restrict: 'E',
        templateUrl: views.head,
        link: function ($scope, elem) {
            $scope.isShow = Tools.getQuery('hide')?false:true;
        }
    };
}

 
headDirective.$inject = ['views']
export default angular.module('headDirective',[]).directive('headDirective',headDirective).name;