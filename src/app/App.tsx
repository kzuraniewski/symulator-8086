import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Layout, OrderSelect, ParametersForm } from '../components';
import useSimulator from '../simulator/useSimulator';
import { MethodName } from '../simulator/simulationTypes';
import Actions from '../components/Actions';

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

	const handleReset = () => {
		resetSimulationState();
		setMethodName('MOV');
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

			<Actions onCalculate={handleCalculate} onReset={handleReset} />
		</Layout>
	);
}
