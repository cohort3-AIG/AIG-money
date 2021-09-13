import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Review from './Review';
import { UserPayment } from './user_detail';
import axios from 'axios'
import { PAYMENT_URL } from '../../../../config/settings'

const user = new UserPayment;
const steps = ['Billing address', 'Payment details', 'Confirm'];


const initialFormValues = {
  
  firstname:user.firstname,
  lastname:user.lastname,
  address1:user.address1,
  address2:user.address2,
  city: user.city,
  state:user.state,
  country:user.country,
  code:user.code,
  allow:user.allow,
  cvv:user.cvv,
  cardnumber:user.cardno,
  date:"",
  cardname:user.firstname + " " + user.lastname,
  amount:user.amount
};
const theme = createTheme();

const deposit = ()=>{
  axios.post(`${PAYMENT_URL}`, {
    number :'4111111111111111',
    expiration_month:12,
    expiration_year :2021,
    total_amount:10.0,
    currency :"USD",
    first_name:"lwangaaksam",
    last_name:"aksam",
    address1 :"Jinja",
    locality:"Jinja",
    administrative_area: "kampala",
    postal_code :2121,
    country:"Uganda",
    email:"lwangaaksam@gmail.com" ,
    phone_number:"755677766",
    security_code:"231"
  }).then(res => {
    if(res.data.success===true)
    console.log(res);
    else{
      console.log(res.data);
    }

  }).catch(err => {
    console.log(err)
  })
}

export default function Wallet_Details() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState(initialFormValues);
  

  const onChangeHandler = (e:any)=> {
    const { name, value } = e.target;
    console.log(value);
    setValues({
      ...values,
      [name]: value
    });
    console.log(values);
  }
 
  function makepayment(){
    deposit()
    return(
      <>
    <Typography variant="h5" gutterBottom>
               Payment Notification
             </Typography>
             <Typography variant="subtitle1">
               Your wallet has been updated successfuly
             </Typography>
            </>
          
    )
  }
  
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Billing address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  label="First name"
                  value={values.firstname}
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  value={values.lastname}
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  value={values.address1}
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  value={values.address2}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  value={values.city}
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  value={values.state}
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="code"
                  name="code"
                  label="Zip / Postal code"
                  fullWidth
                  value={values.code}
                  autoComplete="shipping postal-code"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  value={values.country}
                  autoComplete="shipping country"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value={user.allow} />}
                  label="Use this address for next payment deposit"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
  
      case 1:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardname"
                  name="cardname"
                  label="Name on card"
                   value={values.cardname}
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardnumber"
                  name="cardnumber"
                  label="Card number"
                  fullWidth
                  value={values.cardnumber}
                  autoComplete="cc-number"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="date"
                  label="Expiry date"
                  name="date"
                  fullWidth
                  value={values.date}
                  autoComplete="cc-exp"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  value={values.cvv}
                  autoComplete="cc-csc"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="amount"
                  name="amount"
                  label="amount"
                  fullWidth
                  value={values.amount}
                  autoComplete="cc-csc"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 10 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Make a new Deposit
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? 
             <React.Fragment>
             {makepayment()}
           </React.Fragment>
            : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    // disabled={!false}
                  >
                    {activeStep === steps.length - 1 ? 'Make a deposit' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>

      </Container>
    </ThemeProvider>
  );
}