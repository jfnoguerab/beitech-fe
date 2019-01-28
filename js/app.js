var app = angular.module('beitechFe', []);

app.controller('customersController', function($scope, $http) {
  $scope.customers = [
    { 'customer_id':1, 'name':"Pepe" },
    { 'customer_id':2, 'name':"Juan" },
    { 'customer_id':3, 'name':"Pedro" }
  ];

});