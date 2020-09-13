const { v2: { isEnriched } } = require('@1mill/cloudevents')

const FLAGS = {
	'another-my-flag': false,
	'my-flag': true,
}

exports.handler = async ({ cloudevent }, _context, _callback) => {
	// * Escape clauses
	if (isEnriched({ cloudevent })) { return }

	// * Buisness logic
	const { name } = JSON.parse(cloudevent.data)
	const enrichment = getFeatureFlagState({ flags: FLAGS, name })

	// TODO: Emit enriched event to rapids
	// rapids.emit({ cloudevent: enrich(cloudevent, enrichment )})

	// ! Testing purposes only for InvocationType: 'RequestResponse'
	return enrichment
}

const getFeatureFlagState = ({ flags, name }) => {
	return { isEnabled: flags[name], name };
}
