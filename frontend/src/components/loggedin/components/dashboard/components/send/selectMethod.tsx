import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { SelectChangeEvent } from '@mui/material/Select';


export default function SelectMethod() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <div>
            <form>
                <Typography>Send Money</Typography>
                <TextField label="Amount" type="text" fullWidth />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Beneficiary</MenuItem>
                        <MenuItem value={20}>Wallet</MenuItem>
                        <MenuItem value={30}>Mobile Number</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Beneficiary</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Gerald</MenuItem>
                        <MenuItem value={20}>Michael</MenuItem>
                        <MenuItem value={30}>Komuhangi</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Wallet ID" type="text" fullWidth />
                <TextField label="Mobile No" type="text" fullWidth />
            </form>
        </div>
    )
}
