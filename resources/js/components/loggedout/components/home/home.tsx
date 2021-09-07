import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack';

export default function Home() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useEffect(() => {
        enqueueSnackbar("refreshed")
    })
    return (
        <div>
            Home
        </div>
    )
}
