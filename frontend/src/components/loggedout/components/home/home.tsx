import { useContext, useState } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled, makeStyles } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Collapse } from '@mui/material';
import { ArrowLeft, ExpandMore } from '@mui/icons-material';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AuthContext } from "../../../../store/context/auth"
//import Image from '../image/main.png';

const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
export default function Home() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { auth } = useContext(AuthContext)


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
    const history = useHistory();
    console.log(auth)
    return (

        <>
            <CssBaseline />
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 20, fontFamily: 'Monospace', fontStyle: 'normal', fontWeight: 'Bold' }} color="primary">
                        Enviar Dinheiro
                    </Typography>
                    <Stack spacing={2} direction="row" sx={{ marginRight: 5 }}>
                        {(auth.token === 'null' || auth.token === null) && (<Button onClick={() => { history.push('login') }} variant="outlined" sx={{ borderRadius: 10 }}>Log In</Button>)}
                        {(auth.token === 'null' || auth.token === null) && (<Button onClick={() => { history.push('register') }} variant="contained" sx={{ borderRadius: 10 }}>Sign Up</Button>)}
                        {(auth.token !== 'null' && auth.token !== null) && (<Button onClick={() => { history.push('console') }} variant="contained" sx={{ borderRadius: 10 }}>dashboard</Button>)}
                    </Stack>
                </Toolbar>
            </AppBar>
            <Header />
            <>
                <Box sx={{ width: "80%", marginX: "auto" }}>
                    <Grid container spacing={5} >
                        <Grid item xs={7}>
                            <Box m="auto" sx={{
                                width: "100%",
                                height: "60vh",
                                backgroundImage: "url(" + "https://media.istockphoto.com/photos/woman-receiving-digital-money-using-phone-picture-id1289220813?k=20&m=1289220813&s=612x612&w=0&h=ux_RHNcznzzvRHk2t5bWG1lezuk8dXpTVfwOwCmVSPw=" + ")",
                                backgroundPosition: 'left',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }} />
                        </Grid>

                        <Grid item xs={5} sx={{ float: 'right', justifyContent: 'center' }}>
                            <Box sx={{ position: "absolute", height: "60vh"}}>
                                <Collapse
                                    in={checked}
                                    {...(checked ? { timeout: 2000 } : {})}
                                    sx={{ lineHeight: 1,textAlign: "center" , marginTop: "20%"}}
                                >
                                    <Typography variant="h3" color="primary" >
                                        Tranfer money to loved ones the easiest way possible
                                    </Typography>
                                    <Typography variant="h4" color="grey">
                                        let's go cashless together
                                    </Typography>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{
                                alignItems: "center",
                                padding: 5,
                                textAlign: 'center',
                                lineHeight: 5
                            }} >
                                <Typography variant="h4" >Get started with us today</Typography>
                                <Box >
                                    <Button onClick={() => { history.push('signup') }} variant="outlined" sx={{ borderRadius: 10, alignItems: 'centre' }}>Get Started</Button>
                                </Box>
                                <Typography variant="h5" >
                                    Find out why we are the best at securing your money online With a very easy guide on how it can be shared with loved one
                                </Typography>
                                <Box>
                                    <Button variant="contained" sx={{ borderRadius: 10, alignItems: 'centre', px: 5 }}>Learn More</Button>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card>
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
                        <Grid item xs={12} md={4}>
                            <Card >
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
                        <Grid item xs={12} md={4}>
                            <Card >
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
                        <Grid item xs={12}>
                            <Paper sx={{ padding: 5, width: "100%" }}>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6">Company</Typography>
                                        <Typography variant="body2">About Us</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6">Legal</Typography>
                                        <Typography variant="body2">Terms & Conditions</Typography>
                                        <Typography variant="body2">Privacy Policy</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </>
        </>
    );
}