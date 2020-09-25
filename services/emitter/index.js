const {
	v3: { createCloudevent, createEventStream },
} = require('@1mill/cloudevents');

const rapids = createEventStream({
	id: 'services.emitter',
	protocol: process.env.CLOUDEVENTS_RAPIDS_PROTOCOL,
	urls: (process.env.CLOUDEVENTS_RAPIDS_URLS || '').split(','),
})

let id = 0
setInterval(() => {
	try {
		id += 1;

		console.log(`Emitting id: ${id}`);
		const cloudevent = createCloudevent({
			data: { name: 'my-flag' },
			id,
			source: 'service.emitter',
			type: 'is-feature-flag-enabled.2020-09-12',
		})
		rapids.emit({ cloudevent })
	} catch (err) {
		console.error(err)
	}
}, 5000)

rapids.listen({
	handler: ({ cloudevent, isEnriched }) => {
		if (!isEnriched) { return }

		console.log(JSON.stringify(cloudevent, null, 2))
	},
	types: ['is-feature-flag-enabled.2020-09-12'],
})
