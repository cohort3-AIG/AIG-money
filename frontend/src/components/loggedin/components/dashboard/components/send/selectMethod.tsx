import { FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper, Box, Avatar, Button } from '@mui/material'
import React from 'react'
import { SelectChangeEvent } from '@mui/material/Select';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import "yup-phone";
const validationSchema = yup.object({
    amount: yup
        .number()
        .required('Amount is required'),
    type: yup
        .string()
        .min(2, "Name must be greater than 2")
        .required('Type is required'),
    walletid: yup
        .string()
        .when("type", {
            is: "wallet",
            then: yup.string().required("Must enter wallet Id")
        }),
    mobile: yup
        .string()
        .phone()
        .when("type", {
            is: "mobile",
            then: yup.string().required("Must enter mobile number")
        }),
    beneficiary: yup
        .string()
        .when("type", {
            is: "beneficiary",
            then: yup.string().required("Must select beneficiary")
        }),
});
export default function SelectMethod() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const formik = useFormik({
        initialValues: {
            amount: "",
            type: "",
            walletid: "",
            mobile: "",
            beneficiary: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // phoneValidate(values.phone)
            console.log(values)
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
                    <Avatar
                        sx={{ background: "#3C9905" }}
                    >
                        <CreditCardIcon />
                    </Avatar>
                    <Typography variant="h5">
                        Send Money
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="amount"
                            label="Amount"
                            name="amount"
                            type="text"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />
                        <FormControl
                            fullWidth
                            margin="normal"
                        >
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                name="type"
                                label="Type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                error={formik.touched.type && Boolean(formik.errors.type)}
                            >
                                <MenuItem value="beneficiary">Beneficiary</MenuItem>
                                <MenuItem value="wallet">Wallet</MenuItem>
                                <MenuItem value="mobile">Mobile Number</MenuItem>
                            </Select>
                        </FormControl>
                        {formik.values.type === "beneficiary" && (
                            <FormControl
                                fullWidth
                                margin="normal"
                            >
                                <InputLabel id="beneficiary-label">Select Beneficiary</InputLabel>
                                <Select
                                    labelId="beneficiary-label"
                                    id="beneficiary"
                                    name="beneficiary"
                                    label="Beneficiary"
                                    value={formik.values.beneficiary}
                                    onChange={formik.handleChange}
                                    error={formik.touched.beneficiary && Boolean(formik.errors.beneficiary)}
                                >
                                    <MenuItem value={10}>Gerald</MenuItem>
                                    <MenuItem value={20}>Michael</MenuItem>
                                    <MenuItem value={30}>Komuhangi</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        {formik.values.type === "wallet" && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="walletid"
                                label="Wallet ID"
                                name="walletid"
                                type="text"
                                value={formik.values.walletid}
                                onChange={formik.handleChange}
                                error={formik.touched.walletid && Boolean(formik.errors.walletid)}
                                helperText={formik.touched.walletid && formik.errors.walletid}
                            />
                        )}
                        {formik.values.type === "mobile" && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="mobile"
                                label="Mobile No"
                                placeholder="eg... +18884521505"
                                name="mobile"
                                type="text"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        // endIcon={<AddIcon/>}
                        // disabled={register.loading}
                        >
                            Send
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
