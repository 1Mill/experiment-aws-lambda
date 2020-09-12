terraform {
	required_version = "~> 0.13.2"

	backend "s3" {
		// access_key = ENVIRONMENT AWS_ACCESS_KEY_ID
		// region = ENVIRONMENT AWS_DEFAULT_REGION
		// secret_key = ENVIRONMENT AWS_SECRET_ACCESS_KEY

		bucket = "experiment-terraform-state"
		dynamodb_table = "experiment-terraform-state-locks"
		encrypt = true
		key = "example-aws-lambda/hello-world/terraform.tfstate"
	}
}

provider "aws" {
	region = "us-west-1"
}

module "lambda" {
	source = "github.com/1Mill/experiment-aws-lambda.git//packages/terraform/aws_lambda"

	handler = "index.handler"
	name = "my-example-function"
	runtime = "nodejs12.x"
}
