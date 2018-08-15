
import Msg from '../utils/msg.util';

function baseController($rootScope,$scope){
    
}
 
baseController.$inject = ['$rootScope','$scope']
export default angular.module('baseController',[]).controller('baseController',baseController).name;