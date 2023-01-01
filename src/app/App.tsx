import { useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Registers, OrderSelect, ParametersForm } from '../components';
import useSimulator from '../simulator/useSimulator';
import {
	MethodName,
	SimulationInputParameters,
} from '../simulator/simulationTypes';
import { initialRegisterValues } from '../simulator/simulatedReducer';

const App = () => {
	const [methodName, setMethodName] = useState<MethodName>('MOV');
	const {
		inputParams,
		setInputParams,
		reset: resetInputParams,
	} = useInputParams();
	const {
		simulated,
		reset,
		orders: { mov, xhcg, push, pop },
	} = useSimulator();

	const handleCalculate = () => {
		const { AX, BX, CX, DX, offset } = inputParams;

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
		<Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: '100vh' }}>
			<Box sx={{ margin: '0 auto', maxWidth: 800 }}>
				<Box component="header" mb={4}>
					<Typography variant="h3" align="center">
						Symulator
					</Typography>
				</Box>

				<Paper sx={{ p: 2 }}>
					<Box sx={{ mx: 'auto', mb: 4, width: 'fit-content' }}>
						<OrderSelect
							methodName={methodName}
							onChange={setMethodName}
						/>
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

					<Stack
						spacing={3}
						direction="row"
						justifyContent="center"
						mt={5}
					>
						<Button
							variant="outlined"
							onClick={() => {
								reset();
								resetInputParams();
							}}
						>
							RESETUJ
						</Button>
						<Button variant="contained" onClick={handleCalculate}>
							OBLICZ
						</Button>
					</Stack>
				</Paper>
			</Box>
		</Box>
	);
};

const useInputParams = () => {
	const initialParams = {
		...initialRegisterValues,
		offset: 0,
	};
	const [inputParams, setInputParams] =
		useState<SimulationInputParameters>(initialParams);

	const reset = () => setInputParams(initialParams);

	return {
		inputParams,
		setInputParams,
		reset,
	};
};

export default App;
