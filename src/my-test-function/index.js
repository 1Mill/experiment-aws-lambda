console.log('Did a thing');

exports.handler = async (event, context, _callback) => {
	console.log('EVENT: \n', JSON.stringify(event, null, 2));
	return context.logStreamName
}
