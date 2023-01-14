import React from 'react';

export const MAX_ELEMENTARY_VALUE = 65535;

export const registerNames = [
	'AX',
	'BX',
	'CX',
	'DX',
	// 'BP',
	// 'DI',
	// 'SI',
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
	| { type: 'order/MOV'; to: RegisterName; from: RegisterName }
	| { type: 'order/XHCG'; first: RegisterName; second: RegisterName }
	| { type: 'order/PUSH'; from: RegisterName }
	| { type: 'order/POP'; to: RegisterName }
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
};

const simulatedReducer: React.Reducer<State, Action> = (
	state,
	action
): State => {
	switch (action.type) {
		case 'order/MOV': {
			const { to, from } = action;
			return {
				...state,
				registers: {
					...state.registers,
					[to]: state.registers[from],
				},
			};
		}
		case 'order/XHCG': {
			const { first, second } = action;
			return {
				...state,
				registers: {
					...state.registers,
					[first]: state.registers[second],
					[second]: state.registers[first],
				},
			};
		}
		case 'order/PUSH': {
			const { from } = action;
			return {
				...state,
				stack: [...state.stack, state.registers[from]],
			};
		}
		case 'order/POP': {
			const { to } = action;

			if (!state.stack.length) {
				console.info('Cannot perform POP order - the stack is empty');
				return state;
			}

			return {
				...state,
				registers: {
					...state.registers,
					[to]: state.stack.at(-1),
				},
				stack: state.stack.slice(0, state.stack.length - 1),
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
