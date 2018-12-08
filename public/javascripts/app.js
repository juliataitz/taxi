var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {

});

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
});