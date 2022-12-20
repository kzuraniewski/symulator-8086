import { TextField, Unstable_Grid2 as Grid } from '@mui/material';
import type { SimulationInputParameters } from '../simulator/simulationTypes';

export default function ParametersForm({
	params,
	onChange,
}: {
	params: SimulationInputParameters;
	onChange?: (values: SimulationInputParameters) => void;
}) {
	return (
		<Grid container spacing={2} my={2}>
			{(['BX', 'BP', 'DI', 'SI', 'offset'] as const).map((name) => (
				<Grid xs={6}>
					<TextField
						key={name}
						value={params[name]}
						label={name}
						variant="filled"
						size="small"
					/>
				</Grid>
			))}
		</Grid>
	);
}
