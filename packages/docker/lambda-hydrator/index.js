const AWS = require('aws-sdk')
const { v3: {
	createEventStream
} } = require('@1mill/cloudevents')

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION,
	secretAccessKey: process.env.AWS_SECRET_ACCRESS_KEY,
})
const lambda = new AWS.Lambda({ apiVersion: '2015-03-31' })

const rapids = createEventStream({
	id: process.env.CLOUDEVENTS_ID,
	mechanism: process.env.CLOUDEVENTS_MECHANISM,
	password: process.env.CLOUDEVENTS_PASSWORD,
	protocol: process.env.CLOUDEVENTS_PROTOCOL,
	urls: (process.env.CLOUDEVENTS_URLS || '').split(','),
	username: process.env.CLOUDEVENTS_USERNAME,
})

rapids.listen({
	handler: ({ cloudevent }) => {
		const params = {
			FunctionName: process.env.AWS_LAMBDA_ARN,
			InvocationType: 'Event',
			Payload: JSON.stringify({ cloudevent }),
		}
		lambda.invoke(params, (err, data) => {
			const datetime = new Date().toISOString()
			err
				? console.error(datetime, err, err.stack)
				: console.log(datetime, data)
		})
	},
	types: (process.env.CLOUDEVENTS_TYPES || '').split(','),
})
