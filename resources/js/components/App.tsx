import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../store/context/auth'
import { CircularProgress } from "@mui/material"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import LoggedInComponent from './loggedin/main'
import LoggedOutComponent from './loggedout/main'


const App = () => {
  const { auth, authCheckState } = useContext(AuthContext)
  const themeMui = createTheme({
    palette: {
      primary: {
        main: '#3C9905',
      },
    },
  });
  return (
    <Router>
      <ThemeProvider theme={themeMui}>
        {/* <Suspense fallback={<><CircularProgress /></>}> */}
        <Switch>
          <Route path="/console">
            <LoggedInComponent />
          </Route>
          <Route path="/">
            <LoggedOutComponent />
          </Route>
        </Switch>
        {/* </Suspense> */}
      </ThemeProvider>
    </Router >
  );
};

export default App;