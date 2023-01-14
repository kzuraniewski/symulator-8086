import React from 'react';
import type { AddressingMode, Memory, RegisterName } from './simulationTypes';

export type Action =
	| { type: 'order/MOV'; to: RegisterName; from: RegisterName }
	| { type: 'order/XHCG'; first: RegisterName; second: RegisterName }
	| { type: 'order/PUSH'; from: RegisterName }
	| { type: 'order/POP'; to: RegisterName }
	| { type: 'state/setOffset'; value: number }
	| { type: 'state/setAddressingMode'; value: AddressingMode }
	| { type: 'state/setRegister'; registerName: RegisterName; value: string }
	| { type: 'state/reset' };

export type State = {
	stack: string[];
	registers: Record<RegisterName, string>;
	memory: Memory;
	addressingMode: AddressingMode;
	offset: number;
};

export const initialRegisterValues: Record<RegisterName, ''> = {
	AX: '',
	BX: '',
	CX: '',
	DX: '',
	BP: '',
	DI: '',
	SI: '',
};

export const initialSimulatedState: State = {
	stack: [],
	memory: Array<number>(1024 * 1024).fill(0),
	registers: initialRegisterValues,
	addressingMode: 'base',
	offset: 0,
};

const simulatedReducer: React.Reducer<State, Action> = (state, action) => {
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
				console.error('Cannot perform POP order - the stack is empty');
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
				offsset: value,
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
