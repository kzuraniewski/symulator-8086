import { Box, Stack, Typography } from '@mui/material';
import { RegisterName } from '@/simulator/simulatedReducer';

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
