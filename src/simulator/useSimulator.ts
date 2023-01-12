import { useCallback, useReducer } from 'react';
import simulatedReducer, {
	initialSimulatedState,
	State,
} from './simulatedReducer';
import type { RegisterName } from './simulationTypes';

export type SimulationProperties = {
	/**
	 * The simulated state containing all register and memory information
	 */
	simulated: State;

	/**
	 * Rreset the simulation state.
	 */
	resetSimulationState: () => void;

	orders: {
		/**
		 * Performs a MOV order for the simulated registers
		 *
		 * @param {string} to - The name of the register to move the value to.
		 * @param {string} value - The value to be moved.
		 */
		mov: (to: RegisterName, value: string) => void;

		/**
		 * Performs a XHCG order for the simulated registers
		 *
		 * @param {string} first - The name of the first register involved in the operation.
		 * @param {string} second - The name of the second register involved in the operation.
		 */
		xhcg: (first: RegisterName, second: RegisterName) => void;

		/**
		 * Performs a PUSH order for the simulated registers
		 *
		 * @param {string} value - The value to be stored on the stack.
		 */
		push: (value: string) => void;

		/**
		 * Performs a POP order for the simulated registers
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

	const mov = useCallback(
		(to: RegisterName, value: string) =>
			dispatch({
				type: 'order/MOV',
				to,
				value,
			}),
		[]
	);

	const xhcg = useCallback(
		(first: RegisterName, second: RegisterName) =>
			dispatch({
				type: 'order/XHCG',
				first,
				second,
			}),
		[]
	);

	const push = useCallback(
		(value: string) =>
			dispatch({
				type: 'order/PUSH',
				value,
			}),
		[]
	);

	const pop = useCallback(
		(to: RegisterName) =>
			dispatch({
				type: 'order/POP',
				to,
			}),
		[]
	);

	const resetSimulationState = useCallback(
		() =>
			dispatch({
				type: 'state/reset',
			}),
		[]
	);

	const properties: SimulationProperties = {
		simulated,
		resetSimulationState,
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
