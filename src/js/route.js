angular.module("routeModule",[])
  .config(["$routeProvider",function ($routeProvider) {
    // 配置路由对象
    $routeProvider
    // 页码的参数占位符
    // 在设置了参数占位符的锚点地方，需要在被传入的模板链接中写入实际的参数(比如上一个页面是用一组a标签跳转链接，那么就需要a 标签里写入关于page的实际参数)
    // 但当用一个a标签表示一组跳转路劲时，可以先在a标签中设置第一页的参数，然后再在页面中的上下页按钮结合控制器中的$location.path()改变参数
      .when("/in_theaters/:page",{
        // 由于app.js文件最终是引入到index.html中，所以，这里的路径要根据index.html为相对目录
        templateUrl:"./views/in_theaters/in_theaters.html",
        controller:"in_theatersCtrl"
      })
      .when("/coming_soon/:page",{
        templateUrl:"./views/coming_soon/comingSoon.html",
        controller:"coming_soonCtrl"
      })
      .when("/search/:keyword/:page",{
        templateUrl:"./views/search/search.html",
        controller:"searchCtrl"
      })
      .otherwise("/in_theaters/1")
  }])