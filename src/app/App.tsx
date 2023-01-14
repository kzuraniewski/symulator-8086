import { CssBaseline, ThemeProvider } from '@mui/material';
import { Layout } from '../components';
import theme from './theme';
import SimulatorController from '../components/SimulatorController';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout>
				<SimulatorController />
			</Layout>
		</ThemeProvider>
	);
}
