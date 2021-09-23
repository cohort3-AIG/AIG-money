import React, { useContext } from 'react'
import { Grid, Paper, Modal, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Fab, IconButton } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import SelectMethod from './components/send/selectMethod';
import CreditCard from './components/deposit/CreditCard';
import AddIcon from '@mui/icons-material/Add';
import Beneficiary from './components/beneficiary/beneficiary'
import { DepositContext } from '../../../../store/context/deposit'
import DepositDetails from './components/deposit/DepositDetails';
import axios from 'axios'
import useSwr from 'swr'
import { HOST_URL } from "../../../../config/settings"
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const token = localStorage.getItem('token')
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const fetcher = (url: string) => axios.get(url, config).then(res => res.data)

export default function Dashboard() {
    const { data, error } = useSwr(`${HOST_URL}wallet/me/balance`, fetcher)
    const { deposit } = useContext(DepositContext)
    const [openDeposit, setOpenDeposit] = React.useState(false);
    const handleDepositOpen = () => setOpenDeposit(true);
    const handleDepositClose = () => setOpenDeposit(false);
    const [openSend, setSendOpen] = React.useState(false);
    const handleSendOpen = () => setSendOpen(true);
    const handleSendClose = () => setSendOpen(false);
    const [openBeneficiary, setBeneficiaryOpen] = React.useState(false);
    const handleBeneficiaryOpen = () => setBeneficiaryOpen(true);
    const handleBeneficiaryClose = () => setBeneficiaryOpen(false);
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} >
                    <Card sx={{ height: "40vh" }}>
                        <CardMedia
                            component="img"
                            alt="profile picture"
                            height="240"
                            image="/images/default.png"
                        />
                        <CardContent>
                            {data && (<Typography gutterBottom variant="h5" component="div">
                                {data.balance} $
                            </Typography>)}
                            <Typography variant="body2" color="text.secondary">
                                Musumba Gerald Michael
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="small" onClick={handleDepositOpen}>Deposit</Button>

                            <Box sx={{ flexGrow: 1 }}></Box>
                            <Button size="small" variant="outlined" onClick={handleSendOpen}>Send</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{
                        minHeight: "40vh", padding: 3, position: 'relative'
                    }}>
                        <Typography variant="h5" >Beneficiaries</Typography>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary="Musumba"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                +256700215506
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="fullWidth" component="li" />
                        </List>
                        <Fab color="primary" aria-label="add" sx={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5
                        }}
                            onClick={handleBeneficiaryOpen}
                        >
                            <AddIcon />
                        </Fab>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper sx={{ minHeight: "40vh", padding: 3 }}>
                        <Typography variant="h5">Recent Transactions</Typography>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{ background: '#3C9905' }}>50$</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="To Gerald"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Charge 2$
                                            </Typography>
                                            {" — Wallet to Wallet"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <Modal
                open={openDeposit}
                onClose={handleDepositClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {deposit.step === 1 ?
                        <DepositDetails />
                        : <CreditCard />}


                </Box>
            </Modal>

            <Modal
                open={openSend}
                onClose={handleSendClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SelectMethod />
                </Box>
            </Modal>
            <Modal
                open={openBeneficiary}
                onClose={handleBeneficiaryClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Beneficiary />
                </Box>
            </Modal>
        </>
    )
}
