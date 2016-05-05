(function(){
	angular
		.module('yoProjectJS')
		.controller('testLambdaController', testLambdaController);

		testLambdaController.$inject = ['$scope', '$http', 'customAWSService'];

		function testLambdaController($scope, $http, customAWSService){
			
			var vm = this;

			console.log("TestLambdaController: ");

			var vm = this;

			vm.payload = "your text here!";


		    vm.handleResponseFromLambda = function(err, response){
		    	if(err){
		    		console.log("some problem happened");
		    		console.dir(err);
		    		return;
		    	}
		    	console.dir(response);
		    	console.dir(response.Payload);
		    	temporal = JSON.parse(response.Payload).word_to_echo_str;
		    	console.log(temporal);
		    	
		    }
		    vm.runFunctionOnLambda = function(fn_str, payload){
		    	var settings = {
		    		FunctionName: fn_str,
		    		Payload: JSON.stringify(payload)
		    	};
		    	lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
		    	lambda.invoke(settings, vm.handleResponseFromLambda);
		    }
		    vm.buttonAction = function(payload){
		    	console.log("Payload "+payload);
		    	console.log("Credentials "+JSON.stringify(customAWSService.bucket.config.credentials));				
		    	vm.runFunctionOnLambda("myFirstTestFunction", {
		    	 	word_to_echo_str: payload
		    	 });
		    }
		}
})();