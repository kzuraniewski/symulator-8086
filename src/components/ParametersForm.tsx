import { Stack, Typography } from '@mui/material';
import {
	// AddressingModeSelect,
	Field,
} from '../components';
import type {
	// AddressingMode,
	RegisterName,
	State,
} from '../simulator/simulatedReducer';

export default function ParametersForm({
	params,
	onRegisterChange,
}: {
	params: State;
	onRegisterChange?: (registerName: RegisterName, value: string) => void;
	// onOffsetChange?: (value: number) => void;
	// onAddressingModeChange?: (value: AddressingMode) => void;
}) {
	return (
		<div>
			<Typography variant="h2" mb={2}>
				Rejestry
			</Typography>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="stretch"
				spacing={3}
			>
				<Stack
					direction="row"
					flexWrap="wrap"
					gap="20px"
					maxWidth={300}
				>
					{Object.entries(params.registers).map(
						([registerName, registerValue]) => (
							<Field
								key={`param-${registerName}`}
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

					{/* FIXME: Value not updated
				<Field
					label="Offset"
					type="number"
					value={params.offset}
					onChange={(event) =>
						onOffsetChange?.(Number(event.target.value))
					}
				/> */}
				</Stack>

				{/* <AddressingModeSelect
				value={params.addressingMode}
				onChange={(value) => onAddressingModeChange?.(value)}
			/> */}
			</Stack>
		</div>
	);
}
