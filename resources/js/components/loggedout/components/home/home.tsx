import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled, makeStyles } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
//import Paper from '@mui/material/Paper';
//import Image from '/images/image3.png'; //stting  path to image
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Collapse } from '@mui/material';
import { ArrowLeft, ExpandMore } from '@mui/icons-material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

//import Image from '../image/main.png';

const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    //...theme.mixins.toolbar,
}));

// const styles = styled('div')((theme)) => ( {
//     image:{
//    width: "70%",
//    height: "300px",
//     }

// });
// const useStyles = makeStyles({
//   root: `
//   flexGrow: 1, 
//   fontSize: 40, 
//   fontStyle: 'normal', 
//   fontFamily: 'Monospace', 
//   fontWeight: 'Bold', 
//   justifyContent: 'center', 
//   alignItems: 'center', 
//   py: 10
//   `,
// });

export default function Home() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    // logInHandler = () =>{
    //     return a.href = "http://localhost:8000/Signup";

    // }
    const history = useHistory();

    return (

        <>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 20, fontFamily: 'Monospace', fontStyle: 'normal', fontWeight: 'Bold' }} color="primary">
                            Enviar Dinheiro
                        </Typography>
                        <IconButton>
                            <ExpandMore style={{ color: 'green', fontSize: '3rem' }} />
                        </IconButton>
                        {/* <Button>
                            login
                        </Button>
                        <Button variant="contained" sx={{ borderRadius: 10 , marginRight: 5}}>
                            signup
                        </Button> */}

                        <Stack spacing={2} direction="row" sx={{ marginRight: 5 }}>
                            <Button onClick={() => { history.push('login') }} variant="outlined" sx={{ borderRadius: 10 }}>Log In</Button>
                            <Button onClick={() => { history.push('signup') }} variant="contained" sx={{ borderRadius: 10 }}>Sign Up</Button>
                        </Stack>


                    </Toolbar>
                </AppBar>
                <Header />
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3} >
                            <Grid item xs={7}>


                                <Box m="auto" sx={{
                                    width: "100%",
                                    height: "60vh",
                                    backgroundImage: "url(" + "https://media.istockphoto.com/photos/woman-receiving-digital-money-using-phone-picture-id1289220813?k=20&m=1289220813&s=612x612&w=0&h=ux_RHNcznzzvRHk2t5bWG1lezuk8dXpTVfwOwCmVSPw=" + ")",
                                    backgroundPosition: 'left',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    pl: 5

                                }} />



                            </Grid>

                            <Grid item xs={5} sx={{ float: 'right', justifyContent: 'center' }}>

                                <Collapse
                                    in={checked}
                                    {...(checked ? { timeout: 2000 } : {})}>


                                    <Typography variant="h4" color="primary" sx={{ py: 8, flexGrow: 1, color: "green", fontSize: 40, fontStyle: 'normal', fontFamily: 'Monospace', fontWeight: 'Bold', justifyContent: 'center', alignItems: 'center' }}>
                                        Tranfer money to loved ones the easiest way possible
                                        <nav style={{ paddingTop: 6, fontSize: 20, fontStyle: 'normal', color: 'grey' }}>
                                            let's go cashless together
                                        </nav>
                                    </Typography>

                                </Collapse>

                            </Grid>
                        </Grid>
                    </Box>
                    <Box m="auto" display="flex" sx={{ maxHeight: 700 }} >

                        <Paper elevation={10} sx={{
                            justifyContent: 'center',
                            maxHeight: 500,
                            alignItems: 'center',
                            width: "100%",
                            height: "70vh",
                            bgcolor: 'white'
                            // '&:hover': {
                            //   backgroundColor: 'grey',
                            //   opacity: [0.9, 0.8, 0.7],
                            //},
                        }} >

                            <Typography variant="h4" sx={{ alignItems: 'center', fontSize: 40, px: 50, pt: 6, justifyContent: 'center', flexGrow: 1, marginX: "auto" }}>Get started with us today</Typography>
                            <Box sx={{ px: 70, pt: 5 }} position="static">
                                <Button onClick={() => { history.push('signup') }} variant="outlined" sx={{ borderRadius: 10, alignItems: 'centre' }}>Get Started</Button>
                            </Box>
                            <Typography variant="h5" sx={{ alignItems: 'center', px: 40, pt: 7, justifyContent: 'center', flexGrow: 1, marginX: "auto" }}>
                                Find out why we are the best at securing your money online
                                <nav style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                                    With a very easy guide on how it can be shared with loved ones
                                </nav>
                            </Typography>

                            <Box sx={{ px: 65, pt: 6 }} >
                                <Button variant="contained" sx={{ borderRadius: 10, alignItems: 'centre', px: 5 }}>Learn More</Button>
                            </Box>

                        </Paper>
                    </Box>
                </>
                <>

                    <Paper sx={{ maxHeight: 700, mx: 10 }}>
                        <Grid container spacing={1}>

                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 350 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image="/images/main.png"
                                            alt="Another image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div" >
                                                MAKE ONLINE PAYMENTS
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Pay with us for all your online purchases
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 350 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image="/images/image1.png"
                                            alt="Another image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div" >
                                                KEEP WITH US
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Being cashless has never been easier
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 350 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image="/images/image3.png"
                                            alt="Another image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div" >
                                                TRANSFER FUNDS
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Transfer money to loved ones in an insatnt
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            </Box>
        </>
    );
}