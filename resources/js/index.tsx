import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AuthContextProvider from './store/context/auth'
// import ThemeContextProvider from './store/context/theme'
import { SnackbarProvider } from 'notistack';


ReactDOM.render(
    <React.StrictMode>
        {/* <ThemeContextProvider> */}
        <AuthContextProvider>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </AuthContextProvider>
        {/* </ThemeContextProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
);