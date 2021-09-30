import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Box } from "@mui/material"
import { SideBar, Dashboard, Statistics, Transactions, Settings } from "./components"
import { styled } from '@mui/material/styles'
import { Copyright } from '../shared'
import DepositContextProvider from "../../store/context/deposit"
import SendContextProvider from "../../store/context/send"
import BeneficiaryContextProvider from "../../store/context/beneficiary"
import Edit from './components/dashboard/components/beneficiary/edit'
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
            <Box sx={{ display: 'flex', minHeight: "97vh" }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Switch>
                        <DepositContextProvider>
                            <SendContextProvider>
                                <BeneficiaryContextProvider>
                                    <Route exact path={`${path}`} component={Dashboard} />
                                    <Route exact path={`${path}/beneficiary/:id`} component={Edit} />
                                    <Route exact path={`${path}/statistics`} component={Statistics} />
                                    <Route exact path={`${path}/transactions`} component={Transactions} />
                                    <Route exact path={`${path}/settings`} component={Settings} />
                                </BeneficiaryContextProvider>
                            </SendContextProvider>
                        </DepositContextProvider>
                    </Switch>
                </Box>
            </Box>
            <Copyright />
        </>
    );
}

export default Main