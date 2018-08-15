import Tools from '../../utils/tools.util';
function menuDirective(views) {
    return {
        restrict: 'E',
        templateUrl: views.menu,
        link:function($scope){
          
           $scope.isShow = Tools.getQuery('hide')=='true'?false:true;
         
           if($scope.isShow){
            angular.element('.app-content').css('margin-left','200px')
           }else{
            angular.element('.app-content').css('margin-left',0)
           }
         
        }
    };
}


menuDirective.$inject = ['views']
export default angular.module('menuDirective',[]).directive('menuDirective',menuDirective).name;