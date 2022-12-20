import { Stack, TextField } from '@mui/material';
import type { SimulationInputParameters } from '@/simulator/simulationTypes';

export default function ParametersForm({
	params: value,
	onChange,
}: {
	params: SimulationInputParameters;
	onChange?: (values: SimulationInputParameters) => void;
}) {
	return (
		<Stack spacing={1} mt={3}>
			{['BX', 'BP', 'DI', 'SI', 'offset'].map((name) => (
				<TextField
					value={'asd'}
					key={name}
					label={name}
					variant="filled"
					size="small"
				/>
			))}
		</Stack>
	);
}
