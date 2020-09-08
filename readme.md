# Experimenting with AWS Lambda

## Getting started

1. Run `docker-compose up --build hello-world`
1. Run the following command:

    ```bash
    aws lambda invoke --endpoint http://localhost:9001 --function-name index --no-sign-request --cli-binary-format raw-in-base64-out --payload '{ "testing": true }' output.json
    ```
