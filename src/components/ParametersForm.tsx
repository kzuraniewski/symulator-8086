import { Paper, Stack, Typography } from '@mui/material';
import {
	// AddressingModeSelect,
	Field,
} from '../components';
import { fromHex, isHexFormat, toHex } from '../lib/hex';
import type {
	ElementaryValue,
	// AddressingMode,
	RegisterName,
	State,
} from '../simulator/simulatedReducer';

export default function ParametersForm({
	params,
	onRegisterChange,
}: {
	params: State;
	onRegisterChange?: (
		registerName: RegisterName,
		value: ElementaryValue
	) => void;
	// onOffsetChange?: (value: number) => void;
	// onAddressingModeChange?: (value: AddressingMode) => void;
}) {
	const handleRegisterValueChange = (
		registerName: RegisterName,
		value: string
	) => {
		if (!isHexFormat(value)) {
			console.info(
				`Cannot update register's value to "${value}" as it is not a valid hex format`
			);
			return;
		}

		onRegisterChange?.(registerName as RegisterName, fromHex(value));
	};

	return (
		<Paper sx={{ p: 2, height: '100%' }}>
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
								value={toHex(registerValue)}
								onChange={(event) =>
									handleRegisterValueChange(
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
		</Paper>
	);
}
