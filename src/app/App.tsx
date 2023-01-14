import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Layout, OrderSelect, ParametersForm } from '../components';
import useSimulator from '../simulator/useSimulator';
import { MethodName } from '../simulator/simulationTypes';

export default function App() {
	const [methodName, setMethodName] = useState<MethodName>('MOV');
	const {
		simulated,
		resetSimulationState,
		setRegister,
		setOffset,
		setAddressingMode,
		orders: { mov, xhcg, push, pop },
	} = useSimulator();

	const handleCalculate = () => {
		switch (methodName) {
			case 'MOV':
				console.log('MOV action initiated from AX to BX');
				mov('BX', 'AX');
				return;
			case 'XHCG':
				console.log('XHCG action initiated for AX and BX');
				xhcg('AX', 'BX');
				return;
			case 'PUSH':
				console.log('PUSH action initiated for AX');
				push('AX');
				return;
			case 'POP':
				console.log('POP action initiated for AX');
				pop('AX');
				return;
		}
	};

	return (
		<Layout>
			<Box sx={{ mx: 'auto', mb: 4, width: 'fit-content' }}>
				<OrderSelect methodName={methodName} onChange={setMethodName} />
			</Box>

			<ParametersForm
				params={simulated}
				onRegisterChange={setRegister}
				onOffsetChange={setOffset}
				onAddressingModeChange={setAddressingMode}
			/>

			<Stack spacing={3} direction="row" justifyContent="center" mt={5}>
				<Button variant="outlined" onClick={resetSimulationState}>
					RESETUJ
				</Button>
				<Button variant="contained" onClick={handleCalculate}>
					OBLICZ
				</Button>
			</Stack>
		</Layout>
	);
}
