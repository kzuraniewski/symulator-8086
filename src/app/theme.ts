import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
	typography: {
		h1: {
			fontSize: '3rem',
		},
		h2: {
			fontSize: '1.5rem',
		},
	},
});

export default theme;
