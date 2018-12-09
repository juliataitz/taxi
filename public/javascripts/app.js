var app = angular.module('angularjsNodejsTutorial',[]);

app.controller('zoneController', function($scope, $http) {
	$scope.message="";
	$scope.weathers=[
		{name:'Snow'},
		{name:'Rain'},
		{name:'Hot'},
		{name:'Cold'},
		{name:'Windy'}
	];
	$scope.myWeather = $scope.weathers[0];
	// request on start
	var request = $http.get('/zone/show_zones');
	request.success(function(data) {
		$scope.data = data;
	});
	request.error(function(data) {
		console.log('err');
	});

	// request for submit button
	$scope.Submit = function() {
		var request = $http.get('zone/'+$scope.zone.zone+'/'+$scope.myWeather.name);
		request.success(function(data2) {
			$scope.data2 = data2;
		});
		request.error(function(data2) {
			console.log('err');
		});
	};
});

app.controller('boroughController', function($scope, $http) {
	$scope.message="";
	$scope.weathers = [
		{name:'Snow'},
		{name:'Rain'},
		{name:'Hot'},
		{name:'Cold'},
		{name:'Windy'}
	];
	$scope.myWeather = $scope.weathers[0];
	// request on start
	var request = $http.get('/borough/show_boroughs');
	request.success(function(data) {
		$scope.data = data;
	});
	request.error(function(data) {
		console.log('err');
	});

	// request for submit button
	$scope.Submit = function() {
		// var request = $http.get('borough/'+$scope.borough.name+'/'+$scope.weather);
		var request = $http.get('borough/'+$scope.borough.name+'/'+$scope.myWeather.name);
		request.success(function(data2) {
			$scope.data2 = data2;
		});
		request.error(function(data2) {
			console.log('err');
		});
	};
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