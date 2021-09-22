import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';



// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


export default function Review(props: any) {
  const user = props.summary;
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: user.last_name+" "+user.first_name },
    { name: 'Card number', detail: user.cardnumber },
    { name: 'Expiry date', detail: (user.date.getMonth() + 1) + "/" + user.date.getFullYear() },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment summary
      </Typography>
      <Grid container spacing={3} wrap="nowrap" >
      <Grid item xs >
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }} >
               A total of   ${user.amount} will be credited on your account 
                with a charge of guide${user.amount * 0.05}
             </Typography>
          </ListItem>
        </List>
        </Grid>
      </Grid>
    
        
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Billing
          </Typography>
          <Grid item xs={12} sm={6} >
          <Typography gutterBottom>{user.last_name+" "+user.first_name}</Typography>
        <Typography gutterBottom>{user.address_line_1 + " , " + user.address_line_2}</Typography>
        </Grid>
    
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid container  wrap="nowrap" direction="row" spacing={3}>
                <Grid item>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
                </Grid>
              </React.Fragment>
            ))}
          
      
    </React.Fragment>
  );
}