import {
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Stack,
} from '@mui/material';
import { OrderBody } from '../lib/useOrderBody';
import {
	OrderName,
	orderNames,
	RegisterName,
	registerNames,
} from '../simulator/simulatedReducer';

export default function OrderSelect({
	orderBody,
	onChange,
}: {
	orderBody: OrderBody;
	onChange?: (value: OrderBody) => void;
}) {
	const updateOrderName = (value: OrderName) => {
		onChange?.({
			...orderBody,
			orderName: value,
		});
	};

	const updateArgument = (index: number, value: RegisterName) => {
		const newArguments = [...orderBody.arguments];
		newArguments[index] = value;

		onChange?.({
			...orderBody,
			arguments: newArguments,
		});
	};

	return (
		<Stack direction="row" gap={2} mx="auto" mt={10} width="fit-content">
			<FormControl>
				<InputLabel>Rozkaz</InputLabel>
				<Select
					value={orderBody.orderName}
					label="Rozkaz"
					onChange={(event) =>
						updateOrderName(event.target.value as OrderName)
					}
				>
					{orderNames.map((orderName, index) => (
						<MenuItem key={`orderItem-${index}`} value={orderName}>
							{orderName}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{orderBody.arguments.map((argValue, argIndex) => (
				<FormControl key={`argValue-${argIndex}`}>
					<InputLabel>Argument {argIndex}</InputLabel>
					<Select
						value={argValue}
						label={`Argument ${argIndex}`}
						sx={{
							width: '7rem',
						}}
						onChange={(event) =>
							updateArgument(
								argIndex,
								event.target.value as RegisterName
							)
						}
					>
						{registerNames.map((registerName, registerIndex) => (
							<MenuItem
								key={`argument${argIndex}Item-${registerIndex}`}
								value={registerName}
							>
								{registerName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			))}
		</Stack>
	);
}
