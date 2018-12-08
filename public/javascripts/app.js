var app = angular.module('angularjsNodejsTutorial',[]);


app.controller('boroughController', function($scope, $http) {
	$scope.message="";
	// request on start
	var request = $http.get('/borough/show_boroughs');
	request.success(function(data) {
		$scope.data = data;
	});
	request.error(function(data) {
		console.log('err');
	});

app.controller('habitController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {

        var insert_data = {'snow-min': $scope.snow-min, 'snow-max': $scope.snow-max, 'rain-min': $scope.rain-min, 'rain-max': $scope.rain-max, 'temp-min': $scope.temp-min, 'temp-max': $scope.temp-max, 'wind-min': $scope.wind-min, 'wind-max': $scope.wind-max};
      
        var request = $http({
            url: '/show/:'+ $scope.snow-min + '/' + $scope.snow-max + '/' + $scope.rain-min + '/' + $scope.rain-max + '/' + $scope.temp-min + '/' + $scope.temp-max + '/' + $scope.wind-min + '/' + $scope.wind-max,
            method:'Get',
            data: insert_data
        });
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});