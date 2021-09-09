import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Box, Typography, } from "@mui/material"
import { SideBar, Dashboard, Wallet, Beneficiaries, Statistics, Transactions, Settings } from "./components"
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
    let { path } = useRouteMatch()
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Switch>
                        <Route exact path={`${path}`} component={Dashboard} />
                        <Route path={`${path}/wallet`} component={Wallet} />
                        <Route path={`${path}/beneficiaries`} component={Beneficiaries} />
                        <Route path={`${path}/statistics`} component={Statistics} />
                        <Route path={`${path}/transactions`} component={Transactions} />
                        <Route path={`${path}/settings`} component={Settings} />
                    </Switch>
                </Box>
            </Box>
        </>
    );
}

export default Main