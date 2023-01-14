import { Stack, Button } from '@mui/material';

export default function Actions({
	onCalculate,
	onReset,
	disableCalculate = false,
}: {
	onCalculate?: () => void;
	onReset?: () => void;
	disableCalculate?: boolean;
}) {
	return (
		<Stack spacing={3} direction="row">
			<Button variant="outlined" onClick={onReset}>
				RESETUJ
			</Button>
			<Button
				variant="contained"
				onClick={onCalculate}
				disabled={disableCalculate}
			>
				OBLICZ
			</Button>
		</Stack>
	);
}
