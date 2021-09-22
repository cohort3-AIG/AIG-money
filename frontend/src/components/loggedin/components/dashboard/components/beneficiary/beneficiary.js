
import React, { useContext, useEffect } from 'react'
import { LinearProgress, Avatar, Typography, Button, Box, Paper, TextField } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { RegisterContext } from '../../../../../../store/context/register'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add'
import ReceiptIcon from '@mui/icons-material/Receipt';
import "yup-phone";
const validationSchema = yup.object({
    phone: yup
        .string()
        .phone()
        .required('Phone is required'),
    name: yup
        .string()
        .min(2, "Name must be greater than 2")
        .required('Phone is required'),

});
export default function Beneficiary() {
    // const { register, phoneValidate } = useContext(RegisterContext)
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            phone: "",
            name: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // phoneValidate(values.phone)
            console.log(values)
        },
    });
    // useEffect(() => {
    //     if (register.phone) {
    //         enqueueSnackbar(register.success, {
    //             variant: 'success',
    //         })
    //         history.push("/register/phone_confirm");
    //     }
    //     if (register.error) {
    //         try {
    //             var errors: any = Object.values(JSON.parse(register.error))
    //             for (var i = 0; i < errors.length; i++) {
    //                 enqueueSnackbar(errors[i][0], {
    //                     variant: 'error',
    //                 })
    //             }
    //         } catch (error) {
    //             enqueueSnackbar(register.error, {
    //                 variant: 'error',
    //             })
    //         }
    //     }
    // }, [register])
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
                    <Avatar
                        sx={{ background: "#3C9905" }}
                    >
                        <ReceiptIcon />
                    </Avatar>
                    <Typography variant="h5">
                        Add Beneficiary
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            placeholder="eg... +18884521505"
                            type="text"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            endIcon={<AddIcon/>}
                        // disabled={register.loading}
                        >
                            Create
                        </Button>
                        {/* {register.loading && (
                            <LinearProgress />
                        )} */}
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
