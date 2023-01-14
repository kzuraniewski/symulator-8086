import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';
import { AddressingMode, addressingModes } from '../simulator/simulatedReducer';

const addressingModeLabelMapping: Record<AddressingMode, string> = {
	base: 'Bazowe',
	index: 'Indeksowe',
	'base-index': 'Bazowo indeksowe',
};

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
				{addressingModes.map((addressingModeName, index) => (
					<FormControlLabel
						key={`addressingMode-${index}`}
						value={addressingModeName}
						control={<Radio />}
						label={addressingModeLabelMapping[addressingModeName]}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
