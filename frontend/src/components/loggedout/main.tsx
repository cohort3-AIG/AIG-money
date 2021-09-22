import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Copyright } from '../shared'
import { Home, Login, SignUp } from "./components"
import { CssBaseline } from "@mui/material"
import RegisterContextProvider from '../../store/context/register';
function Main() {
    return (
        <>
            <CssBaseline />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <RegisterContextProvider>
                <Route path="/register" component={SignUp} />
            </RegisterContextProvider>
            <Copyright />
        </>
    );
}
export default Main;
