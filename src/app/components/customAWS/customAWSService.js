// AWS Operations over SDK service

(function(){
	angular
		.module('yoProjectJS')
		.service('customAWSService', customAWSService);

		customAWSService.$inject = [];

		function customAWSService(){

			var vm = this;

			vm.AWS = AWS;

			vm.AWS.config.region = 'eu-west-1';

			vm.roleArnFB = 'arn:aws:iam::419400150602:role/myAppFBRole';
			vm.roleArnAmazon = 'arn:aws:iam::419400150602:role/myAppAmazonRole';
			
			vm.bucketName = 'thabeat--archiving-tool';

			vm.bucket = new vm.AWS.S3({
				params: {
					Bucket: vm.bucketName
				}
			});
		}
})();