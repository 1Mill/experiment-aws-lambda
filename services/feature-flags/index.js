const { v2: { isEnriched } } = require('@1mill/cloudevents')

const FLAGS = {
	'another-my-flag': false,
	'my-flag': true,
}

exports.handler = async ({ cloudevent }, _context, _callback) => {
	// * Escape clauses
	if (isEnriched({ cloudevent })) { return }

	// * Buisness logic
	const { name } = cloudevent.data
	const payload = {
		isEnabled: FLAGS[name] || false,
		name,
	}

	console.log(payload)

	// ! Testing purposes only for InvocationType: 'RequestResponse'
	return payload
}
