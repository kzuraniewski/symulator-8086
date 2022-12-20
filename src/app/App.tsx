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
	const [inputParams, setInputParams] = useState<SimulationInputParameters>({
		...initialRegisterValues,
		offset: 0,
	});
	const {
		simulated,
		reset,
		orders: { mov, xhcg, push, pop },
	} = useSimulator();

	const handleCalculate = () => {
		const { AX, BX, CX, DX, offset } = inputParams;

		// do stuff...
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
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="stretch"
					>
						<div>
							<OrderSelect
								methodName={methodName}
								onChange={setMethodName}
							/>

							<ParametersForm
								params={inputParams}
								onChange={setInputParams}
							/>
						</div>

						<Registers registers={simulated.registers} />
					</Stack>

					<Stack
						spacing={3}
						direction="row"
						justifyContent="center"
						mt={5}
					>
						<Button variant="outlined" onClick={reset}>
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

export default App;
