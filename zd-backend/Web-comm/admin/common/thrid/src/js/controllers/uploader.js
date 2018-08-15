app.controller('UploaderController', function($scope, fileReader) {
	$scope.getFile = function() {
		fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
			$scope.imageSrc = result;
		});
	};

	var postData = {
		vacationType : $scope.leave.type,
		reason : $scope.leave.reason,
		familyRelation : +$scope.leave.type == 7 ? $scope.leave.relation : "",
		startTime : startTime,
		endTime : endTime,
		fileName : $scope.imageSrc,
		workDelivers : workDelivers,
		ccmailNickNames : sendPersons,
		realDays : +$scope.leave.type == 8 ? $scope.leave.timeLong : ""
	};
	var promise = postMultipart('/maldives/leave/save', postData);
	function postMultipart(url, data) {
		var fd = new FormData();
		angular.forEach(data, function(val, key) {
			fd.append(key, val);
		});
		var args = {
			method : 'POST',
			url : url,
			data : fd,
			headers : {
				'Content-Type' : undefined
			},
			transformRequest : angular.identity
		};
		return $http(args);
	}
});

app.factory('fileReader', [ "$q", "$log", function($q, $log) {
	var onLoad = function(reader, deferred, scope) {
		return function() {
			scope.$apply(function() {
				deferred.resolve(reader.result);
			});
		};
	};
	var onError = function(reader, deferred, scope) {
		return function() {
			scope.$apply(function() {
				deferred.reject(reader.result);
			});
		};
	};
	var getReader = function(deferred, scope) {
		var reader = new FileReader();
		reader.onload = onLoad(reader, deferred, scope);
		reader.onerror = onError(reader, deferred, scope);
		return reader;
	};
	var readAsDataURL = function(file, scope) {
		var deferred = $q.defer();
		var reader = getReader(deferred, scope);
		reader.readAsDataURL(file);
		return deferred.promise;
	};
	return {
		readAsDataUrl : readAsDataURL
	};
}]);