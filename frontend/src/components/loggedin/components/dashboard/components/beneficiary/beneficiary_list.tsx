import React, { useContext } from 'react'
import { List, ListItem, Typography, Divider, ListItemText, Box, IconButton } from "@mui/material"
import axios from 'axios'
import useSwr, { useSWRConfig } from 'swr'
import { HOST_URL } from "../../../../../../config/settings"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BeneficiaryContext } from '../../../../../../store/context/beneficiary'
import { useHistory, useRouteMatch } from 'react-router'
const token = localStorage.getItem('token')
const config = {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
};
const fetcher = (url: string) => axios.get(url, config).then(res => res.data)
export default function BeneficiaryList() {
    const { data } = useSwr(`${HOST_URL}beneficiaries/list`, fetcher)
    const { deleteBeneficiary } = useContext(BeneficiaryContext)
    const { mutate } = useSWRConfig()
    let { path } = useRouteMatch()
    const history = useHistory()
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data && data.beneficiaries.map((beneficiary: any) => {
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
                            <Box sx={{ padding: 0 }}>
                                <IconButton color="warning" aria-label="edit beneficiary" component="span" sx={{ display: "block", marginBottom: 0 }}
                                    onClick={() => { history.push(`${path}/beneficiary/${beneficiary.id}`) }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" aria-label="delete beneficiary" component="span" sx={{ display: "block", marginTop: 0 }} onClick={() => {
                                    deleteBeneficiary(beneficiary.id)
                                    mutate(`${HOST_URL}beneficiaries/list`)
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                    </Box>
                )
            })}
        </List>
    )
}
