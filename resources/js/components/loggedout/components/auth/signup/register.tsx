import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Stepper, Step, StepLabel, AppBar, Toolbar, Typography, Button } from '@mui/material/';
import Check from '@mui/icons-material/Check';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SignUp from "./components/signup"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import Phone from './components/phone';
import PhoneConfirm from './components/phone_confirm';
import WalletCreate from './components/wallet_create';
import EmailConfirm from './components/email_confirm';
import { RegisterContext } from '../../../../../store/context/register';
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(10, 25, 1) 0%, rgb(68, 173, 6) 50%, rgb(208, 253, 181) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 136deg, rgb(10, 25, 1) 0%, rgb(68, 173, 6) 50%, rgb(208, 253, 181) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(10, 25, 1) 0%, rgb(68, 173, 6) 50%, rgb(208, 253, 181) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(10, 25, 1) 0%, rgb(68, 173, 6) 50%, rgb(208, 253, 181) 100%)',
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <PhoneAndroidIcon />,
        2: <PersonAddIcon />,
        3: <AccountBalanceWalletIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const steps = ['Mobile Number', 'Create User', 'Create Wallet'];
export default function Register() {
    let { path } = useRouteMatch()
    const { register } = useContext(RegisterContext);
    return (
        <Box sx={{ minHeight: "95vh" }}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Enviar Dinheiro
                    </Typography>
                    <Button >Login</Button>
                    <Box sx={{ flexGrow: 1 }}></Box>
                </Toolbar>
            </AppBar>

            <Header />
            <Box sx={{ minHeight: "70vh", paddingBottom: 10 }}>
                <Switch>
                    <Route exact path={`${path}`} component={Phone} />
                    <Route path={`${path}/signup`} component={SignUp} />
                    <Route path={`${path}/phone_confirm`} component={PhoneConfirm} />
                    <Route path={`${path}/email_confirm`} component={EmailConfirm} />
                    <Route path={`${path}/wallet_create`} component={WalletCreate} />
                </Switch>
            </Box>
            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper alternativeLabel activeStep={register.step} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>
        </Box>
    );
}
