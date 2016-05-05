(function() {
  'use strict';

  angular
    .module('yoProjectJS')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'app/components/views/about.html'
      })
      .when('/contact', {
        templateUrl: 'app/components/views/contact.html'
      })
      .when('/upload',{
        templateUrl: 'app/components/upload/upload.html',
        controller: 'UploadController',
        controllerAs: 'upload'
      })
      .when('/test', {
        templateUrl: 'app/components/testLambda/testLambda.html',
        controller: 'testLambdaController',
        controllerAs: 'testLambda'
      })
      .when('/list',{
        templateUrl: 'app/components/list/list.html',
        controller: 'ListController',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
