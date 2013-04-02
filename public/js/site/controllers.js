'use strict'

//admin controllers
function MainNavCtrl($scope, $location) {
  // Sets navbar item to active based on current route
  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

};

function PortfolioCtrl($scope, $location, $http) {
	$scope.fetchPaintings = function() {
		$http({method: 'GET', url: '../api/paintings'}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.paintingsList = data;
		    console.log($scope.paintingsList);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("problem fetching paintings");
		});
	}

	$scope.fetchPaintings();
};

function SliderCtrl($scope, $location, $http) {

};

function DetailCtrl($scope, $location, $http, $routeParams) {
	$scope.artworkId = $routeParams.id;
	$scope.fetchPainting = function() {
		$http({method: 'GET', url: '../api/painting/' + $scope.artworkId}).
			success(function(data, status, headers, config) {
				$scope.painting = data;
				console.log($scope.painting);
			}).
			error(function(data, status, headers, config) {
				console.log("problem fetching painting: ", status);
			});
	}

	$scope.fetchPainting();
};




