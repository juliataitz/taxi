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

//         var insert_data = {'snow_min': $scope.snow_min, 'snow_max': $scope.snow_max, 'rain_min': $scope.rain_min, 'rain_max': $scope.rain_max, 'temp_min': $scope.temp_min, 'temp_max': $scope.temp_max, 'wind_min': $scope.wind_min, 'wind_max': $scope.wind_max};
      
//         var request = $http({
//             url: '/show/'+ $scope.snow_min + '/' + $scope.snow_max + '/' + $scope.rain_min + '/' + $scope.rain_max + '/' + $scope.temp_min + '/' + $scope.temp_max + '/' + $scope.wind_min + '/' + $scope.wind_max,
//             method:'Get',
//             data: insert_data
//         });
		var request = $http.get('/show/'+ $scope.snow_min + '/' + $scope.snow_max + '/' + $scope.rain_min + '/' + $scope.rain_max + '/' + $scope.temp_min + '/' + $scope.temp_max + '/' + $scope.wind_min + '/' + $scope.wind_max);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});