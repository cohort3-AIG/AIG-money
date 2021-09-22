import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from './store/context/auth'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LoggedInComponent from './components/loggedin/main'
import LoggedOutComponent from './components/loggedout/main'
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
  console.log(auth)
  return (
    <Router>
      <ThemeProvider theme={themeMui}>
        <Switch>
          <Route path="/console">
            {/* {auth.token !== "null" ? ( */}
              <>
                <LoggedInComponent />
              </>
            {/* // ) : (
            //   <><Redirect to="/login" /></>)
            // } */}
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