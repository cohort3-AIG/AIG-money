
import React, { useContext, useEffect } from 'react'
import { Grid, LinearProgress, Avatar, Typography, Button, Box, Link, Paper, TextField } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { RegisterContext } from '../../../../../../store/context/register'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
const validationSchema = yup.object({
    phone: yup
        .string()
        .min(10, 'Phone should be valid')
        .required('Phone is required'),

});
const Login: React.FC = (): JSX.Element => {
    const { register, phoneValidate } = useContext(RegisterContext)
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            phone: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            phoneValidate(values.phone)
        },
    });
    useEffect(() => {
        if (register.phone) {
            enqueueSnackbar(register.success, {
                variant: 'success',
            })
            history.push("/register/phone_confirm");
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
                    <Typography variant="h5">
                        Sign up for Enviar Dinheiro
                    </Typography>
                    <Typography>
                        First, add your mobile number
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            type="text"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <Typography>
                            By continuing, you confirm that you’re the owner or primary user of this mobile phone number. You agree to receive automated texts to confirm your phone number. Message and data rates may apply.
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        // className={classes.submit}
                        >
                            Next
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login;

