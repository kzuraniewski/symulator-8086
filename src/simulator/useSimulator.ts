import { useCallback, useReducer } from 'react';
import simulatedReducer, {
	initialSimulatedState,
	State,
} from './simulatedReducer';
import type { RegisterName } from './simulationTypes';

export type SimulationProperties = {
	simulated: State;
	resetSimulationState: () => void;
	orders: {
		mov: (to: RegisterName, from: RegisterName) => void;
		xhcg: (first: RegisterName, second: RegisterName) => void;
		push: (from: RegisterName) => void;
		pop: (to: RegisterName) => void;
	};
};

const useSimulator = () => {
	const [simulated, dispatch] = useReducer(
		simulatedReducer,
		initialSimulatedState
	);

	const mov = useCallback(
		(to: RegisterName, from: RegisterName) =>
			dispatch({
				type: 'order/MOV',
				to,
				from,
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
		(from: RegisterName) =>
			dispatch({
				type: 'order/PUSH',
				from,
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
