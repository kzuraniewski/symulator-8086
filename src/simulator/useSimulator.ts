import { useCallback, useReducer } from 'react';
import simulatedReducer, {
	AddressingMode,
	ElementaryValue,
	initialSimulatedState,
	RegisterName,
} from './simulatedReducer';

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

	const setRegister = useCallback(
		(registerName: RegisterName, value: ElementaryValue) => {
			dispatch({
				type: 'state/setRegister',
				registerName,
				value,
			});
		},
		[]
	);

	const setOffset = useCallback(
		(value: ElementaryValue) =>
			dispatch({
				type: 'state/setOffset',
				value,
			}),
		[]
	);

	const setAddressingMode = useCallback(
		(value: AddressingMode) =>
			dispatch({
				type: 'state/setAddressingMode',
				value,
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

	const properties = {
		simulated,
		resetSimulationState,
		setRegister,
		setOffset,
		setAddressingMode,
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
