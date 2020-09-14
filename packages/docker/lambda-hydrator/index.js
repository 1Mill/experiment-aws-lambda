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
	id: process.env.CLOUDEVENT_ID,
	mechanism: process.env.CLOUDEVENT_MECHANISM,
	password: process.env.CLOUDEVENT_PASSWORD,
	protocol: process.env.CLOUDEVENT_PROTOCOL,
	urls: (process.env.CLOUDEVENT_URLS || '').split(','),
	username: process.env.CLOUDEVENT_USERNAME,
})

rapids.listen({
	handler: ({ cloudevent }) => {
		console.log(cloudevent)
	},
	types: (process.env.CLOUDEVENT_TYPES || '').split(','),
})
