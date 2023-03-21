import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: "#48BDE2"
    },
    secondary: {
      main: "#FFBF5B"
    },
    dark: {
      main: "#292A2D",
      contrastText: "#fff"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Rubik', sans-serif",
          fontWeight:"300",
          borderRadius: "100px",
          '&:hover': {
            backgroundColor: "#fff",
            outline: "1px solid #48BDE2" , 
            color: "#48BDE2",
            boxShadow: "none"
          }
        },
        
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
       <App />
    </ThemeProvider>
  </BrowserRouter>
)
