app.controller('XeditableCtrl', function($scope, $filter, $http, editableOptions, editableThemes,HttpUtils,ModalCtrl,$state,modalCode){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
  
    $scope.statuses = [
      {value: 1, text: '下一节点'}
    ];

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
      return ($scope.user.status && selected.length) ? selected[0].text : ' ';
    };

    // editable table
    $scope.users = [
      {id: 1, name: '提交', status: undefined, group: null},
      {id: 2, name: '已分配', status: 1, group: null},
      {id: 3, name: '已成立', status: undefined, group: null},
      {id: 3, name: '已关闭', status: undefined, group: null}
    ];

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : ' ';
      } else {
        return user.groupName || ' ';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user && user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : ' ';
    };

    // $scope.checkName = function(data, id) {
    //   if (id === 2 && data !== 'awesome') {
    //     return "Username 2 should be `awesome`";
    //   }
    // };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('api/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length,
        name: '',
        status: 1,
        group: null,
        groupName:'已关闭'
      };
      $scope.users.splice($scope.users.length-2,0,$scope.inserted);
    };
    
    $scope.commit = function (sgn) {
      if(!sgn || sgn.length == 0){
        ModalCtrl.show("提示","请输入状态组名称",modalCode.warning);
      }else{
        var datas = {};
        datas.groupName = sgn;
        for(var i=0;i<$scope.users.length;i++){
          datas['fsList['+i+'].name'] = $scope.users[i].name;
          datas['fsList['+i+'].orderNo'] = i+1;
        }
        HttpUtils.post('/flowchief/addSave.do?responseFunction=addSave',datas,function () {
          $state.go('app.es-customprocess');
          ModalCtrl.show('提示','新增成功!',modalCode.success);
        },function () {
          console.log('失败');
        })
      }
    }
});
