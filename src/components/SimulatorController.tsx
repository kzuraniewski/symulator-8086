import { Stack } from '@mui/material';
import {
	ParametersForm,
	Actions,
	MemoryView,
	Panel,
	Grid,
	QueryInput,
} from '.';
import { InterprettedQuery } from '../lib/interpreter';
import useSimulator from '../simulator/useSimulator';
import StackView from './StackView';

export default function SimulatorController() {
	const {
		simulated,
		resetSimulationState,
		setOrderName,
		setArguments,
		setRegister,
		setOffset,
		setAddressingMode,
		execute,
	} = useSimulator();

	const handleInterpret = (interprettedQuery: InterprettedQuery) => {
		console.log(interprettedQuery);

		if (!interprettedQuery) return;

		setOrderName(interprettedQuery.orderName);
		setArguments(interprettedQuery.arguments);
	};

	return (
		<Grid container spacing={2} justifyContent="stretch">
			<Grid xs={4}>
				<ParametersForm
					params={simulated}
					onRegisterChange={setRegister}
					onOffsetChange={setOffset}
					onAddressingModeChange={setAddressingMode}
				/>
			</Grid>

			<Grid xs={6}>
				<MemoryView memory={simulated.memory} />
			</Grid>

			<Grid xs={2}>
				<StackView stack={simulated.stack} />
			</Grid>

			<Grid xs={12}>
				<Panel>
					<Stack gap={2} alignItems="center">
						<QueryInput onInterpret={handleInterpret} />

						<Actions
							onCalculate={execute}
							onReset={resetSimulationState}
							disableCalculate={
								simulated.args[0] === simulated.args[1]
							}
						/>
					</Stack>
				</Panel>
			</Grid>
		</Grid>
	);
}
