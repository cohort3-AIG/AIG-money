import React, { MouseEvent } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Wallet_Details } from "..";
import axios from 'axios'
import { HOST_URL } from '../../../../config/settings'


let token = localStorage.getItem("token");
let wallet_data = `${HOST_URL}wallet_get`;
// let transaction_history =`${HOST_URL}/wallet`;
// let amount_spent =`${HOST_URL}/wallet`

const initialFormValues = {

  first_name:"",
  last_name: "",
  address_line_1: "",
  address_line_2: "",
  balance: 0,
  state_pronvince_region: "",
  city_town_village: "",
  postal_code:"",
  allow: 0,
};
const useStyles = makeStyles((theme: any) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));
function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function Wallet() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [wallet_detail, setWallet] = React.useState(initialFormValues);
  const [age, setAge] = React.useState('');
  const [formstatus, setFormStatus] = React.useState(false);



  const requestOne = axios.get(wallet_data, { headers: { 'Authorization': `Bearer ${token}` }});
  // const requestTwo = axios.get(transaction_history,{ headers: { 'Authorization': `Bearer ${token}` }});
  // const requestThree = axios.get(amount_spent,{ headers: { 'Authorization': `Bearer ${token}` }});



  React.useEffect(() => {

    axios
      .all([requestOne])
      .then(
        axios.spread((...responses) => {
          
          if (responses[0].data.success === true){
            
              setWallet(responses[0].data.data[0])
              console.log(wallet_detail)
          }
          // const responseTwo = responses[1];
          // const responesThree = responses[2];

          // use/access the results
          // console.log(responseOne, responseTwo, responesThree);
        })
      )
      .catch(errors => {
        // react on errors.
        console.error(errors);
      });
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  
  return (
    <Container component="main">
      <Typography variant="h4" gutterBottom mb={2}>
        Wallet
      </Typography>
      <Grid container spacing={3} >
        <Grid item xs={4} >
          <Grid item mb={5}>
            <Paper className={classes.paper} elevation={3}>
              <Typography
                variant="h3"
                gutterBottom
                display="block"
                color="secondary"
                sx={{ fontWeight: 'bold' }}
              >
                $ {wallet_detail.balance}000000
              </Typography>

              <Stack direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
                mb={6}
                mt={3} >
                <Button variant="contained" color="primary" sx={{ fontSize: 20 }}
                  onClick={() => { setFormStatus(true) }}
                >
                  ADD MONEY
                </Button>

                <Button variant="contained" color="primary" sx={{ fontSize: 20 }}>
                  CASHOUT
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item >
            <Paper className={classes.paper} elevation={3}>
              <Stack direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
                mb="10px"
              >
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{ fontWeight: 'bold' }}
                >
                  Totals
                </Typography>
                <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    variant="standard"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      <em>This month</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {[{ name: "Spent", amount: "901" }, { name: "Recevied", amount: "901" }].map((key, value) => (

                <Stack direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={3}
                  key={value}
                >
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {key.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{ fontWeight: 'bold' }}
                  >
                    ${key.amount}
                  </Typography>
                </Stack>

              ))}

            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          {!formstatus ?
            <Paper className={classes.paper} elevation={3}> <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                    secondary='Secondary text'
                  />
                </ListItem>,
              )}
            </List></Paper>
            :
            <Paper className={classes.paper} elevation={3}>
              <Wallet_Details user_detail={wallet_detail} />
            </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
}
