import React from 'react';
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
            Enviar Dinheiro
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright