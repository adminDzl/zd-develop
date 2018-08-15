(function(){
	'use strict'
	app.directive("treeView",[function(){
		
		return{
			restrict:'E',
			templateUrl:'common/utils/toolsViews/tree_view.html',
			scope:{
				treeData: '=',
                canChecked: '=',
                levelChecked: '=',
                textField: '@',
                itemClicked: '&',
                itemCheckedChanged: '&',
                itemTemplateUrl: '@',
                ngModel: '=',  
			},
			controller:["$scope",function($scope){
				
				$scope.isItemExpended = false;				

                var checkedList = $scope.ngModel; 
                
				$scope.itemExpended = function(item, $event){
					
					$scope.isItemExpended = true;
					
                    item.isExpend = ! item.isExpend;
                    $event.stopPropagation();
                };

                $scope.getItemIcon = function(item){
                	
                	if(!$scope.isItemExpended){
                		item.isExpend = $scope.canChecked;
                	}
                	
                	if($scope.ngModel){
                		angular.forEach(checkedList,function(obj,i){
                    		if(obj.id == item.id){
                    			item.isChecked = true;
                    		}
                    	});
            		}
                	
                    var isLeaf = $scope.isLeaf(item);
                    
                    if(isLeaf){
                        return 'fa fa-leaf';
                    }

                    return item.isExpend ? 'fa fa-minus': 'fa fa-plus';
                };
                
                $scope.isLeaf = function(item){
                    return !item.children || !item.children.length;
                };

                /*$scope.chk = function(callback , item){
                    var itemId = item.id;

                };*/

                $scope.warpCallback = function(callback, item, $event){
                    ($scope[callback] || angular.noop)({
                        $item:item,
                        $event:$event
                    });
                };
                
                $('.treeView_ul').on("input[type='checkbox']").change(function($event) {
                	          
                	var _this = $($event.target);
                    var checked = _this.prop("checked"),
                            container = _this.parent().parent();

                    container.find("label").find('input[type="checkbox"]').prop({
                        indeterminate: false,
                        checked: checked
                    });

                    container.find("label").find('input[type="checkbox"]').each(function(){
                    	var chd = $(this).prop('checked');
                    	var id = $(this).val();
                    	var en = {
                            id:String(id),
                        }
                    	
                    	var list = checkedList;
                    	var checkFlag = true;
                    	angular.forEach(list,function(obj,i){
                    		if(obj.id == en.id){
                    			checkedList.splice(checkedList.indexOf(obj),1);
                    			checkFlag = false;
                    		}
                    	});
                    	
                    	if(checkFlag){
                        	checkedList.push(en);
                        }
                    	
                    });
                });
                $scope.ngModel = checkedList;
			}]
		};
		
	}]);
	
})();