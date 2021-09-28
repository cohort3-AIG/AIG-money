import React, { useContext, useEffect } from 'react'
import { RegisterContext } from '../../../../../../store/context/register'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Avatar, Typography, Button, Checkbox, Paper, TextField, FormControlLabel, FormGroup, Autocomplete, LinearProgress } from '@mui/material/';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import { countries } from "../../../../../shared/countries/countries"
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
    terms: yup
        .bool()
        .oneOf([true], 'Field must be checked')
        .required("To create account you must agree to terms and conditions")
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
            terms: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            create_wallet(inputValue, values.address_line_1, values.address_line_2, values.city_town_village, values.state_province_region, values.postal_code);
        },
    });
    useEffect(() => {
        if (register.wallet_created) {
            enqueueSnackbar(register.success, {
                variant: 'success',
            })
            window.location.reload()
            history.push("/console");
        }
        if (register.error) {
            try {
                var errors: any = Object.values(JSON.parse(register.error))
                for (var i = 0; i < errors.length; i++) {
                    enqueueSnackbar(errors[i][0], {
                        variant: 'error',
                    })
                }
            } catch (error) {
                enqueueSnackbar(register.error, {
                    variant: 'error',
                })
            }
        }
    }, [register])
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState();
    React.useEffect(() => {
        console.log("value", value);
    }, [value]);
    React.useEffect(() => {
        console.log("inputValue", inputValue);
    }, [inputValue]);
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
                                control={<Checkbox
                                    color="primary"
                                    id="terms"
                                    name="terms"
                                    value={formik.values.terms}
                                    onChange={formik.handleChange}
                                />}
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
                            disabled={register.loading}
                        >
                            Create Account
                        </Button>
                        {register.loading && (
                            <LinearProgress />
                        )}
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}