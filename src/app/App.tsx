import { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Registers, OrderSelect } from '@/components';
import useSimulator from '@/simulator/useSimulator';
import type { MethodName } from '@/simulator/simulatedReducer';

const App = () => {
	const [methodName, setMethodName] = useState<MethodName>('MOV');
	const {
		simulated,
		orders: { mov, xhcg, push, pop },
	} = useSimulator();

	return (
		<Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: '100vh' }}>
			<Box sx={{ margin: '0 auto', maxWidth: 600 }}>
				<Box component="header" mb={4}>
					<Typography variant="h3" align="center">
						Symulator
					</Typography>
				</Box>

				<Paper sx={{ p: 2 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'stretch',
						}}
					>
						<div>
							<OrderSelect
								methodName={methodName}
								onChange={setMethodName}
							/>

							<Box
								sx={{
									mt: 3,
									display: 'flex',
									flexDirection: 'column',
									gap: 1,
								}}
							>
								{['BX', 'BP', 'DI', 'SI', 'offset'].map(
									(name) => (
										<TextField
											label={name}
											variant="filled"
											size="small"
										/>
									)
								)}
							</Box>
						</div>

						<Registers registers={simulated.registers} />
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							gap: 3,
							mt: 5,
						}}
					>
						<Button variant="outlined">RESETUJ</Button>
						<Button variant="contained">OBLICZ</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

/*

var max = -99999999;
foreach (var el in ...) if (el > max) max = el;
...

*/

export default App;
