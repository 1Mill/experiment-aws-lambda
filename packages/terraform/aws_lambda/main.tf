terraform {
	required_version = "~> 0.13.2"

	required_providers {
		archive = {
			source = "hashicorp/archive"
			version = "~> 1.3.0"
		}
		aws = {
			source = "hashicorp/aws"
			version = "~> 3.5.0"
		}
		random = {
			source = "hashicorp/random"
			version = "~> 2.3.0"
		}
	}
}

variable "environment" {
	default = [{ key = "TERRAFORM_PLACEHOLDER", value = "1" }]
	type = list(object({
		key = string
		value = string
	}))
}
variable "handler" {
	type = string
}
variable "name" {
	type = string
}
variable "runtime" {
	type = string
}

locals {
	lambda_zip = "terraform_lambda.zip"
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
resource "aws_iam_role" "default" {
	assume_role_policy = data.aws_iam_policy_document.default.json
}
resource "aws_lambda_function" "default" {
	filename = local.lambda_zip
	function_name = substr("${var.name}--${random_id.default.hex}", 0, 64)
	handler = var.handler
	role = aws_iam_role.default.arn
	runtime = var.runtime
	source_code_hash = data.archive_file.default.output_base64sha256

	environment {
		// * Environmental keys must not container hyphens "-" https://stackoverflow.com/a/60885479
		variables = merge([for env in var.environment: { (env["key"]) = (env["value"]) }]...)
	}
}
resource "random_id" "default" {
	byte_length = 32
}
