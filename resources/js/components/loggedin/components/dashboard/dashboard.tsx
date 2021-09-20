import React from 'react'
import { Grid, Paper, Modal } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function dashboard() {
    const [openDeposit, setOpenDeposit] = React.useState(false);
    const handleDepositOpen = () => setOpenDeposit(true);
    const handleDepositClose = () => setOpenDeposit(false);
    const [openSend, setSendOpen] = React.useState(false);
    const handleSendOpen = () => setSendOpen(true);
    const handleSendClose = () => setSendOpen(false);
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="/images/default.png"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                0 $
                            </Typography>
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
                    <Paper>xs=4</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>xs=4</Paper>
                </Grid>
            </Grid>
            <Modal
                open={openDeposit}
                onClose={handleDepositClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={openSend}
                onClose={handleSendClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>

        </>
    )
}
