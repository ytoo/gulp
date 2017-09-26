angular.module("in_theatersModule",[])
  .controller("in_theatersCtrl",["$scope","$http","myService","$routeParams","$location",function ($scope,$http,myService,$routeParams,$location) {
    // $http发送同源数据的请求
    // $http({
    //   url:"js/in_theaters.json",
    //   method:"get"
    // }).then(function (res) {
    //   console.log(res);
    //   $scope.data = res.data;
    //   console.log($scope.data);
    // })

    var url = myService.url + "/v2/movie/in_theaters";
    // 根据路由参数获取到每一页的页码
    var page = $routeParams.page;
    // 每页请求10条数据
    var count = 10;
    // 每一页请求的起始数据下标为
    var start = (page - 1)*count;
    // 总共的页数为
    var totalPage = 0;

    // 利用服务里面定义的Jsonp发送跨域请求,由于数据是分页的，所以需要根据每一页不同的页码请求不同页的数据
    // 可以根据start 和 count的值，作为形参传入Jsonp
    //  360搜索的接口地址  https://sug.so.360.cn/suggest 传入的参数为{word:1}

    myService.Jsonp(url,
      {
        start:start,
        count:count
      },
      function (data) {
        console.log(data);
        $scope.data = data;
        // 由于这个Jsonp请求是用原生JS方法写的，angularjs监听不到数据的变化，所以需要调用$scope.$apply()，将数据的变化通知到angularjs
        $scope.$apply();

        // 在数据请求的成功的回调里面，计算出总页码
        totalPage = Math.ceil(data.total/data.count);
      });

    $scope.changePage = function (type) {
      if(type == "prev"){
        page --;
        if(page < 1){
          page = 1;
        }
      } else if(type == "next"){
        page ++;
        if(page > totalPage){
          page = totalPage;
        }
      }
      // 根据点击实现上下页的跳转，再跳转的时候，传入跳转的页码，
      // 这样在一开始渲染页面的时候，可以根据通过路由参数得到页码，根据页码去请求对应页面的数据
      $location.path("/in_theaters/" + page);
    }
  }])