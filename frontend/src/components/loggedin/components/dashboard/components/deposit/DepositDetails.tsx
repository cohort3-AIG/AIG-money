import React, { useContext, useEffect } from 'react'
import { Box, Typography, Checkbox, FormControlLabel, Autocomplete, TextField, LinearProgress, Button, Paper } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import { countries } from "../../../../../shared/countries/countries"
import { DepositContext } from '../../../../../../store/context/deposit';
import axios from 'axios'
import useSwr from 'swr'
import { HOST_URL } from "../../../../../../config/settings"
const validationSchema = yup.object({
    postal_code: yup
        .string()
        .when('default', {
            is: false,
            then: yup.string().required("Postal Code Is Required")
        }),
    state_province_region: yup
        .string().when('default', {
            is: false,
            then: yup.string().required("State Pronvice Is Required")
        }),
    city_town_village: yup
        .string()
        .when('default', {
            is: false,
            then: yup.string().required("City/Town?Village Is Required")
        }),
    address_line_2: yup
        .string(),
    address_line_1: yup
        .string()
        .when('default', {
            is: false,
            then: yup.string().required("Address Line 1 Is Required")
        }),
    default: yup
        .bool()
        .required("To create account you must agree to terms and conditions"),
    first_name: yup
        .string()
        .when('default', {
            is: false,
            then: yup.string().required("First Name Is Required")
        }),
    last_name: yup
        .string()
        .when('default', {
            is: false,
            then: yup.string().required("Last Name Is Required")
        }),
    amount: yup.number().required("Amount is required")
});
const token = localStorage.getItem('token')
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const fetcher = (url: string) => axios.get(url, config).then(res => res.data)

export default function DepositDetails() {
    const { data, error } = useSwr(`${HOST_URL}wallet_get`, fetcher)
    const { deposit, makeDeposit } = useContext(DepositContext)
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            postal_code: '',
            state_province_region: "",
            city_town_village: "",
            address_line_2: "",
            address_line_1: "",
            default: false,
            first_name: "",
            last_name: "",
            amount: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            makeDeposit(
                parseInt(deposit.cardNo.replaceAll("-", "")),
                parseInt(deposit.expiry.split("/")[0]),
                2000 + parseInt(deposit.expiry.split("/")[1]),
                values.amount,
                deposit.ccv,
                values.first_name,
                values.last_name,
                values.address_line_2,
                values.address_line_1,
                values.postal_code,
                values.city_town_village,
                values.state_province_region,
                inputValue,
                localStorage.getItem('email')
            )
        },
    });
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState();

    useEffect(() => {
        if (deposit.success !== null && deposit.success !== "null") {
            enqueueSnackbar(deposit.success, {
                variant: 'success',
            })
            if (deposit.success !== "Card entered successfully") history.go(0)
        }
        if (deposit.error) {
            try {
                var errors: any = Object.values(JSON.parse(deposit.error))
                for (var i = 0; i < errors.length; i++) {
                    enqueueSnackbar(errors[i][0], {
                        variant: 'error',
                    })
                }
            } catch (error) {
                enqueueSnackbar(deposit.error, {
                    variant: 'error',
                })
            }
        }
    }, [deposit])
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
                        <FormControlLabel hidden control={<Checkbox disabled color="primary"
                            id="default"
                            name="default"
                            value={formik.values.default}
                            onChange={formik.handleChange} />} label=" Use Default Address Information" />

                        {!formik.values.default && (
                            <>
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
                                <Autocomplete
                                    id="nationality"
                                    options={countries}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    value={value}
                                    onChange={(event: any, newValue: any) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event: any, newInputValue: any) => {
                                        setInputValue(newInputValue);
                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                alt=""
                                            />
                                            {option.label}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Nationality"
                                            fullWidth
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            name="nationality"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
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
                                    label="Locality"
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
                                    label="Administrative Area"
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
                                    type="text"
                                    id="postal_code"
                                    value={formik.values.postal_code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                                    helperText={formik.touched.postal_code && formik.errors.postal_code}
                                />
                            </>)}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                color: "white",
                                marginX: "auto",
                                marginTop: 10
                            }}
                            disabled={deposit.loading}
                        >
                            Next
                        </Button>
                        {deposit.loading && (
                            <LinearProgress />
                        )}
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
