import { TextField, TextFieldProps } from '@mui/material';

export default function Field(props: TextFieldProps) {
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
