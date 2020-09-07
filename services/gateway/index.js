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
	FunctionName: 'arn:aws:lambda:us-west-2:076550078650:function:deleteThisTesting',
	InvocationType: 'RequestResponse',
	LogType: 'None',
	Payload: JSON.stringify({ testing: true }),
}
lambda.invoke(params, (err, data) => {
	err ? console.error(err, err.stack) : console.log(data)
})
