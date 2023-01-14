import { useCallback, useReducer } from 'react';
import { Argument } from '../lib/interpreter';
import simulatedReducer, {
	AddressingMode,
	ElementaryValue,
	initialSimulatedState,
	OrderName,
	RegisterName,
} from './simulatedReducer';

const useSimulator = () => {
	const [simulated, dispatch] = useReducer(
		simulatedReducer,
		initialSimulatedState
	);

	const execute = useCallback(
		() =>
			dispatch({
				type: 'order/executeOrder',
			}),
		[]
	);

	const setOrderName = useCallback((orderName: OrderName) => {
		dispatch({
			type: 'state/setOrderName',
			value: orderName,
		});
	}, []);

	const setArguments = useCallback((args: Argument[]) => {
		dispatch({
			type: 'state/setArguments',
			value: args,
		});
	}, []);

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
		setOrderName,
		setArguments,
		setRegister,
		setOffset,
		setAddressingMode,
		execute,
	};

	return properties;
};

export default useSimulator;
