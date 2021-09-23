import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Box } from "@mui/material"
import { SideBar, Dashboard, Wallet, Statistics, Transactions, Settings, Wallet_Details } from "./components"
import { styled } from '@mui/material/styles'
import { Copyright } from '../shared'
import DepositContextProvider from "../../store/context/deposit"
import SendContextProvider from "../../store/context/send"
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
                        <DepositContextProvider>
                            <SendContextProvider>
                                <Route exact path={`${path}`} component={Dashboard} />
                            </SendContextProvider>
                        </DepositContextProvider>
                        <Route exact path={`${path}/wallet`} component={Wallet} />
                        {/* <Route exact path={`${path}/details`} component={Wallet_Details} /> */}
                        <Route exact path={`${path}/statistics`} component={Statistics} />
                        <Route exact path={`${path}/transactions`} component={Transactions} />
                        <Route exact path={`${path}/settings`} component={Settings} />
                    </Switch>
                </Box>
                <Copyright />
            </Box>
        </>
    );
}

export default Main