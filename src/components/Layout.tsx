import { Box, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<Box
			sx={{
				backgroundColor: 'rgba(0, 0, 0, 0.03)',
				py: 5,
				px: 1,
				minHeight: '100vh',
			}}
		>
			<Box sx={{ margin: '0 auto', maxWidth: 800 }}>
				<Typography variant="h1" align="center" mb={5}>
					Symulator Intel 8086
				</Typography>

				{children}
			</Box>
		</Box>
	);
}
