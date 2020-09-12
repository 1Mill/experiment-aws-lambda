const { v2: { isEnriched }} = require('@1mill/cloudevents')

exports.handler = async ({ cloudevent }, _context, _callback) => {
	// * Escape clauses
	if (isEnriched({ cloudevent })) { return }

	// * Buisness logic
	console.log('EVENT: \n' + JSON.stringify(cloudevent, null, 2))

	// ! Testing purposes only for InvocationType: 'RequestResponse'
	return cloudevent
}
