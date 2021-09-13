import React, { useContext, useEffect } from 'react'
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material"
import { AuthContext } from '../../../../../../store/context/auth'
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid phone number')
        .required('Phone number is required'),
});
export default function Phone() {
    // const { auth, login } = useContext(AuthContext)
    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // login(values.email, values.password)
            console.log("value")
        },
    });
    return (
        <Box>
            <Paper
                sx={{
                    padding: 5,
                    maxWidth: '500px',
                    marginX: "auto"
                }}>
                <Box
                    sx={{
                        display: "flex", flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
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
                        >
                            Next
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
