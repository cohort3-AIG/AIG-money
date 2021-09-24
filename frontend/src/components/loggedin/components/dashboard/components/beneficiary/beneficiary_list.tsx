import React from 'react'
import { List, ListItem, Typography, Divider, ListItemText, Box } from "@mui/material"
import axios from 'axios'
import useSwr from 'swr'
import { HOST_URL } from "../../../../../../config/settings"
const token = localStorage.getItem('token')
const config = {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
};
const fetcher = (url: string) => axios.get(url, config).then(res => res.data)
export default function BeneficiaryList() {
    const { data} = useSwr(`${HOST_URL}beneficiaries/list`, fetcher)
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data && data.map((beneficiary: any) => {
                return (
                    <Box key={beneficiary.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={beneficiary.first_name + " " + beneficiary.last_name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {beneficiary.phone_number}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                    </Box>
                )
            })}
        </List>
    )
}
