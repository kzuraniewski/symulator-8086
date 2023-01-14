import { Paper, Typography } from '@mui/material';

export default function Panel({
	label,
	children,
}: {
	label?: string;
	children?: React.ReactNode;
}) {
	return (
		<Paper sx={{ p: 2, width: '100%' }}>
			{label && (
				<Typography variant="h2" mb={2}>
					{label}
				</Typography>
			)}

			{children}
		</Paper>
	);
}
