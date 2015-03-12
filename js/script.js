/*global angular */

// PROTOTYPES//
var Staff = function () {
  "use strict";
};
Staff.prototype = {
  tip: 0,
  mealCount: 0,
  ATPM: 0
};

var Customer = function () {
  "use strict";
};
Customer.prototype = {
  basePrice: 0,
  tax: 0,
  subtotal: 0,
  tip: 0,
  tipPercent: 0,
  tipCash: 0
};

//ANGULAR START//
angular.module('myApp', ['ngMessages', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    "use strict";
    $routeProvider.when('/', {
      templateUrl: 'home.html',
      controller: 'homeCtrl'
    })
      .when('/new-meal', {
        templateUrl: 'new-meal.html',
        controller: 'newMealCtrl'
      })
      .when('/summary', {
        templateUrl: 'summary.html',
        controller: 'summaryCtrl'
      })
      .otherwise('/');
  }])
  .controller('newMealCtrl', ['$scope', function ($scope) {
    "use strict";
    //persistent earnings totals
    $scope.staff = new Staff();

    //creating customer object for future ng-repeat implementation
    $scope.customer = new Customer();

    //event on submit
    $scope.newMeal = function (input) {
      if ($scope.myForm.$submitted && $scope.myForm.$valid) {
        var taxRate, tipPercent, tipCash = 0;
        $scope.customer.basePrice = $scope.input.baseMealPrice;
        $scope.customer.tax = $scope.input.taxRate;
        taxRate = $scope.input.taxRate / 100;
        tipPercent = $scope.input.tipPercent / 100;
        //tipCash = $scope.input.tipCash;
        //  if (tipCash == 0) {
        //     $scope.customer.tipPercent = $scope.customer.basePrice * tipPercent;
        //  } else {
        //     $scope.customer.tipCash = tipCash;
        //  }
        $scope.customer.tipPercent = $scope.customer.basePrice * tipPercent;
        $scope.customer.subtotal = (taxRate * $scope.customer.basePrice) + $scope.customer.basePrice;

        $scope.staff.tip = $scope.staff.tip + $scope.customer.tipPercent;
        $scope.staff.mealCount += 1;
        $scope.staff.ATPM = $scope.staff.tip / $scope.staff.mealCount;
        $scope.input = {};
        $scope.myForm.$setPristine();
      }
    };
    //event on Cancel
    $scope.cancel = function () {
      $scope.input = {};
      $scope.myForm.$setPristine();
    };
    //event on Reset
    $scope.reset = function () {
      $scope.staff = new Staff();
      $scope.customer = new Customer();
      $scope.cancel();
    };
  }]);