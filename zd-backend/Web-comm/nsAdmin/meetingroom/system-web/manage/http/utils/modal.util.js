 


var Modal = {};
Modal.openModal = function($rootScope,$scope,$uibModal,templ){
    $rootScope.modalInstance = $uibModal.open({
        header: 'modal-title',
        ariaDescribedBy: 'modal-body',       
        templateUrl: templ,
        controller: ['$uibModalInstance',function($uibModalInstance){

        }],
        backdrop: "static",
        scope:$scope,
        size:'lg',
        animation:true
    });        
    $rootScope.modalInstance.result.then(function (selectedItem) {
        
    }, function () {
    
    });
}
export default Modal;