import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AuthContextProvider from './store/context/auth'
// import ThemeContextProvider from './store/context/theme'

ReactDOM.render(
    <React.StrictMode>
        {/* <ThemeContextProvider> */}
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
        {/* </ThemeContextProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
);