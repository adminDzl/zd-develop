 
require( '../../views/login/login.less');
function loginController($scope) {
    $scope.name = '';
    $scope.getAuthor = function (name) {
        $scope.author = name;
    };
    $scope.login = function(){
        alert(0)
    }
}

export default loginController;