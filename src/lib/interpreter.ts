import {
	OrderName,
	orderNames,
	RegisterName,
	registerNames,
} from '../simulator/simulatedReducer';

// TODO: infer this from state
export const orderArgCount: Record<OrderName, number> = {
	MOV: 2,
	XHCG: 2,
	PUSH: 1,
	POP: 1,
};

export type Argument =
	| { type: 'register'; value: RegisterName }
	| { type: 'hex'; value: string }
	| { type: 'address'; value: string };

export type InterprettedQuery = {
	orderName: OrderName;
	arguments: Argument[];
} | null;

export const interpret = (value: string): InterprettedQuery => {
	const [orderName, ...args] = value.trim().split(/[\s]+/);
	if (!orderName) throw new Error('Query is incomplete');

	// omit includes param type, which is the array's keyof for some reason
	if (!orderNames.includes(orderName as OrderName))
		throw new Error('Unrecognized order');

	if (!args.length) throw new Error('No argument(s) provided');

	if (orderArgCount[orderName as OrderName] !== args.length)
		throw new Error(
			`This order requires ${
				orderArgCount[orderName as OrderName]
			} arguments`
		);

	const parsedArguments = args.map<Argument>((value) => {
		if (!value) throw new Error('Invalud argument');

		if (registerNames.includes(value as RegisterName))
			return {
				type: 'register',
				value: value as RegisterName,
			};

		if (value.at(0) === '[' && value.at(-1) === ']')
			return {
				type: 'address',
				value: value.substring(1, value.length),
			};

		return {
			type: 'hex',
			value,
		};
	});

	return {
		orderName: orderName as OrderName,
		arguments: parsedArguments,
	};
};
