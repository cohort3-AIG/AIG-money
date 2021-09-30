
import { useContext, useEffect } from 'react'
import { LinearProgress, Avatar, Typography, Button, Box, Paper, TextField } from '@mui/material'
import { BeneficiaryContext } from "../../../../../../store/context/beneficiary"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add'
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useSWRConfig } from "swr"
import { HOST_URL } from '../../../../../../config/settings'
import "yup-phone";
import { useParams } from "react-router"
const validationSchema = yup.object({
    phone: yup
        .string()
        .phone()
        .required('Phone is required'),
    first_name: yup
        .string()
        .min(2, "Name must be greater than 2")
        .required('Phone is required'),
    last_name: yup
        .string()
        .min(2, "Name must be greater than 2")
        .required('Phone is required'),
});
export default function Beneficiary() {
    const { beneficiary, update } = useContext(BeneficiaryContext)
    const { enqueueSnackbar } = useSnackbar();
    const { mutate } = useSWRConfig()
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const formik = useFormik({
        initialValues: {
            phone: "",
            first_name: "",
            last_name: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            update(parseInt(id), values.phone, values.first_name, values.last_name)
        },
    });
    useEffect(() => {
        if (beneficiary.success) {
            enqueueSnackbar(beneficiary.success, {
                variant: 'success',
            })
            history.push("console")
            mutate(`${HOST_URL}beneficiaries/list`)
        }
        if (beneficiary.error) {
            try {
                var errors: any = Object.values(JSON.parse(beneficiary.error))
                for (var i = 0; i < errors.length; i++) {
                    enqueueSnackbar(errors[i][0], {
                        variant: 'error',
                    })
                }
            } catch (error) {
                enqueueSnackbar(beneficiary.error, {
                    variant: 'error',
                })
            }
        }
    }, [beneficiary])
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
                            endIcon={<AddIcon />}
                            disabled={beneficiary.loading}
                        >
                            Update
                        </Button>
                        {beneficiary.loading && (
                            <LinearProgress />
                        )}
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
