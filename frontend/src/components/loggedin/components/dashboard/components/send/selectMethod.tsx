import { FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper, Box, Avatar, Button, LinearProgress } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import "yup-phone";
import { SendContext } from '../../../../../../store/context/send'
import { useContext, useEffect } from 'react';
import axios from 'axios'
import useSwr from 'swr'
import { HOST_URL } from "../../../../../../config/settings"
const validationSchema = yup.object({
    amount: yup
        .number()
        .required('Amount is required'),
    type: yup
        .string()
        .min(2, "Name must be greater than 2")
        .required('Type is required'),
    mobile: yup
        .string()
        .when("type", {
            is: "mobile",
            then: yup.string().phone()
        }),
    beneficiary: yup
        .string()
        .when("type", {
            is: "beneficiary",
            then: yup.string()
        }),
});
const token = localStorage.getItem('token')
const config = {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
};
const fetcher = (url: string) => axios.get(url, config).then(res => res.data)
export default function SelectMethod() {
    const { data } = useSwr(`${HOST_URL}beneficiaries/list`, fetcher)
    const { send, sendWallet } = useContext(SendContext)
    const formik = useFormik({
        initialValues: {
            amount: "",
            type: "",
            mobile: "",
            beneficiary: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.type === "beneficiary") {
                sendWallet(values.beneficiary, values.amount)
            }
        },
    });
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()
    useEffect(() => {
        if (send.success) {
            enqueueSnackbar(send.success, {
                variant: 'success',
            })
            history.push("/console");
        }
        if (send.error) {
            try {
                var errors: any = Object.values(JSON.parse(send.error))
                for (var i = 0; i < errors.length; i++) {
                    enqueueSnackbar(errors[i][0], {
                        variant: 'error',
                    })
                }
            } catch (error) {
                enqueueSnackbar(send.error, {
                    variant: 'error',
                })
            }
        }
    }, [send])
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
                            placeholder="In US $..."
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
                                    {data && data.beneficiaries.map((beneficiary: any) => {
                                        return (
                                            <MenuItem key={beneficiary.id} value={beneficiary.phone_number}>{beneficiary.first_name + " " + beneficiary.last_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        )}
                        {formik.values.type === "mobile" && (
                            <TextField
                                variant="outlined"
                                margin="normal"
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
                            disabled={send.loading}
                        >
                            Send
                        </Button>
                        {send.loading && (
                            <LinearProgress />
                        )}
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
