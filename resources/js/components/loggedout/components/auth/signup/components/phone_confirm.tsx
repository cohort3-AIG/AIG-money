import React, { useContext, useEffect } from 'react'
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material"
import { AuthContext } from '../../../../../../store/context/auth'
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    code: yup
        .number()
        .required('Verification Code is required'),
});
export default function PhoneConfirm() {
    // const { auth, login } = useContext(AuthContext)
    const formik = useFormik({
        initialValues: {
            code: '',
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
                        Confirm Phone Number
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="Code"
                            name="code"
                            type="number"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
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
