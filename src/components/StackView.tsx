import { Paper, Typography } from '@mui/material';
import { Panel } from '.';
import { toHex } from '../lib/hex';
import { Stack } from '../simulator/simulatedReducer';

export default function StackView({ stack }: { stack: Stack }) {
	const reversedStack = [...stack].reverse();

	return (
		<Panel label="Stos">
			<Paper
				variant="outlined"
				sx={{
					p: 1,
					background: 'none',
					overflow: 'auto',
					maxHeight: 240,
				}}
			>
				{stack.length ? (
					reversedStack.map((stackValue, index) => (
						<div key={`stackValue-${stack.length - 1 - index}`}>
							<Typography
								variant="body2"
								color="GrayText"
								component="span"
							>
								{stack.length - 1 - index}:{' '}
							</Typography>
							{toHex(stackValue)}
						</div>
					))
				) : (
					<Typography variant="body2" color="GrayText">
						Stos jest pusty
					</Typography>
				)}
			</Paper>
		</Panel>
	);
}
