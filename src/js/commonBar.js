angular.module("commonBarModule",[])
  .controller("navBarCtrl",["$scope","$location",function ($scope,$location) {
    $scope.isActive = "in_theaters";
    $scope.search = function () {
      // $location.path()可以自动将页面跳转至指定的锚点值页面(搜索页面需要关键字和页码)
      $location.path("/search/" + $scope.keyword + "/1");
    }
  }])