# Experimenting with AWS Lambda

## Getting started

1. Install `aws-cli`
1. Run `docker-compose up --build hello-world`
1. Run the following command will produce an output in the `hello-world` console.

    ```bash
    ./invoke.bash ./services/hello-world/cloudevent.json 9001
    ```

1. Run the following command to generate an `output.json` file

    ```bash
    ./invoke.bash ./services/hello-world/cloudevent.json 9001 RequestResponse
    ```
