angular.module("serviceModule",[])
  .service("myService",[function () {
    this.url = "https://api.douban.com";
    // 在服务里封装一个Jsonp方法，用来发送跨域请求。
    // （因为angularjs本身用来发送跨域请求的$http.jsonp（）方法返回的回调函数的名字带"."，而豆瓣接口接受的回调函数不支持带"."的回调函数，所以需要自己封装JSONP）
    this.Jsonp=function (url,data,callback) {
      var fn = "Jsonp" + Math.random().toString().replace(".","");
      window[fn] = callback;
      var str = "";
      for(var key in data){
        str += key + "=" + data[key] + "&";
      }
      var script = document.createElement("script");
      script.src= url + "?" + str + "callback=" + fn;
      document.body.appendChild(script);
      script.onload = function () {
        document.body.removeChild(script);
      }
    }
  }])