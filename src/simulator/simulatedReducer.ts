import React from 'react';

export type RegisterName = 'AX' | 'BX' | 'CX' | 'DX';

export type MethodName = 'MOV' | 'XHCG' | 'PUSH' | 'POP';

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

export const initialSimulatedState: State = {
	stack: [],
	registers: {
		AX: '',
		BX: '',
		CX: '',
		DX: '',
	},
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
