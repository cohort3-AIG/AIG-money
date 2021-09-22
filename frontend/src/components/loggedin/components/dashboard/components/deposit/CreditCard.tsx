import "./style.css"
import { Box, Typography, Checkbox, FormControlLabel, Autocomplete, TextField, LinearProgress, Button } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
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
export default function CreditCard() {
    // const { register, create_wallet } = useContext(RegisterContext)
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
            // create_wallet(inputValue, values.address_line_1, values.address_line_2, values.city_town_village, values.state_province_region, values.postal_code);
        },
    });
    return (
        <Box>
            <form>
                <Box className="body">
                    <Box className="card">

                        <h1 className="card__title">Enter Payment Information</h1>
                        <Box className="card__row">
                            <Box className="card__col">
                                <label htmlFor="cardNumber" className="card__label">Card Number</label
                                ><input
                                    type="text"
                                    className="card__input card__input--large"
                                    id="cardNumber"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                />
                            </Box>
                            <Box className="card__col card__chip">
                                <img src="/images/chip.svg" alt="chip" />
                            </Box>
                        </Box>
                        <Box className="card__row">
                            <Box className="card__col">
                                <label htmlFor="cardExpiry" className="card__label">Expiry Date</label
                                ><input
                                    type="text"
                                    className="card__input"
                                    id="cardExpiry"
                                    placeholder="xx/xx"
                                />
                            </Box>
                            <Box className="card__col">
                                <label htmlFor="cardCcv" className="card__label">CCV</label
                                ><input
                                    type="text"
                                    className="card__input"
                                    id="cardCcv"
                                    placeholder="xxx"
                                />
                            </Box>
                            <Box className="card__col card__brand"><i id="cardBrand"></i></Box>
                        </Box>

                    </Box>
                </Box>
                <FormControlLabel control={<Checkbox defaultChecked />} label=" Use Default Address Information" />
                <Autocomplete
                    id="nationality"
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    // value={value}
                    onChange={(event: any, newValue: any) => {
                        // setValue(newValue);
                    }}
                    // inputValue={inputValue}
                    onInputChange={(event: any, newInputValue: any) => {
                        // setInputValue(newInputValue);
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
                    type="text"
                    id="postal_code"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                    error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                    helperText={formik.touched.postal_code && formik.errors.postal_code}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        color: "white",
                        marginX: "auto"
                    }}
                    // disabled={register.loading}
                >
                    Next
                </Button>
                {/* {register.loading && (
                    <LinearProgress />
                )} */}
            </form>
        </Box>
    )
}
