import React, { useContext, useEffect } from 'react'
import { RegisterContext } from '../../../../../../store/context/register'
import { useFormik } from 'formik';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as yup from 'yup';
import { Box, Avatar, Typography, Button, Link, Paper, TextField } from '@mui/material/';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    first_name: yup.string().required("Last Name Is Required"),
    last_name: yup.string().required("Last Name Is Required"),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirm_password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});
export default function Signup() {
    const { register, signup } = useContext(RegisterContext)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: "",
            last_name: "",
            first_name: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signup(values.email, values.first_name, values.last_name, values.password, values.confirm_password, register.phone_number)
        },
    });
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    useEffect(() => {
        if (register.token) {
            enqueueSnackbar(register.success, {
                variant: 'success',
            })
            history.push("/register/wallet_create");
        }
        if (register.error) {
            enqueueSnackbar(register.error, {
                variant: 'error',
            })
        }
    }, [register])
    return (
        <Box>
            <Paper
                sx={{
                    padding: 5,
                    maxWidth: '500px',
                    marginX: "auto"
                }}>
                <Box
                    // className={classes.paper}
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
                        Sign Up
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
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            type="text"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            type="text"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                            helperText={formik.touched.last_name && formik.errors.last_name}
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            id="confirm_password"
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                color: "white",
                                marginX: "auto"
                            }}
                        >
                            Next
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
