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

### Production

1. Create a `.env` file with your `AWS_ACCESS_KEY_ID`, `AWS_DEFAULT_REGION`, and `AWS_SECRET_ACCESS_KEY` values
1. Run `docker-compose -f cicd.docker-compose.yml up terraform`. This will deploy the lambda function to your specificed AWS region
1. In the AWS Managmenet Console, find the ARN for your lambda function
1. Run `aws lambda invoke --function-name my-lambda-ARN-value output.json`
1. Check your local `output.json` file for the `return` value found in the lambda `services/hello-world/index.js` file
