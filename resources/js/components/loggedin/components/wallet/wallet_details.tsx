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
import axios from 'axios'
import { PAYMENT_URL } from '../../../../config/settings'
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const steps = ['Billing address', 'Payment details', 'Confirm'];


const theme = createTheme();

export default function Wallet_Details(props: any) {
  const user = props.user_detail;
  user.cardname = user.last_name+" "+user.first_name;
  user.cardnumber = "";
  user.amount = 0;
  user.date = new Date();
  user.cvv = "";
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState(user);
  const [isloading, setIsLoading] = React.useState(false);
  const [isempty, setIsEmpty] = React.useState(false);
  const [errors, setErrors] = React.useState({} as any);


  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
    
    console.log(values.name);
  }
  let token = localStorage.getItem("token");

  function makepayment() {
    setIsLoading(true)
    axios.post(`${PAYMENT_URL}`, {
      number:values.cardnumber,
      expiration_month: (values.date.getMonth() + 1) < 10 ? "0" + (values.date.getMonth() + 1) : (values.date.getMonth() + 1),
      expiration_year: values.date.getFullYear(),
      total_amount:parseFloat(values.amount),
      // currency: "USD",
      first_name: values.first_name,
      last_name: values.last_name,
      address1: values.address_line_1,
      address2: values.address_line_2,
      // locality: "Jinja",
      // administrative_area: "kampala",
      postal_code: values.postal_code.toString(),
      // country: values.nationality
      country:"Uganda",
      email: "lwangaaksam@gmail.com",
      phone_number: "0755677766",
      security_code: values.cvv,
    }, { headers: { 'Authorization': `Bearer ${token}` } }
    ).then(res => {
      if (res.data.success === true) {
        console.log(res);
        setActiveStep(activeStep + 1);
        setIsLoading(false);
        location.reload();

      }
      else {
        console.log(res.data);
        // setActiveStep(activeStep + 1);
        console.log(user)
        setIsLoading(false);
      }

    }).catch(err => {
      console.log(err)
    })
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom noWrap>
              Billing address
            </Typography>
            <Grid container spacing={3} >
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstname"
                  name="first_name"
                  label="First name"
                  value={values.first_name}
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
                  name="last_name"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  value={values.last_name}
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="address1"
                  name="address_line_1"
                  label="Address line 1"
                  fullWidth
                  value={values.address_line_1}
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address2"
                  name="address_line_2"
                  label="Address line 2"
                  value={values.address_line_2}
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
                  name="city_town_village"
                  label="City"
                  value={values.city_town_village}
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state_pronvince_region"
                  label="State/Province/Region"
                  fullWidth
                  value={values.state_pronvince_region}
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="code"
                  name="postal_code"
                  label="Zip / Postal code"
                  fullWidth
                  value={values.postal_code}
                  autoComplete="shipping postal-code"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="nationality"
                  label="Country"
                  fullWidth
                  value={values.nationality}
                  autoComplete="shipping country"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={1} md={3} zeroMinWidth>
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
            <Typography variant="h6" gutterBottom noWrap>
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
                  inputProps={{ maxLength: 16 }}
                  type="number"
                  fullWidth
                  value={values.cardnumber}
                  autoComplete="cc-number"
                  variant="standard"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <TextField
                  
                  value={values.date}
                  onChange={onChangeHandler}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Expiry date"
                    value={values.date}
                    onChange={(newValue:any) => {
                      setValues({
                        ...values,
                        date:newValue
                      })
                    }}
                    minDate={new Date()}
                    views={["month", "year"]}
                    renderInput={(params:any) => <TextField {...params} helperText={null} variant="standard"/>}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  type="number"
                  inputProps={{ maxLength: 3}}
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
                  type="number"
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
        return <Review summary={values} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {

      return makepayment()
    }
    if (Object.keys(values).length === 0) {
      return setIsEmpty(true);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
      ...(ownerState.active && {
        color: '#3C9905',
      }),
      '& .QontoStepIcon-completedIcon': {
        color: '#3C9905',
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
    }),
  );
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }


  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 10 }} >
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" noWrap>
            Make a new Deposit
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel StepIconComponent={QontoStepIcon} >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ?
              <React.Fragment>
                <Typography variant="h5" gutterBottom noWrap>
                  Payment Notification
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  Your wallet has been updated successfuly
                </Typography>
                
              </React.Fragment>
              : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} color="primary" disabled={isloading || isempty }  >
                        Back
                      </Button>
                    )}
                    {isloading ? <CircularProgress color="success" /> :
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      // disabled={!false}
                      >
                        {activeStep === steps.length - 1 ? 'Make a deposit' : 'Next'}
                      </Button>
                    }
                  </Box>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>

      </Container>
    </>
  );
}