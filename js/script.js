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
angular.module('myApp', ['ngMessages', 'ngRoute', 'ngAnimate'])
  .config(['$routeProvider', function ($routeProvider) {
    "use strict";
    $routeProvider
      .when('/', {
        templateUrl: 'home.html'
      })
      .when('/new-meal', {
        templateUrl: 'new-meal.html',
        controller: 'newMealCtrl'
      })
      .when('/summary', {
        templateUrl: 'summary.html',
        controller: 'summaryCtrl'
      })
      .when('/error', {
        template: '<h2>Error - Page Not Found (404)</h2>'
      })
      .otherwise({
        redirectTo: '/error'
      });
  }])
  .run(function ($rootScope, $location, $timeout) {
    "use strict";
    $rootScope.$on('$routeChangeError', function () {
      $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function () {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      $timeout(function () {
        $rootScope.isLoading = false;
      }, 1000);
    });
  })
  .service('earningService', [function () {
    "use strict";
    var earnings = new Staff();
    this.addMeal = function (tip) {
      earnings.tip = earnings.tip + tip;
      earnings.mealCount += 1;
      earnings.ATPM = earnings.tip / earnings.mealCount;
      return earnings;
    };
    this.getStaffData = function () {
      return earnings;
    };
    this.resetStaffData = function () {
      earnings = new Staff();
      return earnings;
    };
  }])
  .controller('newMealCtrl', ['$scope', 'earningService', function ($scope, earningService) {
    "use strict";
    $scope.customer = new Customer();
    //event on submit
    $scope.newMeal = function (input) {
      if ($scope.myForm.$submitted && $scope.myForm.$valid) {
        var taxRate, tipPercent, tipCash = 0;
        $scope.customer.basePrice = $scope.input.baseMealPrice;
        $scope.customer.tax = $scope.input.taxRate;
        taxRate = $scope.input.taxRate / 100;
        tipPercent = $scope.input.tipPercent / 100;
        $scope.customer.tipPercent = $scope.customer.basePrice * tipPercent;
        $scope.customer.subtotal = (taxRate * $scope.customer.basePrice) + $scope.customer.basePrice;
        earningService.addMeal($scope.customer.tipPercent);
        $scope.cancel();
      }
    };
    //event on Cancel
    $scope.cancel = function () {
      $scope.input = {};
      $scope.myForm.$setPristine();
    };
  }])
  .controller('summaryCtrl', ['$scope', 'earningService', function ($scope, earningService) {
    "use strict";
    $scope.staff = earningService.getStaffData();
    //event on Reset
    $scope.reset = function () {
      $scope.staff = earningService.resetStaffData();
    };
  }]);