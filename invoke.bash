echo "event.json: ${1}"
echo "port: ${2}"
echo "invocation-type ${3-Event}" # https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html#API_Invoke_RequestSyntax

 aws lambda invoke \
	--cli-binary-format raw-in-base64-out \
	--function-name index \
	--invocation-type ${3-Event} \
	--no-sign-request \
	--payload "$(cat ${1})" \
 	--endpoint http://localhost:${2} \
	output.json
