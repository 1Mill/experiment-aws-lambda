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

	required_providers {
		archive = {
			source = "hashicorp/archive"
			version = "~> 1.3.0"
		}
		aws = {
			source = "hashicorp/aws"
			version = "~> 3.5.0"
		}
	}
}

provider "aws" {
	region = "us-west-1"
}

variable "environment" {
	default = []
	type = list(object({
		key = string
		value = string
	}))
}
variable "runtime" {
	type = string
}

data "archive_file" "default" {
	excludes = [
		".terraform",
		"event.json",
		"main.tf",
		local.lambda_zip,
	]
	output_path = "${path.module}/${local.lambda_zip}"
	source_dir = "${path.module}"
	type = "zip"
}
data "aws_iam_policy_document" "default" {
	version = "2012-10-17"

	statement {
		actions = ["sts:AssumeRole"]
		effect = "Allow"

		principals {
			identifiers = ["lambda.amazonaws.com"]
			type = "Service"
		}
	}
}
locals {
	lambda_zip = "terraform_lambda.zip"
}
resource "aws_iam_role" "default" {
	assume_role_policy = data.aws_iam_policy_document.default.json
}
resource "aws_lambda_function" "default" {
	filename = local.lambda_zip
	function_name = "MyPlaceholderFunctionName"
	handler = "index.handler"
	role = aws_iam_role.default.arn
	runtime = var.runtime
	source_code_hash = data.archive_file.default.output_base64sha256

	environment {
		// * Environmental keys must not container hyphens "-" https://stackoverflow.com/a/60885479
		variables = merge([for env in var.environment: { (env["key"]) = (env["value"]) }]...)
	}
}
