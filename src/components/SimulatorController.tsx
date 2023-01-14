import { Paper, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { OrderSelect, ParametersForm, Actions, MemoryView, Panel } from '.';
import useOrderBody from '../lib/useOrderBody';
import useSimulator from '../simulator/useSimulator';

export default function SimulatorController() {
	const { orderBody, setOrderBody, resetOrderBody } = useOrderBody();
	const {
		simulated,
		resetSimulationState,
		setRegister,
		// setOffset,
		// setAddressingMode,
		orders: { mov, xhcg, push, pop },
	} = useSimulator();

	const handleCalculate = () => {
		const [arg0, arg1] = orderBody.arguments;

		switch (orderBody.orderName) {
			case 'MOV':
				console.log(`MOV action initiated from ${arg1} to ${arg0}`);
				mov(arg0, arg1);
				return;
			case 'XHCG':
				console.log(`XHCG action initiated for ${arg0} and ${arg1}`);
				xhcg(arg0, arg1);
				return;
			case 'PUSH':
				console.log(`PUSH action initiated for ${arg0}`);
				push(arg0);
				return;
			case 'POP':
				console.log(`POP action initiated for ${arg0}`);
				pop(arg0);
				return;
		}
	};

	const handleReset = () => {
		resetSimulationState();
		resetOrderBody();
	};

	return (
		<Grid container spacing={2} justifyContent="stretch">
			<Grid xs={4}>
				<ParametersForm
					params={simulated}
					onRegisterChange={setRegister}
				/>
			</Grid>
			<Grid xs={8}>
				<MemoryView memory={simulated.memory} />
			</Grid>

			<Grid xs={12}>
				<Panel>
					<Stack gap={2} alignItems="center">
						<OrderSelect
							orderBody={orderBody}
							onChange={setOrderBody}
						/>
						<Actions
							onCalculate={handleCalculate}
							onReset={handleReset}
							disableCalculate={
								orderBody.arguments[0] ===
								orderBody.arguments[1]
							}
						/>
					</Stack>
				</Panel>
			</Grid>
		</Grid>
	);
}
