import { Box, Paper, Typography } from '@mui/material';
import { Panel } from '.';
import { Memory } from '../simulator/simulatedReducer';

const VIEW_WIDTH = 16;

export default function MemoryView({ memory }: { memory: Memory }) {
	return (
		<Panel label="Pamięć">
			<Paper
				sx={{
					display: 'grid',
					gridTemplateColumns: `repeat(${VIEW_WIDTH}, 1fr)`,
				}}
			>
				{memory.map((memoryValue, index) => (
					<Box
						sx={{
							py: 0.3,
							px: 1,
							border: '1px solid rgba(0, 0, 0, 0.2)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						key={`memoryValue-${index}`}
					>
						{memoryValue}
					</Box>
				))}
			</Paper>
		</Panel>
	);
}
