/**
 * 报事查询页面
 */
(function () {
	'use strict'

	app.controller('SortChiefListCtrl', function ($scope, $modal, $state, HttpUtils, ModalCtrl, modalCode, $element) {
		//配置分页基本参数
		$scope.paginationConf = {
			pageSize: 10,
			currentPage: 1
		};
		$scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
			getSortCheifList();
		});

		$scope.search = function (keys,e) {
			// if (e && e.keyCode !== 13)
			// 	return;
			// 	$scope.keys = keys;

			$element.find("button[ng-model='recordStatus']").removeClass("btn-status-bgc");
			var index = $scope.recordStatus ? $scope.recordStatus : 0;
			$element.find("#status" + index).addClass("btn-status-bgc");

			$scope.paginationConf.currentPage == 1 ? getSortCheifList() : $scope.paginationConf.currentPage = 1;
		}

		function getSortCheifList() {
			var keys = $scope.keys;
			var postData = {
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.pageSize,
				recordStatus: $scope.recordStatus,
				searchKeys: keys ? keys + "".split(' ').join('+') : ''
			}
			console.log(postData);

			HttpUtils.post('/pnc/sortchief/list', postData, function (datas) {
				console.log(datas);
				$scope.paginationConf.totalItems = datas.data.total;
				$scope.sortChiefList = datas.data.page.rows;
			})
		}

		$scope.changeStatus = function (index, type) {
			var data = $scope.sortChiefList[index];
			HttpUtils.post('/pnc/sortchief/updateSave', { id: data.id, recordStatus: type }, function (datas) {
				getSortCheifList();
			})
		};

		$scope.set = function (row) {
			HttpUtils.post('/pnc/sortchief/updateDefault', { sortChiefId: row.id}, function (datas) {
				getSortCheifList();
			})
		};

		$scope.addNew = function () {
			$state.go('app.type_manage_new');
		}

		$scope.update = function (data) {
			$state.go('app.type_manage_new', { chiefId: data.id });
		}
	})
})()