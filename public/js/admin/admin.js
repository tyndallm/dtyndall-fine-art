'use strict';


var app = angular.module('artistAdminApp', ['ui.bootstrap']).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		//make sure user is logged in
		// $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){  
		//     if ($scope.loggedIn == false && newValue != '/login'){  
		//         $location.path('/login');  
		//     }  
		// });

		//don't define controllers in both here and in partial!!!!!!!!!
		$routeProvider.when("/", { 
			templateUrl: "/adminPartials/dashboard"
		})
		$routeProvider.when("/login", {
			templateUrl: "/adminPartials/login"
		})
		$routeProvider.when("/paintings", {
			templateUrl: "/adminPartials/paintings"
		})
		$routeProvider.when("/mailinglist", {
			templateUrl: "/adminPartials/mailinglist"
		})
		$routeProvider.otherwise({redirectTo: '/'});

	  $locationProvider.html5Mode(true);
}]);
