import { InputBase, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { interpret, InterprettedQuery } from '../lib/interpreter';

export default function QueryInput({
	onInterpret,
}: {
	onInterpret?: (interprettedQuery: InterprettedQuery) => void;
}) {
	const [value, setValue] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isErrorState, setIsErrorState] = useState(false);

	const updateValue = (value: string) => {
		setValue(value);
		setIsErrorState(false);

		if (value.length) {
			try {
				onInterpret?.(interpret(value));
				setError(null);
				return;
			} catch (error) {
				if (error instanceof Error) setError(error.message);
			}

			onInterpret?.(null);
		} else {
			setError(null);
		}
	};

	const handleBlur = () => {
		if (error) setIsErrorState(true);
		else setIsErrorState(false);
	};

	return (
		<div>
			<InputBase
				sx={{
					border: '1px solid white',
					backgroundColor: 'black',
					px: 2,
					py: 0.5,
				}}
				value={value}
				onChange={(event) => updateValue(event.target.value)}
				error={isErrorState}
				onBlur={handleBlur}
				placeholder="Wprowadź rozkaz"
			/>
			{isErrorState && error && (
				<FormHelperText error={isErrorState}>{error}</FormHelperText>
			)}
		</div>
	);
}
