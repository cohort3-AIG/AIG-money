import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Box, Typography, } from "@mui/material"
import { SideBar, Dashboard } from "./components"
import { styled } from '@mui/material/styles'
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
function Main() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                aaa
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Route exact path="/console" component={Dashboard} />
                </Box>
            </Box>
        </>
    );
}

export default Main