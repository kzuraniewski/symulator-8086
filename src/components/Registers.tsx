import { Stack, Typography } from '@mui/material';
import type { RegisterName } from '../simulator/simulationTypes';

export default function Registers({
	registers,
}: {
	registers: Record<RegisterName, string>;
}) {
	return (
		<Stack spacing={2} justifyContent="center" alignItems="center">
			{Object.entries(registers).map(([name, value]) => (
				<Typography>
					{name}: {value || '[empty]'}
				</Typography>
			))}
		</Stack>
	);
}
