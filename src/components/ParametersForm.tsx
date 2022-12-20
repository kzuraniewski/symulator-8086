import { Box, Stack, TextField, TextFieldProps } from '@mui/material';
import type { SimulationInputParameters } from '../simulator/simulationTypes';

const fieldTemplates: [
	keyof SimulationInputParameters,
	TextFieldProps['type']
][] = [
	['BX', 'text'],
	['BP', 'text'],
	['DI', 'text'],
	['SI', 'text'],
	['offset', 'number'],
];

export default function ParametersForm({
	params,
	onChange,
}: {
	params: SimulationInputParameters;
	onChange?: (
		paramName: keyof SimulationInputParameters,
		// TODO: infer type precisely
		value: SimulationInputParameters[typeof paramName]
	) => void;
}) {
	return (
		<Stack direction="row" flexWrap="wrap" gap="20px" maxWidth={300}>
			{fieldTemplates.map(([name, type]) => (
				<TextField
					label={name}
					type={type}
					value={params[name]}
					onChange={(event) => onChange?.(name, event.target.value)}
					variant="filled"
					size="small"
					fullWidth
					sx={{ width: 'calc(50% - 10px)' }}
				/>
			))}
		</Stack>
	);
}
