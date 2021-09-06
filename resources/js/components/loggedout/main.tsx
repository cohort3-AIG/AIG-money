import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Authenticate, Home } from "./components"
function Main() {
    return (
        <>
            {/* <Switch> */}
                <Route exact path="/" component={Home} />
                <Route exact path="/auth" component={Authenticate} />
            {/* </Switch> */}
        </>
    );
}
export default Main;
