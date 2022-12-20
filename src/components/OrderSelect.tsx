import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { MethodName } from '@/simulator/simulatedReducer';

const methodNames: MethodName[] = ['MOV', 'XHCG', 'POP', 'PUSH'];

export default function OrderSelect({
	methodName,
	onChange,
}: {
	methodName: MethodName;
	onChange?: (value: MethodName) => void;
}) {
	return (
		<ToggleButtonGroup
			exclusive
			onChange={(_, value: MethodName) => onChange?.(value)}
			value={methodName}
		>
			{methodNames.map((name, index) => (
				<ToggleButton key={index} value={name}>
					{name}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
