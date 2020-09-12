# Experimenting with AWS Lambda

## Getting started

### Development

1. Install `aws-cli`
1. Run `docker-compose up --build hello-world`
1. Run the following command will produce an output in the `hello-world` console.

    ```bash
    ./invoke.bash ./services/hello-world/event.json 9001
    ```

1. Run the following command to generate an `output.json` file if you add a `return` statment to the lambda function.

    ```bash
    ./invoke.bash ./services/hello-world/event.json 9001 RequestResponse
    ```

### Deploy

1. Create a `.env` file with your `AWS_ACCESS_KEY_ID`, `AWS_DEFAULT_REGION`, and `AWS_SECRET_ACCESS_KEY` values
1. To deploy the `hello-world` lambda, run `DIRECTORY=/services/hello-world/ docker-compose -f cicd.docker-compose.yml up terraform`
1. In the AWS Managmenet Console, find the ARN for your lambda function
1. Run `aws lambda invoke --function-name hello-world--xxxARNxxx output.json`
1. Check your local `output.json` file for the `return` value found in the lambda `services/hello-world/index.js` file

## Troubleshooting

* When you try and invoke the lambda and get an error about it not being in your region.
    1. Run `DIRECTORY=/services/hello-world/ docker-compose -f cicd.docker-compose.yml run sh -c "terraform init && terraform destroy -auto-approve"`
    1. Within the `main.tf` file, update the `AWS` provider `region` to the AWS region of your IAM profile (e.g. `us-east-1`)
    1. Re-deploy the lambda function
