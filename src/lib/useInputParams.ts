import { useCallback, useState } from 'react';
import { initialRegisterValues } from '../simulator/simulatedReducer';
import type { SimulationInputParameters } from '../simulator/simulationTypes';

const initialParams: SimulationInputParameters = {
	...initialRegisterValues,
	offset: 0,
	addressingMode: 'base',
};

export default function useInputParams() {
	const [inputParams, setInputParams] =
		useState<SimulationInputParameters>(initialParams);

	const resetInputParams = useCallback(
		() => setInputParams(initialParams),
		[]
	);

	return {
		inputParams,
		setInputParams,
		resetInputParams,
	};
}
