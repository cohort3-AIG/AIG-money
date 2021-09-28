import React, { useContext, useEffect } from 'react'
import { Grid, LinearProgress, Avatar, Typography, Button, Box, Link, Paper, TextField } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../../../../../store/context/auth'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
});
const Login: React.FC = (): JSX.Element => {
    const { auth, login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            login(values.email, values.password)
        },
    });
    useEffect(() => {
        if (auth.token !== 'null' && auth.token !== null) {
            enqueueSnackbar("Logged In Successfully", {
                variant: 'success',
            })
            history.push("/console");
        }
        if (auth.error) {
            enqueueSnackbar(auth.error, {
                variant: 'error',
            })
        }
    }, [auth])
    return (
        <Box sx={{ height: "85vh" }}>
            <Paper
                sx={{
                    padding: 5,
                    maxWidth: '500px',
                    marginTop: "10%",
                    marginX: "auto"
                }}>
                <Box
                    sx={{
                        display: "flex", flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <Avatar
                        sx={{ background: "#3C9905" }}
                    >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
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
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={auth.loading}
                        >
                            Sign In
                        </Button>
                        {auth.loading && (
                            <LinearProgress />
                        )}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {/* Forgot password */}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login;