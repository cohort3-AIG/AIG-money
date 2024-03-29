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
import Beneficiary from './components/beneficiary/beneficiary_create'
import { DepositContext } from '../../../../store/context/deposit'
import DepositDetails from './components/deposit/DepositDetails';
import axios from 'axios'
import useSwr from 'swr'
import { HOST_URL } from "../../../../config/settings"
import BeneficiaryList from './components/beneficiary/beneficiary_list';
import Transactions from './components/transactions/transactions';
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
    maxHeight: "80vh",
    overflow: "auto"
};
const token = localStorage.getItem('token')
const config = {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
};
const fetcher = (url: string) => axios.get(url, config).then(res => res.data)

export default function Dashboard() {
    const { data } = useSwr(`${HOST_URL}wallet/me/balance`, fetcher)
    const { data: wallet_data } = useSwr(`${HOST_URL}wallet_get/`, fetcher);
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
                    <Card >
                        {/* <CardMedia
                            component="img"
                            alt="profile picture"
                            height="140"
                            image="/images/default.png"
                        /> */}
                        <CardContent>
                            {data && (<Typography gutterBottom variant="h5" component="div">
                                {data.balance} $
                            </Typography>)}
                            <Typography variant="body2" color="text.secondary">
                                {wallet_data && wallet_data.data[0].first_name + " " + wallet_data.data[0].last_name}
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
                        maxHeight: "40vh",
                        padding: 3,
                        position: 'relative',
                        overflow: "auto"
                    }}>
                        <Box>
                            <Typography variant="h5" sx={{ display: "inline" }} >Beneficiaries</Typography>
                            <Button color="primary" aria-label="add"
                                variant="contained"
                                sx={{
                                    marginTop: 1,
                                    position: 'absolute',
                                    top: 5,
                                    right: 5
                                }}
                                onClick={handleBeneficiaryOpen}
                            >
                                Add
                            </Button>
                        </Box>
                        <BeneficiaryList />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper sx={{ minHeight: "40vh", padding: 3 }}>
                        <Typography variant="h5">Recent Transactions</Typography>
                        <Transactions />
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
