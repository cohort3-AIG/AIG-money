import React, { useContext, useEffect } from 'react'
import { RegisterContext } from '../../../../../../store/context/register'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Avatar, Typography, Button, Checkbox, Paper, TextField, FormControlLabel, FormGroup, Autocomplete } from '@mui/material/';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import { countries } from "countries-list"
const validationSchema = yup.object({
    postal_code: yup
        .number()
        .required("Postal Code is Required"),
    state_province_region: yup
        .string()
        .required("State Province Region is required"),
    city_town_village: yup
        .string()
        .required("City Town Village is required"),
    address_line_2: yup
        .string(),
    address_line_1: yup
        .string()
        .required("Address Line 1 is required"),
    nationality: yup
        .string()
        .required("Nationality is required"),
});
export default function WalletCreate() {
    const { register, create_wallet } = useContext(RegisterContext)
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            postal_code: '',
            state_province_region: "",
            city_town_village: "",
            address_line_2: "",
            address_line_1: "",
            nationality: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            create_wallet(values.nationality, values.address_line_1, values.address_line_2, values.city_town_village, values.state_province_region, values.postal_code);
        },
    });
    useEffect(() => {
        if (register.wallet_created) {
            enqueueSnackbar(register.success, {
                variant: 'success',
            })
            history.push("/console");
        }
        if (register.error) {
            enqueueSnackbar(register.error, {
                variant: 'error',
            })
        }
    }, [register])
    const countries_label = Object.values(countries).map(element => { return { label: element.name } })
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
                        <AccountBalanceWalletIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Wallet
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        {/* <Autocomplete
                            disablePortal
                            options={countries_label}
                            sx={{ marginY: 2 }}
                            renderInput={(params) => <TextField {...params}
                                label="Nationality"
                                fullWidth
                                required
                                name="nationality"
                                id="nationality"
                                value={formik.values.nationality}
                                onChange={formik.handleChange}
                                error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                                helperText={formik.touched.nationality && formik.errors.nationality}
                            />}
                        /> */}
                        <TextField
                            label="Nationality"
                            fullWidth
                            required
                            variant="outlined"
                            margin="normal"
                            name="nationality"
                            id="nationality"
                            type="text"
                            value={formik.values.nationality}
                            onChange={formik.handleChange}
                            error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                            helperText={formik.touched.nationality && formik.errors.nationality}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="address_line_1"
                            label="Address Line 1"
                            name="address_line_1"
                            type="text"
                            value={formik.values.address_line_1}
                            onChange={formik.handleChange}
                            error={formik.touched.address_line_1 && Boolean(formik.errors.address_line_1)}
                            helperText={formik.touched.address_line_1 && formik.errors.address_line_1}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="address_line_2"
                            label="Address Line 2"
                            type="text"
                            id="address_line_2"
                            value={formik.values.address_line_2}
                            onChange={formik.handleChange}
                            error={formik.touched.address_line_2 && Boolean(formik.errors.address_line_2)}
                            helperText={formik.touched.address_line_2 && formik.errors.address_line_2}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="city_town_village"
                            label="City / Town / Village"
                            type="text"
                            id="city_town_village"
                            value={formik.values.city_town_village}
                            onChange={formik.handleChange}
                            error={formik.touched.city_town_village && Boolean(formik.errors.city_town_village)}
                            helperText={formik.touched.city_town_village && formik.errors.city_town_village}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="state_province_region"
                            label="State / Province / Region"
                            type="text"
                            id="state_province_region"
                            value={formik.values.state_province_region}
                            onChange={formik.handleChange}
                            error={formik.touched.state_province_region && Boolean(formik.errors.state_province_region)}
                            helperText={formik.touched.state_province_region && formik.errors.state_province_region}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="postal_code"
                            label="Postal Code"
                            type="number"
                            id="postal_code"
                            value={formik.values.postal_code}
                            onChange={formik.handleChange}
                            error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                            helperText={formik.touched.postal_code && formik.errors.postal_code}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="
                                I confirm that I have read, consent and agree to Enviar Dinheiro's User Agreement and Privacy Statement, and I am of legal age."
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                color: "white",
                                marginX: "auto"
                            }}
                        >
                            Create Account
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}