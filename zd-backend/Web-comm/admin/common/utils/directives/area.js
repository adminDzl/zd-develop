/**
 * luozhd 
 * 省市县联动
 * @returns
 */
(function(){
	'use strict'
	app.directive("cityLinkage",['$http',function($http){
		
		return {  
            restrict: 'E',  
            templateUrl: 'common/utils/toolsViews/cityLinkage.html',  
            replace: true,  
            scope: {  
            	ngModel: '=',  
            },  
            link: function(scope, ele, attrs) {  
            	
            	
            	$http.get("common/config/city-picker.json").success(function(data){
            		scope.cityData = data;
            		if(scope.ngModel && scope.ngModel.province){
            			for(var i in data){
                			if(scope.ngModel.province == data[i].name){
                				scope.province = data[i];            				
                			}
                		}
            		}
            		
            		if(scope.ngModel && scope.ngModel.city){
	            		for ( var i in scope.province.child) {
	            			if(scope.ngModel.city == scope.province.child[i].name){
	            				scope.city = scope.province.child[i];            				
	            			}
						}
            		}
            		if(scope.ngModel && scope.ngModel.district){
	            		for ( var i in scope.city.child) {
	            			if(scope.ngModel.district == scope.city.child[i].value){
	            				scope.district = scope.city.child[i];            				
	            			}
						}
            		}
            		
                });
            	
            	/*scope.$watch('district', function(newValue) {
                     scope.ngModel = {
                       "province" : scope.province || '',
                       "city" : scope.city || '',
                       "district" : scope.district || '',
                     };                     
                 });*/
            	
            	scope.getSelectProvince = function(){
            		scope.city = "";
                    scope.district = "";
                    scope.ngModel = {
	                    "province" : scope.province.name || '',
	                    "city" : scope.city.name || '',
	                    "district" : scope.district.value || '',
	                }; 
            	}
            	
            	scope.getSelectCity = function(){
                    scope.district = "";
                    scope.ngModel = {
	                    "province" : scope.province.name || '',
	                    "city" : scope.city.name || '',
	                    "district" : scope.district.value || '',
	                }; 
            	}
            	
            	scope.getSelectDistrict = function(){
                    scope.ngModel = {
	                    "province" : scope.province.name || '',
	                    "city" : scope.city.name || '',
	                    "district" : scope.district.value || '',
	                }; 
            	}
            	
            }  
  
        };  
	}]);
})();