angular.module('myApp.CVView', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'CVView/Network_CV.html',
            controller: 'NetWorkCtrl'
        });
        $routeProvider.when('/1337', {
            templateUrl: 'CVView/Network_CV2.html',
            controller: 'NetWorkCtrl'
        });
    }])
    .factory('DataSource', ['$http', function ($http) {
        return {
            getData: function (file, callback, transform) {
                $http.get(
                    file,
                    {transformResponse: transform}
                ).success(function (data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).error(function (data, status) {
                    console.log("Request failed " + status);
                });
            }
        };
    }])
    .controller('NetWorkCtrl', ['$scope', '$http', '$location', '$timeout','DataSource', function ($scope, $http, $location, $timeout ,DataSource) {
        var SOURCE_FILE = "1337g.xml";
        xmlTransform = function (data) {
            console.log("transform data");
            var x2js = new X2JS();
            var json = x2js.xml_str2json(data);
            return json.profiles.profile;
        };

        $scope.go = function () {
            document.body.style.backgroundColor = '#ededed';
            $scope.startFade = true;
            tohome = function(){$location.path('/');};
            $timeout(tohome,2000);
            DataSource.getData('1337g.xml', setData, xmlTransform);
        };

        $scope.hideStuff = function () {
            document.body.style.backgroundColor = 'black';
            $scope.startFade = true;
            to1337 = function(){$location.path('/1337');};
            $timeout(to1337,2000);
            DataSource.getData('1337.xml', setData, xmlTransform);
        };

        setData = function (data) {
            $scope.dataSet = data;
        };

        DataSource.getData(SOURCE_FILE, setData, xmlTransform);

    }]);



