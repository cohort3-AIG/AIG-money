import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Wallet_Details } from "..";


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
  const [age, setAge] = React.useState('');
  const [formstatus, setFormStatus] = React.useState(false);

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
                $ 100,000
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
              <Wallet_Details />
            </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
}
