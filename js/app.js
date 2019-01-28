var app = angular.module('beitechFe', []);

app.controller('customersController', function($scope, $filter, $http) {
	$scope.customers = [];
	$scope.orderList = [];
	$scope.showData  = false;
	$scope.alert     = [{
		class:'danger',
		message:'',
		show:false
	}];
	$scope.alert.close=function(){
		this.show=false;
	};
	$scope.alert.modal=function($class,$message){
		this.class=$class;
		this.message=$message;
		this.show=true;
	};
	//Set Dates
	var today        = new Date();
	var startDate    = new Date(today.getFullYear(), today.getMonth(), 1);
	var endDate      = new Date(today.getFullYear(), today.getMonth()+1, 0);
	$scope.startDate = startDate;
	$scope.endDate   = endDate;
	//Url API REST
	var urlAPI = 'http://localhost/beitech-be/public/api';
	//Load all customers from API
	$http({
	  method: 'GET',
	  url: urlAPI + '/customers',
	  headers: {'Content-Type':'application/json;charset=utf-8'},
	  data:''//I need to include a body with the request. Angular removes the content-type header otherwise
	}).then(function successCallback(response) {
		if(response.data.status=='success'){
		    $scope.customers = response.data.data;
		}
	}, function errorCallback(response) {
		$scope.alert.modal('danger',response.data.message);
	});
	//Get filter customer orders by start date and end date
	$scope.getOrders = function (){
		$scope.alert.close();
		//Validation: Customer is selected
		if($scope.listCustomer!==undefined){
			$scope.showData  = false;
			var customer_id = $scope.listCustomer.customer_id;
			var urlFilter = '/customers/'+customer_id+'/orders';
			//Validation: Dates (Start and End)
			if($scope.startDate!=null && $scope.endDate!=null){
				var startDate = $filter('date')($scope.startDate, "yyyy-MM-dd");
				var endDate = $filter('date')($scope.endDate, "yyyy-MM-dd");
				urlFilter += '/'+startDate+'/'+endDate;
			}
			//Filter customer orders by start date and end date
			$http({
			  method: 'GET',
			  url: urlAPI + urlFilter,
			  headers: {'Content-Type':'application/json;charset=utf-8'},
			  data:''//I need to include a body with the request. Angular removes the content-type header otherwise
			}).then(function successCallback(response) {
				if(response.data.status=='success'){
					$scope.showData  = true;
				    $scope.orderList = response.data.data;
				}
			}, function errorCallback(response) {
				$scope.alert.modal('danger',response.data.message);
			});
		}else{
			$scope.alert.modal('danger',response.data.message);
		}
	}
});