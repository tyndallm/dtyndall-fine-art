'use strict';


var app = angular.module('artistAdminApp', []).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		//make sure user is logged in
		// $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){  
		//     if ($scope.loggedIn == false && newValue != '/login'){  
		//         $location.path('/login');  
		//     }  
		// });

		$routeProvider.when("/", { 
			templateUrl: "/adminPartials/dashboard"
		})
		$routeProvider.when("/login", {
			templateUrl: "/adminPartials/login"
		})
		$routeProvider.when("/paintings", {
			templateUrl: "/adminPartials/paintings"
		})
		$routeProvider.otherwise({redirectTo: '/'});

	  $locationProvider.html5Mode(true);
}]);
