exports.handler = async (cloudevent, _context, _callback) => {
	console.log("EVENT: \n" + JSON.stringify(cloudevent, null, 2))
	console.log(cloudevent)

	return cloudevent
}
