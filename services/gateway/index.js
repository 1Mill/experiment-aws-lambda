const AWS = require('aws-sdk')
const { v2: { createEventStream } } = require('@1mill/cloudevents')

const rapids = createEventStream({
	id: 'gateway',
	protocol: process.env.CLOUDEVENTS_RAPIDS_PROTOCOL,
	urls: (process.env.CLOUDEVENTS_RAPIDS_URLS || '').split(','),
})

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_DEFAULT_REGION,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const lambda = new AWS.Lambda({
	apiVersion: '2015-03-31',
	// endpoint: 'http://localhost:9001/',
})

// * Listen for events from rapids
rapids.listen({
	handler: ({ cloudevent }) => {
		try {
			const params = {
				FunctionName: process.env.LAMBDA_FUNCTIONNAME,
				InvocationType: 'Event',
				Payload: JSON.stringify({ cloudevent }),
			}
			lambda.invoke(params, (err, data) => {
				const datetime = new Date().toISOString()
				err
					? console.error(datetime, err, err.stack)
					: console.log(datetime, data)
			})
		} catch (err) {
			console.error(err)
		}
	},
	types: ['is-feature-flag-enabled.2020-09-12']
})
