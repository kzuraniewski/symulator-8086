import { Stack } from '@mui/material';
import { AddressingModeSelect, Field, Panel } from '../components';
import { fromHex, isHexFormat, toHex } from '../lib/hex';
import type {
	ElementaryValue,
	AddressingMode,
	RegisterName,
	State,
} from '../simulator/simulatedReducer';

export default function ParametersForm({
	params,
	onRegisterChange,
	onOffsetChange,
	onAddressingModeChange,
}: {
	params: State;
	onRegisterChange?: (
		registerName: RegisterName,
		value: ElementaryValue
	) => void;
	onOffsetChange?: (value: number) => void;
	onAddressingModeChange?: (value: AddressingMode) => void;
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

	// FIXME: Duplicated code
	const handleOffsetValueChange = (value: string) => {
		if (!isHexFormat(value)) {
			console.info(
				`Cannot update register's value to "${value}" as it is not a valid hex format`
			);
			return;
		}

		onOffsetChange?.(fromHex(value));
	};

	return (
		<Panel label="Rejestry">
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

					<Field
						label="Offset"
						type="text"
						value={toHex(params.offset)}
						onChange={(event) =>
							handleOffsetValueChange(event.target.value)
						}
					/>

					{/* <AddressingModeSelect
						value={params.addressingMode}
						onChange={(value) => onAddressingModeChange?.(value)}
					/> */}
				</Stack>
			</Stack>
		</Panel>
	);
}
