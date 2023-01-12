import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Layout, Registers, OrderSelect, ParametersForm } from '../components';
import useSimulator from '../simulator/useSimulator';
import { MethodName } from '../simulator/simulationTypes';
import useInputParams from '../lib/useInputParams';

export default function App() {
	const [methodName, setMethodName] = useState<MethodName>('MOV');
	const { inputParams, setInputParams, resetInputParams } = useInputParams();
	const {
		simulated,
		resetSimulationState,
		orders: { mov, xhcg, push, pop },
	} = useSimulator();

	const handleCalculate = () => {
		const { AX, BX, CX, DX, BP, DI, SI, offset, addressingMode } =
			inputParams;

		switch (methodName) {
			case 'MOV':
				console.log('MOV action initiated');
				return;
			case 'XHCG':
				console.log('XHCG action initiated');
				return;
			case 'PUSH':
				console.log('PUSH action initiated');
				return;
			case 'POP':
				console.log('POP action initiated');
				return;
		}
	};

	return (
		<Layout>
			<Box sx={{ mx: 'auto', mb: 4, width: 'fit-content' }}>
				<OrderSelect methodName={methodName} onChange={setMethodName} />
			</Box>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="stretch"
				spacing={3}
			>
				<ParametersForm
					params={inputParams}
					onChange={(paramName, value) =>
						setInputParams((params) => ({
							...params,
							[paramName]: value,
						}))
					}
				/>

				<Registers registers={simulated.registers} />
			</Stack>

			<Stack spacing={3} direction="row" justifyContent="center" mt={5}>
				<Button
					variant="outlined"
					onClick={() => {
						resetSimulationState();
						resetInputParams();
					}}
				>
					RESETUJ
				</Button>
				<Button variant="contained" onClick={handleCalculate}>
					OBLICZ
				</Button>
			</Stack>
		</Layout>
	);
}
