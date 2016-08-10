(function(){
	// body...
	angular
		.module('yoProjectJS')
		.controller('dynamoDBController', dynamoDBController);

		dynamoDBController.$inject = ['$scope', '$http', '$routeParams','loginService', 'customAWSService'];

		function dynamoDBController($scope, $http, $routeParams, loginService, customAWSService){

			var vm = this;

            vm.dynamodb = new customAWSService.AWS.DynamoDB(
                {
                    apiVersion: '2012-08-10',
                    region: 'us-west-2'
                });

            vm.buttonAction = function(){
                vm.key = "STARTING";

                console.log("GOGOGO!");

                docClient = new customAWSService.AWS.DynamoDB.DocumentClient({service: vm.dynamodb});
                console.log("DynamoDB Ready");

                vm.params = {
                    TableName: "JStable",
                    KeyConditionExpression: "FileName = :itemname",
                    ExpressionAttributeValues: {
                        ":itemname":"Paco"
                    }
                }

                docClient.query(vm.params, function(err, data){
                        if(err) console.log("There was an error");
                        else console.log(data);
                }).promise().then(function(result){

                    console.log("Success!" + result);

                }).catch(function(failure){

                    console.log("Failure: " + failure);

                });
                vm.key = '';
            }

        }

})();