echo "event.json: ${1}"
echo "port: ${2}"

 aws lambda invoke \
	--cli-binary-format raw-in-base64-out \
	--function-name index \
	--no-sign-request \
	--payload "$(cat ${1})" \
 	--endpoint http://localhost:${2} \
	output.json
