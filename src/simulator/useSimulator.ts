import { useReducer } from 'react';
import simulatedReducer, {
	initialSimulatedState,
	State,
} from './simulatedReducer';
import type { RegisterName } from './simulationTypes';

export type SimulationProperties = {
	simulated: State;

	/**
	 * Dispatches an action to reset the state.
	 */
	reset: () => void;

	orders: {
		/**
		 * Dispatches an action to move a value from one location to another.
		 *
		 * @param {string} to - The name of the register to move the value to.
		 * @param {string} value - The value to be moved.
		 */
		mov: (to: RegisterName, value: string) => void;

		/**
		 * Dispatches an action to perform a high-precision arithmetic operation using the XHCG register.
		 *
		 * @param {string} first - The name of the first register involved in the operation.
		 * @param {string} second - The name of the second register involved in the operation.
		 */
		xhcg: (first: RegisterName, second: RegisterName) => void;

		/**
		 * Dispatches an action to store a value on the top of the stack.
		 *
		 * @param {string} value - The value to be stored on the stack.
		 */
		push: (value: string) => void;

		/**
		 * Dispatches an action to retrieve a value from the top of the stack and store it in a register.
		 *
		 * @param {string} to - The name of the register to store the retrieved value in.
		 */
		pop: (to: RegisterName) => void;
	};
};

const useSimulator = () => {
	const [simulated, dispatch] = useReducer(
		simulatedReducer,
		initialSimulatedState
	);

	const mov = (to: RegisterName, value: string) =>
		dispatch({
			type: 'order/MOV',
			to,
			value,
		});

	const xhcg = (first: RegisterName, second: RegisterName) =>
		dispatch({
			type: 'order/XHCG',
			first,
			second,
		});

	const push = (value: string) =>
		dispatch({
			type: 'order/PUSH',
			value,
		});

	const pop = (to: RegisterName) =>
		dispatch({
			type: 'order/POP',
			to,
		});

	const reset = () =>
		dispatch({
			type: 'state/reset',
		});

	const properties: SimulationProperties = {
		simulated,
		reset,
		orders: {
			mov,
			xhcg,
			push,
			pop,
		},
	};

	return properties;
};

export default useSimulator;
