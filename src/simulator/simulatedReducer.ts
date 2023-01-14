import React from 'react';
import { Argument } from '../lib/interpreter';

export const MAX_ELEMENTARY_VALUE = 65535;

export const registerNames = [
	'AX',
	'BX',
	'CX',
	'DX',
	'BP',
	'DI',
	'SI',
] as const;

export type RegisterName = typeof registerNames[number];

export const orderNames = ['MOV', 'XHCG', 'PUSH', 'POP'] as const;

export type OrderName = typeof orderNames[number];

export const addressingModes = ['base', 'index', 'base-index'] as const;

export type AddressingMode = typeof addressingModes[number];

export type Memory = number[];

export type Stack = number[];

export type ElementaryValue = number;

// prettier-ignore
export type Action =
	| { type: 'order/executeOrder' }
	| { type: 'state/setOrderName'; value: OrderName }
	| { type: 'state/setArguments'; value: Argument[] }
	| { type: 'state/setOffset'; value: ElementaryValue }
	| { type: 'state/setAddressingMode'; value: AddressingMode }
	| { type: 'state/setRegister'; registerName: RegisterName; value: ElementaryValue }
	| { type: 'state/reset' };

export type State = {
	stack: Stack;
	registers: Record<RegisterName, ElementaryValue>;
	memory: Memory;
	addressingMode: AddressingMode;
	offset: ElementaryValue;
	orderName: OrderName;
	args: Argument[];
};

export const initialRegisterValues = registerNames.reduce(
	(acc: Partial<Record<RegisterName, ElementaryValue>>, curr) => (
		(acc[curr] = 0), acc
	),
	{}
) as Record<RegisterName, ElementaryValue>;

export const initialSimulatedState: State = {
	stack: [],
	memory: Array<number>(16 * 8).fill(0),
	registers: initialRegisterValues,
	addressingMode: 'base',
	offset: 0,
	orderName: 'MOV',
	args: [],
};

const simulatedReducer: React.Reducer<State, Action> = (
	state,
	action
): State => {
	const {
		orderName,
		args: [arg0, arg1],
	} = state;

	console.log(action);

	if (
		(arg0 && arg0.type !== 'register') ||
		(arg1 && arg1.type !== 'register')
	)
		return state;

	switch (action.type) {
		case 'order/executeOrder': {
			switch (orderName) {
				case 'MOV': {
					return {
						...state,
						registers: {
							...state.registers,
							[arg0.value]: state.registers[arg1.value],
						},
					};
				}
				case 'XHCG': {
					return {
						...state,
						registers: {
							...state.registers,
							[arg0.value]: state.registers[arg1.value],
							[arg1.value]: state.registers[arg0.value],
						},
					};
				}
				case 'PUSH': {
					return {
						...state,
						stack: [...state.stack, state.registers[arg0.value]],
					};
				}
				case 'POP': {
					if (!state.stack.length) {
						console.info(
							'Cannot perform POP order - the stack is empty'
						);
						return state;
					}

					return {
						...state,
						registers: {
							...state.registers,
							[arg0.value]: state.stack.at(-1),
						},
						stack: state.stack.slice(0, state.stack.length - 1),
					};
				}
			}
		}
		case 'state/setOrderName': {
			const { value } = action;
			return {
				...state,
				orderName: value,
			};
		}
		case 'state/setArguments': {
			const { value } = action;
			return {
				...state,
				args: value,
			};
		}
		case 'state/setRegister': {
			const { registerName, value } = action;
			if (value > MAX_ELEMENTARY_VALUE) {
				console.info(
					"Cannot update register's value as it exceeds register's maximum value"
				);
				return state;
			}

			if (!isFinite(value)) {
				console.info(
					"Cannot update register's value as it is not a finite number"
				);
				return state;
			}

			return {
				...state,
				registers: {
					...state.registers,
					[registerName]: value,
				},
			};
		}
		case 'state/setOffset': {
			const { value } = action;

			// FIXME: Duplicated code
			if (value > MAX_ELEMENTARY_VALUE) {
				console.info(
					"Cannot update register's value as it exceeds register's maximum value"
				);
				return state;
			}

			if (!isFinite(value)) {
				console.info(
					"Cannot update register's value as it is not a finite number"
				);
				return state;
			}

			return {
				...state,
				offset: value,
			};
		}
		case 'state/setAddressingMode': {
			const { value } = action;
			return {
				...state,
				addressingMode: value,
			};
		}
		case 'state/reset': {
			return { ...initialSimulatedState };
		}
		default:
			return state;
	}
};

export default simulatedReducer;
