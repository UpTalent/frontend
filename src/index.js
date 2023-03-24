import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { router } from './routes/router'

const theme = createTheme({
	palette: {
		primary: {
			main: '#48BDE2',
		},
		secondary: {
			main: '#FFBF5B',
		},
		dark: {
			main: '#292A2D',
			contrastText: '#fff',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontFamily: "'Rubik', sans-serif",
					fontWeight: '300',
					borderRadius: '100px'
				},
			},
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider theme={theme}>
		<RouterProvider router={router} />
	</ThemeProvider>
)
