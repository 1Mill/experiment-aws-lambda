exports.handler = async (event, _context, _callback) => {
	console.log('EVENT: \n' + JSON.stringify(event, null, 2))
	return { testing: 'again' }
}
