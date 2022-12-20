import { Action, RegisterName } from './simulatedReducer';

const mov = (to: RegisterName, value: string): Action => ({
	type: 'MOV',
	to,
	value,
});

const xhcg = (first: RegisterName, second: RegisterName): Action => ({
	type: 'XHCG',
	first,
	second,
});

const push = (value: string): Action => ({
	type: 'PUSH',
	value,
});

const pop = (to: RegisterName): Action => ({
	type: 'POP',
	to,
});

const simulatedActions = {
	mov,
	xhcg,
	push,
	pop,
};

export default simulatedActions;
