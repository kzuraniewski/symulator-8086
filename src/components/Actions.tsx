import { Stack, Button } from '@mui/material';

export default function Actions({
	onCalculate,
	onReset,
}: {
	onCalculate?: () => void;
	onReset?: () => void;
}) {
	return (
		<Stack spacing={3} direction="row">
			<Button variant="outlined" onClick={onReset}>
				RESETUJ
			</Button>
			<Button variant="contained" onClick={onCalculate}>
				OBLICZ
			</Button>
		</Stack>
	);
}