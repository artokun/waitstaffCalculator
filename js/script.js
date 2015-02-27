angular.module('myApp', [])
  .controller('waitstaffCtrl', ['$scope', function ($scope) {
    //persistent earnings totals
    $scope.staff = {
      tip: 0,
      mealCount: 0
    };
    //creating customer object for future ng-repeat implementation
    $scope.customer = {
      subtotal: 0,
      tipPercent: 0,
      tipCash: 0
    };
    //event on submit
    $scope.newMeal = function (input) {
      var mealPrice, taxRate, tipPercent, tipCash = 0;
      mealPrice = $scope.input.baseMealPrice;
      taxRate = $scope.input.taxRate / 100;
      tipPercent = $scope.input.tipPercent / 100;
//      tipCash = $scope.input.tipCash;
//      if (tipCash == 0) {
//        $scope.customer.tipPercent = mealPrice * tipPercent;
//      } else {
//        $scope.customer.tipCash = tipCash;
//      }
      $scope.customer.tipPercent = mealPrice * tipPercent;
      $scope.customer.subtotal = (taxRate * mealPrice) + mealPrice;

      $scope.staff.tip = $scope.staff.tip + $scope.customer.tipPercent;
      $scope.staff.mealCount++;
      return meal;
    };

}]);