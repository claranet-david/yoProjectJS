(function(){
	angular
		.module('yoProjectJS')
		.controller('PromisesController', PromisesController);

		PromisesController.$inject = ['$scope', '$http', 'loginService', 'customAWSService'];

		function PromisesController($scope, $http, loginService, customAWSService){
			
			var vm = this;

			vm.response="HELLO!";

		}
})();