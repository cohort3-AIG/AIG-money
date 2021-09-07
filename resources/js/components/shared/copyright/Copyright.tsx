import React from 'react';
import { Typography, Link } from '@mui/material'
const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                aigwallet.com
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright