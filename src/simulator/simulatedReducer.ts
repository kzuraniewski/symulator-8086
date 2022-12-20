import React from 'react';
import { RegisterName } from './simulationTypes';

export type Action =
	| { type: 'order/MOV'; to: RegisterName; value: string }
	| { type: 'order/XHCG'; first: RegisterName; second: RegisterName }
	| { type: 'order/PUSH'; value: string }
	| { type: 'order/POP'; to: RegisterName }
	| { type: 'state/reset' };

export type State = {
	stack: string[];
	registers: Record<RegisterName, string>;
};

export const initialRegisterValues = {
	AX: '',
	BX: '',
	CX: '',
	DX: '',
} satisfies Record<RegisterName, string>;

export const initialSimulatedState: State = {
	stack: [],
	registers: initialRegisterValues,
};

const simulatedReducer: React.Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'order/MOV': {
			const { to, value } = action;
			return { ...state, [to]: value };
		}
		case 'order/XHCG': {
			const { first, second } = action;
			return {
				...state,
				[first]: state.registers[second],
				[second]: state.registers[first],
			};
		}
		case 'order/PUSH': {
			const { value } = action;
			return { ...state, stack: [...state.stack, value] };
		}
		case 'order/POP': {
			const { to } = action;
			return { ...state, [to]: state.stack[state.stack.length] };
		}
		case 'state/reset': {
			return { ...initialSimulatedState };
		}
		default:
			return state;
	}
};

export default simulatedReducer;
