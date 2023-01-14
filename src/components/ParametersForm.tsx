import { Stack, TextField, TextFieldProps } from '@mui/material';
import { AddressingModeSelect } from '../components';
import type {
	AddressingMode,
	RegisterName,
} from '../simulator/simulationTypes';
import type { State } from '../simulator/simulatedReducer';

export default function ParametersForm({
	params,
	onRegisterChange,
	onOffsetChange,
	onAddressingModeChange,
}: {
	params: State;
	onRegisterChange?: (registerName: RegisterName, value: string) => void;
	onOffsetChange?: (value: number) => void;
	onAddressingModeChange?: (value: AddressingMode) => void;
}) {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="stretch"
			spacing={3}
		>
			<Stack direction="row" flexWrap="wrap" gap="20px" maxWidth={300}>
				{Object.entries(params.registers).map(
					([registerName, registerValue]) => (
						<Field
							key={`param_${registerName}`}
							label={registerName}
							type="text"
							value={registerValue}
							onChange={(event) =>
								onRegisterChange?.(
									registerName as RegisterName,
									event.target.value
								)
							}
						/>
					)
				)}

				<Field
					label="Offset"
					type="number"
					value={params.offset}
					onChange={(event) =>
						onOffsetChange?.(Number(event.target.value))
					}
				/>
			</Stack>

			<AddressingModeSelect
				value={params.addressingMode}
				onChange={(value) => onAddressingModeChange?.(value)}
			/>
		</Stack>
	);
}

function Field(props: TextFieldProps) {
	return (
		<TextField
			variant="filled"
			size="small"
			fullWidth
			sx={{ width: 'calc(50% - 10px)' }}
			{...props}
		/>
	);
}
