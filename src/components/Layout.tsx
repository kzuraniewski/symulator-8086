import { Box, Paper, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: '100vh' }}>
			<Box sx={{ margin: '0 auto', maxWidth: 800 }}>
				<Box component="header" mb={4}>
					<Typography variant="h3" align="center" mb={2}>
						Symulator Intel 8086
					</Typography>

					<Paper sx={{ p: 2 }}>{children}</Paper>
				</Box>
			</Box>
		</Box>
	);
}
