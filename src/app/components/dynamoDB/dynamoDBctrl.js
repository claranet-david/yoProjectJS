(function(){
	// body...
	angular
		.module('yoProjectJS')
		.controller('dynamoDBController', dynamoDBController);

		dynamoDBController.$inject = ['$scope', '$http', '$routeParams','loginService', 'customAWSService'];

		function dynamoDBController($scope, $http, $routeParams, loginService, customAWSService){

			var vm = this;
            vm.queriedItem = '';
            vm.newItem = {
                FileName: 'Name for the new file',
                FileDate: '2016-08-14',
                FileTags: 'Comma separated list of Tags',
                FileDescription: 'Description for the new File',
                FileType: ''
            };

            vm.dynamodb = new customAWSService.AWS.DynamoDB(
                {
                    apiVersion: '2012-08-10',
                    region: 'us-west-2'
                });

            vm.docClient = new customAWSService.AWS.DynamoDB.DocumentClient({service: vm.dynamodb});
            console.log("DynamoDB Ready");

            vm.dropzone = document.getElementById('dropzone');

            vm.dropzone.ondrop = function(e){
                //need to check just one file dropped
                e.preventDefault();
                this.className = 'dropzone';
                console.log(e.dataTransfer.files[0]);
                vm.newItem.FileName = e.dataTransfer.files[0].name;
                console.log("FileName: " + vm.newItem.FileName);
                vm.newItem.FileDate = e.dataTransfer.files[0].lastModifiedDate.toISOString().slice(0,10);
                console.log("FileDate: " + vm.newItem.FileDate);
                $scope.$digest();

                if(e.dataTransfer.files.length==1){
                    console.log("Ok!");
                    return e.dataTransfer.files[0];
                }
                else console.log("There was some sort of error: Should be exclusively one item!");
            }
            vm.dropzone.ondragover = function(e){
                this.className = 'dropzone over';
                return false;
            }
            vm.dropzone.ondragleave = function(e){
                this.className = 'dropzone';
                return false;
            }


            vm.refreshTable = function(){

                vm.dynamodb.scan(params={TableName: "JStable"}, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    //else console.log(data);           // successful response
                }).promise().then(function(result){
                        console.log("Success!" + JSON.stringify(result));
                        vm.fullDynDBData = result.Items;
                    }).catch(function(failure){
                        console.log("Failure: " + JSON.stringify(failure));
                        vm.queriedItem = "There was an error on your query!!";
                    });
            }

            vm.queryAction = function(){

                placeholderKey = vm.key;

                vm.params = {
                    TableName: "JStable",
                    KeyConditionExpression: "FileName = :itemname",
                    ExpressionAttributeValues: {
                        ":itemname": placeholderKey
                    }
                }

                vm.docClient.query(vm.params, function(err, data){
                        if(err) console.log("There was an error");
                        //else console.log(data);
                }).promise().then(function(result){
                    console.log("Success!" + JSON.stringify(result));
                    vm.queriedItem = result.Items;
                }).catch(function(failure){
                    console.log("Failure: " + JSON.stringify(failure));
                    vm.queriedItem = "There was an error on your query!!";
                });
            }

            vm.deleteAction = function(){

                placeholderKey = vm.key;

                paramsDelete = {
                    TableName: "JStable",
                   Key: {
                       FileName: {S: placeholderKey}
                   },
                }

                vm.dynamodb.deleteItem(paramsDelete, function(err, data){
                        if(err) console.log("There was an error");
                        //else console.log(data);
                }).promise().then(function(result){
                    console.log("Success!" + JSON.stringify(result));
                    vm.queriedItem = result.Items;
                }).catch(function(failure){
                    console.log("Failure: " + JSON.stringify(failure));
                    vm.queriedItem = "There was an error on your query!!";
                });

                vm.refreshTable();
            }

            vm.populate = function(){

                vm.dynamodb.updateItem(
                    params={
                        TableName: "JStable",
                        Key: {
                            FileName: {S: vm.newItem.FileName}
                        },
                        AttributeUpdates:{
                            FileDescription: {
                                Action: "PUT",
                                Value: {S: vm.newItem.FileDescription}
                            },
                            FileDate: {
                                Action: "PUT",
                                Value: {S: JSON.stringify(vm.newItem.FileDate)}
                            },
                            FileType: {
                                Action: "PUT",
                                Value: {S: vm.newItem.FileType}
                            },
                            FileTags: {
                                Action: "PUT",
                                Value: {S: vm.newItem.FileTags}
                            }

                        }

                    },function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    //else console.log(data);           // successful response
                });

                vm.refreshTable();
            }

            vm.refreshTable();
        }

})();