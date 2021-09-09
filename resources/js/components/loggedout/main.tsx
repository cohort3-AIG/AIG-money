import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Copyright } from '../shared'
import { Home, Login, SignUp } from "./components"
import { CssBaseline } from "@mui/material"
function Main() {
    return (
        <>
            <CssBaseline />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Copyright />
        </>
    );
}
export default Main;
