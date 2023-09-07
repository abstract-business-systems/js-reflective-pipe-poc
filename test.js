const pipe = require('.');

const main = async () => {
	const { peek } = require('@laufire/utils/debug');
	const { map, shuffle, equals } = require('@laufire/utils/collection');

	const passed = { passed: 'passed' };
	const returned = { returned: 'returned' };

	const justReturn = () => { };
	const returnValues = () => (returned);
	const callNext = async ({ next }) => {

		return { ...passed, ...await next(passed) };
	};

	const pipes = map({ justReturn, returnValues, callNext }, (fn) => async (...args) => {
		peek({ args });
		const result = await fn(...args);
		peek({ result });

		return result;
	});

	const buildProcess = pipe(pipes);
	const process = buildProcess(shuffle([
		'returnValues',
		'justReturn',
		'callNext',
		'callNext'
	]));

	const response = await process({ fromContext: 'fromContext' });
	const worksRight = equals({ ...passed, ...returned}, response);

	peek({ response, worksRight });
};

main();
