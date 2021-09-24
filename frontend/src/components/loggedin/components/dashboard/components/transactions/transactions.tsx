import React from 'react'
import { List, ListItem, Typography, Divider, ListItemText, Box, Avatar, ListItemAvatar } from "@mui/material"
import axios from 'axios'
import useSwr from 'swr'
import { HOST_URL } from "../../../../../../config/settings"
const token = localStorage.getItem('token')
const config = {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
};
const fetcher = (url: string) => axios.get(url, config).then(res => res.data)
export default function Transactions() {
    const { data } = useSwr(`${HOST_URL}transactions/logs/me`, fetcher)
    console.log(data)
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data && data.map((transaction: any) => {
                return (
                <Box key={transaction.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar sx={{ background: '#3C9905' }}>{transaction.status}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={transaction.amount +"$"}
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
                                    {` — ${transaction.type}`}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Box>)
            })}
        </List>
    )
}
