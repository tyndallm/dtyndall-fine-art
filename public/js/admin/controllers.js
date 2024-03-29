'use strict'

//admin controllers
function AdminNavCtrl($scope, $location) {
  // Sets navbar item to active based on current route
  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

};

function PaintingsCtrl($scope, $location, $http) {
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
	};

	$scope.editPainting = function(paintingId){
		console.log("edit clicked for: ", paintingId);
		$location.path('/paintings/' + paintingId);
	}

	$scope.fetchPaintings();
};

function MailingListCtrl($scope, $location, $http, $dialog) {


	// Configure add subscriber modal
	$scope.opts = {
	    backdrop: true,
	    keyboard: true,
	    backdropClick: true,
	    templateUrl:  '/adminPartials/addsubscribermodal',
	    controller: 'MailingListModalCtrl'
	  };

	$scope.addSubscriber = function(){
		console.log("addSubscriber clicked!");
		var d = $dialog.dialog($scope.opts);
	    d.open().then(function(){
	      // refresh table
	      $scope.fetchMailingList();
	    });
	}

	$scope.fetchMailingList = function() {
		$http({method: 'GET', url: '../api/mailinglist' }).
			success(function(data, status, headers, config) {
				$scope.mailinglist = data;
				console.log($scope.mailinglist);
			}).
			error(function(data, status, headers, config) {
				console.log("problem fetching mailinglist: ", status);
			});
	}

	$scope.removeSubscriber = function(subscriberId) {
		$http({method: 'DELETE', url: '../api/removeSubscriber/' + subscriberId }).
			success(function(data, status, headers, config) {
				console.log(data);
				//refresh table
				$scope.fetchMailingList();
			}).
			error(function(data, status, headers, config) {
				console.log("problem deleting subscriber: ", status);
			});
	}

	$scope.fetchMailingList();


};

function MailingListModalCtrl($scope, $location, $http, dialog) {

	$scope.addSubscriber = function(subscriber){
		console.log(subscriber);
		$http({ url: '../api/subscriber',
				method: 'POST',
				data: { "first": subscriber.first,
						"last": subscriber.last,
						"email": subscriber.email,
						"customer": subscriber.customer
						 }
		}).success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.data = data;
		    console.log($scope.data);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    $scope.status = status;
		    console.log($scope.status);
		});
	}

	$scope.close = function(result){
	    dialog.close(result);
	  };
	
};

function EditPaintingCtrl($scope, $location, $http, $routeParams) {
	var paintingId = $routeParams.id;

	$scope.fetchPainting = function(id){
		$http({method: 'GET', url: '../api/painting/' + id}).
			success(function(data, status, headers, config) {
				$scope.artwork = data[0]; // returns an array of objects, we're only expecting one so we select the first one
				console.log($scope.artwork);
			}).
			error(function(data, status, headers, config) {
				console.log("problem fetching artwork: ", status);
			});

	};

	$scope.updatePainting = function(updatedPainting){
		$http({ url: '../api/painting',
				method: 'PUT',
				data: { 
					"title": "Test Painting",
				    "description": "This is a test painting. Lorem ipsum dolor it",
				    "price": "$1499.00",
				    "medium": "oiloncanvas",
				    "available": "true",
				    "image": "http://placehold.it/600x800.png",
				    "thumbImage": "http://placehold.it/175x175.png",
					"first": subscriber.first,
						"last": subscriber.last,
						"email": subscriber.email,
						"customer": subscriber.customer
						 }
		}).success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.data = data;
		    console.log($scope.data);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    $scope.status = status;
		    console.log($scope.status);
		});
	}

	$scope.fetchPainting(paintingId);
	
};