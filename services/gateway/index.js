const AWS = require('aws-sdk')
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_DEFAULT_REGION,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const lambda = new AWS.Lambda({
	apiVersion: '2015-03-31',
	// endpoint: 'http://localhost:9001/',
})

const params = {
	FunctionName: process.env.AWS_LAMBDA_ARN,
	InvocationType: 'Event',
	Payload: JSON.stringify({ todo: 'TODO' }), // TODO: Update to cloudevent payload
}
lambda.invoke(params, (err, data) => {
	err ? console.error(err, err.stack) : console.log(data)
})
