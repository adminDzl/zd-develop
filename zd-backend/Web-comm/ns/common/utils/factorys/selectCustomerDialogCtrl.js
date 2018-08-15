app.controller('SelectCustomerDialogCtrl',function(site,$scope,$modalInstance,modalCode,ModalCtrl,HttpUtils){
    var chkCustomer = undefined;
    var chkIndex = -1;
    $scope.hideAddress = site.hideAddress;
    $scope.paginationConf = {
        pageSize: 8,
        currentPage: 1
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
        getCustomerList();
    });

    $scope.close = function () {
        $modalInstance.close();
    }
    
    $scope.commit = function () {
        if(chkCustomer.chk){
            site.callback(chkCustomer);
            $modalInstance.close();
        }else{
            ModalCtrl.show('提示','请选择一个公司',modalCode.warning);
        }
    }

    $scope.checkRow = function(index){
    	if(chkIndex >= 0 && chkIndex != index){
    		$scope.customers[chkIndex].chk = false;
    	}
    	if(!$scope.customers[index].chk){
    		$scope.customers[index].chk = true;
    	}
    	else{
    		$scope.customers[index].chk = false;
    	}
    	chkIndex = index;
    	chkCustomer = $scope.customers[index];
    }

    $scope.searchFor = function () {
        $scope.paginationConf.currentPage == 1? getCustomerList():$scope.paginationConf.currentPage = 1;
    }
    
    function getCustomerList() {
        var postData = {
            pageSearchKeys:$scope.keys,
            pageNo: $scope.paginationConf.currentPage,
            pageSize: $scope.paginationConf.pageSize
        }

        HttpUtils.post('/smacunit/selectUnit.do',postData,function (res) {
            $scope.paginationConf.totalItems = res.data.total;
            $scope.customers = res.data.rows;
        })
    }		
})