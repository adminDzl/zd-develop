/**
 * 新增报事类型
 */
(function () {
	'use strict'
	var editUrl = '../nsAdmin/repairs/type/';
	app.controller('SortChiefNewCtrl', function ($scope, $modal, $state, $filter, $rootScope, $stateParams, Project, HttpUtils, ModalCtrl, modalCode, userChoose) {
		$scope.newData = {};
		$scope.title = "新增报事类型";
		$scope.tabs = [true, false, false, false];
		if ($stateParams.chiefId) {
			$scope.newData.id = $stateParams.chiefId;
			$scope.title = "修改报事类型";
		}

		var validateFlag = true;
		function initPage() {
			if (!$stateParams.chiefId) {
				return;
			}
			HttpUtils.get("/pnc/sortchief/findById", { id: $stateParams.chiefId }, function (initData) {
				$scope.newData = initData.data;
				$scope.newData.principalMobile = initData.data.mobile
				console.log('xxxxxxxxx',initData);
				$scope.newData.customerInfo = {
					id: null,
					name: initData.data.company
				}

				$scope.newData.userInfo = {
					id: null,
					name: initData.data.userName
				}
			})
		}
		initPage();

		$scope.baseFormSubmit = function () {
			if (!$scope.newData.customerInfo) {
				ModalCtrl.show('提示', '请选择公司!', modalCode.warning);
				return;
			}
			if (!$scope.newData.userInfo) {
				ModalCtrl.show('提示', '请选择负责人!', modalCode.warning);
				return;
			}
			if (!$scope.newData.principalMobile) {
				ModalCtrl.show('提示', '联系电话不能为空!', modalCode.warning);
				return;
			}
			else {
				var isOk = /^(13|15|18)\d{9}$/i.test($scope.newData.principalMobile);
				if (!isOk) {
					ModalCtrl.show('提示', '手机号输入有误!', modalCode.warning);
					return;
				}
			}
			if (!$scope.newData.name) {
				ModalCtrl.show('提示', '服务名称不能为空!', modalCode.warning);
				return;
			}
			if (!validateFlag) {
				ModalCtrl.show('提示', '服务名称重复!', modalCode.warning);
				return;
			}
			$scope.newData.principalUnitId = $scope.newData.customerInfo.id;
			$scope.newData.principalId = $scope.newData.userInfo.id;
			//此处保存无需处理subList
			delete $scope.newData.subList;
			var url = '/pnc/sortchief/addSave';
			if ($stateParams.chiefId) {
				url = '/pnc/sortchief/updateSave';
			}
			HttpUtils.post(url, $scope.newData, function (responseResult) {
				ModalCtrl.show('提示', '保存成功!', modalCode.success);
				//initPage();
				$state.go('app.type_manage_new', { chiefId: responseResult.data.id });
			})
		}

		//选择公司
		$scope.selectCustomer = function () {
			var site = {
				callback: function (data) {
					console.log(data);
					if (!$scope.newData.customerInfo) {
						$scope.newData.customerInfo = {};
					}
					$scope.newData.customerInfo = data;
					$scope.clearSelected();
				}
			}

			$modal.open({
				templateUrl: editUrl + '/select_customer_dialog.html',
				controller: 'repairSelectCustomerDialogCtrl',
				size: 'lg',
				backdrop: 'static',
				resolve: {
					site: function () {
						return site;
					}
				}
			})
		}

		$scope.clearCustomer = function () {
			$scope.newData.customerInfo = undefined;
		}

		$scope.validateName = function () {
			if (!$scope.newData.name) {
				return;
			}
			validateFlag = true;
			HttpUtils.post('/pnc/sortchief/validateName', { id: $scope.newData.id, name: $scope.newData.name }, function (responseResult) {
				if (responseResult.validate) {
					ModalCtrl.show('提示', '服务名称重复!', modalCode.warning);
					validateFlag = false
				}
			})
		}

		$scope.selectOrders = function () {
			if (!$scope.newData.customerInfo || !$scope.newData.customerInfo.id) {
				ModalCtrl.show('提示', '请选择公司!', modalCode.warning);
				return;
			}
			userChoose.chooseUser(function (user) {
				$scope.newData.userInfo = user;
				$scope.newData.principalMobile = user.mobile;
			}, $scope.newData.customerInfo.id)
		}

		$scope.clearSelected = function () {
			$scope.newData.userInfo = undefined;
			$scope.newData.principalMobile = "";
		}

		$scope.validateSaveBase = function () {
			if (!$stateParams.chiefId) {
				ModalCtrl.show('提示', '请先保存基本信息!', modalCode.warning);
				$scope.tabs[0] = true;
				return;
			}
		}
	})
})()
