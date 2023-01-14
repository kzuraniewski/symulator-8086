import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';
import type { AddressingMode } from '../simulator/simulationTypes';

export default function AddressingModeSelect({
	value,
	onChange,
}: {
	value: AddressingMode;
	onChange: (value: AddressingMode) => void;
}) {
	return (
		<FormControl sx={{ mt: 3 }}>
			<FormLabel>Sposób indeksowania</FormLabel>
			<RadioGroup
				value={value}
				onChange={(e) => onChange(e.target.value as AddressingMode)}
			>
				<FormControlLabel
					value="base"
					control={<Radio />}
					label="Bazowe"
				/>
				<FormControlLabel
					value="index"
					control={<Radio />}
					label="Indeksowe"
				/>
				<FormControlLabel
					value="base-index"
					control={<Radio />}
					label="Indeksowo bazowe"
				/>
			</RadioGroup>
		</FormControl>
	);
}
