import { Box, Paper, Typography } from '@mui/material';
import { Memory } from '../simulator/simulatedReducer';

const VIEW_WIDTH = 16;

export default function MemoryView({ memory }: { memory: Memory }) {
	return (
		<div>
			<Typography variant="h2" mb={2}>
				Pamięć
			</Typography>

			<Paper
				sx={{
					display: 'grid',
					gridTemplateColumns: `repeat(${VIEW_WIDTH}, 1fr)`,
				}}
			>
				{memory.map((memoryValue, index) => (
					<Box
						sx={{
							p: 0.3,
							border: '1px solid rgba(0, 0, 0, 0.2)',
						}}
						key={`memoryValue-${index}`}
					>
						{memoryValue}
					</Box>
				))}
			</Paper>
		</div>
	);
}
