app.controller('SelectServiceAddrDialogCtrl',function(site,$scope,$modalInstance,modalCode,ModalCtrl,HttpUtils){
    var chkAddr = undefined;
    var chkAddrs = [];
    $scope.paginationConf = {
        pageSize: 10,
        currentPage: 1
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
        getServiceAddrList();
    });

    $scope.close = function () {
        $modalInstance.close();
    }
    
    $scope.commit = function () {
        if(chkAddrs != null && chkAddrs.length > 0){
        	var result = {addrIds:"",addrNames:""};
        	angular.forEach(chkAddrs,function(addr,i){
        		result.addrIds += addr.id+",";
        		result.addrNames += addr.name+",";
        	});
            site.callback(result);
            $modalInstance.close();
        }else{
            ModalCtrl.show('提示','请选择一个服务大厅',modalCode.warning);
        }
    }

    $scope.checkRow = function(obj){
    	if(!obj.chk){
    		obj.chk = true;
    		chkAddrs.push(obj);
    	}
    	else{
    		obj.chk = false;
    		angular.forEach(chkAddrs,function(addr,i){
    			if(addr.id == obj.id){
    				chkAddrs.splice(i, 1);
    			}
    		});
    	}
    }

    $scope.searchFor = function (keys) {
        getServiceAddrList(keys);
    }
    
    function getServiceAddrList(keys) {
        var postData = {
            pageSearchKeys:keys,
            pageNo: $scope.paginationConf.currentPage,
            pageSize: $scope.paginationConf.pageSize
        }

        HttpUtils.post('/pscserviceaddr/list.do',postData,function (res) {
            $scope.paginationConf.totalItems = res.data.total;
            $scope.serviceAddrs = res.data.rows;
        })
    }		
})