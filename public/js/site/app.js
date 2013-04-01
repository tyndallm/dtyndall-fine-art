'use strict';


var app = angular.module('artistApp', ['ui.bootstrap']).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		$routeProvider.when("/", { 
			templateUrl: "/partials/home"
		})
		$routeProvider.when("/artwork/:id", {
			templateUrl: "/partials/artwork"
		})
		$routeProvider.when("/about", {
			templateUrl: "/partials/about"
		})
		$routeProvider.otherwise({redirectTo: '/'});

	  $locationProvider.html5Mode(true);
}]);