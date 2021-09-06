import React, { Fragment, lazy, Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../store/context/auth'
import { CircularProgress } from "@mui/material"
const LoggedInComponent = lazy(() => import("./loggedin/main"))
const LoggedOutComponent = lazy(() => import("./loggedout/main"))

const App = () => {
    const { auth, authCheckState } = useContext(AuthContext)
    return (
        <Router>
            <Suspense fallback={<><CircularProgress /></>}>
                <Switch>
                    <LoggedOutComponent />
                    <LoggedInComponent />
                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;