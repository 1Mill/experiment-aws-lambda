const { v3: {
	createEventStream,
	enrichCloudevent,
} } = require('@1mill/cloudevents')

const lambda = createEventStream({ protocol: 'lambda' })
const rapids = createEventStream({
	id: 'feature-flags-service',
	mechanism: process.env.CLOUDEVENTS_RAPIDS_MECHANISM,
	password: process.env.CLOUDEVENTS_RAPIDS_PASSWORD,
	protocol: process.env.CLOUDEVENTS_RAPIDS_PROTOCOL,
	urls: (process.env.CLOUDEVENTS_RAPIDS_URLS || '').split(','),
	username: process.env.CLOUDEVENTS_RAPIDS_USERNAME,
})

const FLAGS = {
	'another-my-flag': false,
	'my-flag': true,
}

const isFlagEnabled = ({ flags, name }) => {
	return (flags && flags[name]) || false
}

exports.handler = lambda.handler(async ({ cloudevent, data, isEnriched }) => {
	try {
		// * Escape clauses
		if (isEnriched) { return }

		// * Contracted inputs
		const { name } = data

		// * Business logic
		const isEnabled = isFlagEnabled({ flags: FLAGS, name })

		// * Contracted outputs
		const enrichmentdata = {
			isEnabled,
			name,
		}

		// * Enrich and emit back to rapids
		await rapids.emit({
			cloudevent: enrichCloudevent({
				cloudevent,
				enrichmentdata,
			})
		})
	} catch (err) {
		console.error(err)
	}
})
