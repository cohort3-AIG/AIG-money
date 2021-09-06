import React, { useContext } from 'react'
import { Grid, LinearProgress, Avatar, Typography, Button, Box, Link, Paper, TextField } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from "../../../../shared"
import { AuthContext } from '../../../../../store/context/auth'

type Props = {
    classes: any,
    changeFormType: any,
}
interface IValues {

    email: string,
    password: string,
}
const Login: React.FC = (): JSX.Element => {
    const { login } = useContext(AuthContext)
    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                // className={classes.paper}
                sx={{
                    display: "flex", flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                // className={classes.avatar}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                // className={classes.form}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    // className={classes.submit}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
            </Box>
        </Grid >
    )
}

export default Login;