import "./style.css"
import { MutableRefObject, useContext, useRef } from 'react'
import { Box, Typography, Checkbox, FormControlLabel, Autocomplete, TextField, LinearProgress, Button } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import { countries } from "../../../../../shared/countries/countries"
import Cleave from 'cleave.js/react';
import { DepositContext } from "../../../../../../store/context/deposit"
const validationSchema = yup.object({
    cardNo: yup
        .string()
        .required("Card Number is Required"),
    expiry: yup
        .string()
        .required("Expiry is required"),
    ccv: yup
        .string()
        .required("Securty Code is required"),
});
export default function CreditCard() {
    // const { register, create_wallet } = useContext(RegisterContext)
    const { deposit, insertCard } = useContext(DepositContext)
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()
    const cardTypeRef = useRef() as MutableRefObject<HTMLDivElement>
    const formik = useFormik({
        initialValues: {
            cardNo: "",
            expiry: "",
            ccv: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            insertCard(values.cardNo, values.expiry, values.ccv)
        },
    });
    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Box className="body">
                    <Box className="card">

                        <h1 className="card__title">Enter Payment Information</h1>
                        <Box className="card__row">
                            <Box className="card__col">
                                <label htmlFor="cardNumber" className="card__label">Card Number</label
                                ><Cleave
                                    options={{
                                        creditCard: true,
                                        delimiter: "-",
                                        onCreditCardTypeChanged: (type) => {
                                            const visa = "fab fa-cc-visa"
                                            const mastercard = "fab fa-cc-mastercard"
                                            const amex = "fab fa-cc-amex"
                                            const diners = "fab fa-cc-diners-club"
                                            const jcb = "fab fa-cc-jcb"
                                            const discover = "fab fa-cc-discover"

                                            switch (type) {
                                                case "visa":
                                                    cardTypeRef.current.setAttribute("class", visa);
                                                    break;
                                                case "mastercard":
                                                    cardTypeRef.current.setAttribute("class", mastercard);
                                                    break;
                                                case "amex":
                                                    cardTypeRef.current.setAttribute("class", amex);
                                                    break;
                                                case "diners":
                                                    cardTypeRef.current.setAttribute("class", diners)!;
                                                    break;
                                                case "jcb":
                                                    cardTypeRef.current.setAttribute("class", jcb);
                                                    break;
                                                case "discover":
                                                    cardTypeRef.current.setAttribute("class", discover);
                                                    break;
                                                default:
                                                    cardTypeRef.current.setAttribute("class", "");
                                                    break;
                                            }
                                        }
                                    }}
                                    type="text"
                                    className="card__input card__input--large"
                                    id="cardNo"
                                    name="cardNo"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                    value={formik.values.cardNo}
                                    onChange={formik.handleChange}
                                // error={formik.touched.cardNo && Boolean(formik.errors.cardNo)}
                                // helperText={formik.touched.cardNo && formik.errors.cardNo}
                                />
                            </Box>
                            <Box className="card__col card__chip">
                                <img src="/images/chip.svg" alt="chip" />
                            </Box>
                        </Box>
                        <Box className="card__row">
                            <Box className="card__col">
                                <label htmlFor="cardExpiry" className="card__label">Expiry Date</label
                                ><Cleave
                                    options={{
                                        date: true,
                                        datePattern: ["m", "y"],
                                    }}
                                    type="text"
                                    className="card__input"
                                    id="cardExpiry"
                                    name="expiry"
                                    placeholder="mm/yy"
                                    value={formik.values.expiry}
                                    onChange={formik.handleChange}
                                // error={formik.touched.expiry && Boolean(formik.errors.expiry)}
                                // helperText={formik.touched.expiry && formik.errors.expiry}
                                />
                            </Box>
                            <Box className="card__col">
                                <label htmlFor="cardCcv" className="card__label">CCV</label
                                ><Cleave
                                    options={{
                                        blocks: [3],
                                        numericOnly: true
                                    }}
                                    type="text"
                                    className="card__input"
                                    id="ccv"
                                    name="ccv"
                                    placeholder="xxx"
                                    value={formik.values.ccv}
                                    onChange={formik.handleChange}
                                // error={formik.touched.ccv && Boolean(formik.errors.ccv)}
                                // helperText={formik.touched.ccv && formik.errors.ccv}
                                />
                            </Box>
                            <Box className="card__col card__brand"><i ref={cardTypeRef} id="cardBrand"></i></Box>
                        </Box>

                    </Box>
                </Box>

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
    )
}
