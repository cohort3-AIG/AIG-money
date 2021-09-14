import React, { useContext, useEffect } from 'react'
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material"
import { RegisterContext } from '../../../../../../store/context/register'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
const validationSchema = yup.object({
    code: yup
        .number()
        .required('Verification Code is required'),
});
export default function PhoneConfirm() {
    const { register, phoneConfirmationCode } = useContext(RegisterContext)
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            phoneConfirmationCode(values.code, register.phone)
        },
    });
    useEffect(() => {
        if (register.phone_confirmed) {
            enqueueSnackbar(register.success, {
                variant: 'success',
            })
            history.push("/register/signup");
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
