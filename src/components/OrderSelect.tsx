import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import type { MethodName } from '@/simulator/simulationTypes';

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
