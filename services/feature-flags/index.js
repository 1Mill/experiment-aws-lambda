const { v2: {
	createEventStream,
	enrich,
	isEnriched,
} } = require('@1mill/cloudevents')

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

const getFeatureFlagState = ({ flags, name }) => {
	return {
		isEnabled: flags[name] || false,
		name,
	}
}

exports.handler = async ({ cloudevent }, _context, _callback) => {
	try {
		// * Escape clauses
		if (isEnriched({ cloudevent })) { return }

		// * Business logic
		const { name } = JSON.parse(cloudevent.data);
		const enrichment = getFeatureFlagState({ flags: FLAGS, name });

		// * Publish enriched event to rapids
		rapids.emit({
			cloudevent: enrich({ cloudevent, enrichment })
		})

		// ! Testing purposes only for InvocationType: 'RequestResponse'
		return enrich({ cloudevent, enrichment })
	} catch (err) {
		console.error(err)
	}
}
