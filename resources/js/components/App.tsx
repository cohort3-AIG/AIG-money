import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../store/context/auth'
import { CircularProgress, Typography } from "@mui/material"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import LoggedInComponent from './loggedin/main'
import LoggedOutComponent from './loggedout/main'
import { useEffect } from "react";


const App = () => {
  const { auth, authCheckState } = useContext(AuthContext)
  const themeMui = createTheme({
    typography: {
      fontFamily: 'monospace',
      },
      breakpoints:{
      
      },
      shape:{
      borderRadius:30,
      },
      
      spacing:2,
      
      palette: {
      primary: {
      main: '#3C9905',
      },
      secondary:{
      main: '#00FF00',
      },
      },
      });
      themeMui.typography.h6={
      flexGrow: 1, 
      fontStyle: 'normal', 
      fontWeight: 'bold',
      fontSize: '1rem',
      '@media (min-width:600px)': {
      fontSize: '1.3rem',
      },
      [themeMui.breakpoints.up('md')]: {
      fontSize: '1.6rem',
      },
      };
      themeMui.typography.h4={
      paddingTop: 8, 
      flexGrow: 1, 
      fontStyle: 'normal', 
      fontWeight: 'bold', 
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1rem',
      '@media (min-width:600px)': {
      fontSize: '1.2rem',
      },
      [themeMui.breakpoints.up('md')]: {
      fontSize: '1.5rem',
      },
      };
      themeMui.typography.h5={
      alignItems: 'center', 
      paddingLeft: 50, 
      paddingTop: 6, 
      justifyContent: 'center', 
      flexGrow: 1, 
      marginX: "auto",
      fontSize: '1rem',
      '@media (min-width:600px)': {
      fontSize: '1.25rem',
      },
      [themeMui.breakpoints.up('md')]: {
      fontSize: '1.45rem',
      },
      };
      themeMui.typography.h3={
      alignItems: 'center', 
      paddingLeft: 40, 
      paddingTop: 7, 
      justifyContent: 'center', 
      flexGrow: 1, 
      marginX: "auto",
      fontSize: '0.7rem',
      '@media (min-width:600px)': {
      fontSize: '1rem',
      },
      [themeMui.breakpoints.up('md')]: {
      fontSize: '1.2rem',
      },
      };
      
  useEffect(() => {
    authCheckState()
  }, []);
  console.log(auth)
  return (
    <Router>
      <ThemeProvider theme={themeMui}>
        <Switch>
          <Route path="/console">
            {auth.token !== "null" ? (
              <><LoggedInComponent /></>
            ) : (
              <><Redirect to="/login" /></>)
            }
          </Route>
          <Route path="/">
            <LoggedOutComponent />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router >
  );
};

export default App;