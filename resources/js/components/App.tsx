import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../store/context/auth'
import { CircularProgress } from "@mui/material"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import LoggedInComponent from './loggedin/main'
import LoggedOutComponent from './loggedout/main'
import { useEffect } from "react";


const App = () => {
  const { auth, authCheckState } = useContext(AuthContext)
  const themeMui = createTheme({
    palette: {
      primary: {
        main: '#3C9905',
      },
    },
  });
  useEffect(() => {
    authCheckState()
  }, []);
  useEffect(() => {
    console.log(auth.loading)
  });
  return (
    <Router>
      <ThemeProvider theme={themeMui}>
        <Switch>
          <Route path="/console">
            <LoggedInComponent />
          </Route>
          <Route path="/">
            {/* {auth.token !== null ? <Redirect to="/console" /> : <LoggedOutComponent />} */}
            <LoggedOutComponent/>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router >
  );
};

export default App;