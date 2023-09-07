const { defined, nothing } = require('@laufire/utils/fn');

const pipe = (pipes) => (flow) => async (context) => {
	let cur = 0;
	let result = {};

	const next = async (props = {}) => {
		const fn = pipes[flow[cur++]] || nothing;

		return result = defined(await fn({
			...result, ...props, ...context, next
		}), result);
	};

	const length = flow.length;

	while (cur < length) {
		await next(result);
	}

	const { next: dummy, ...rest } = result;

	return rest;
}

module.exports = pipe;
