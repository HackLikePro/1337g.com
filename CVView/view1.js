
angular.module('myApp.CVView', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'CVView/Network_CV.html',
    controller: 'NetWorkCtrl'
  });
}])
    .factory('DataSource', ['$http',function($http){
        return {
            getData: function(file,callback,transform){
                $http.get(
                    file,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
            }
        };
    }])
    .controller('NetWorkCtrl',['$scope','$http','DataSource',function($scope,$http,DataSource) {
      var SOURCE_FILE = "1337g.xml";
       xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        return json.profiles.profile;
      };

       setData = function(data) {
        $scope.dataSet = data;
      };

      DataSource.getData(SOURCE_FILE,setData,xmlTransform);

    }]);



