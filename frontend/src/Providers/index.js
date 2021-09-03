import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MUI_THEME from '../styles/mui-theme';

const Providers = ({ children }) => {

    const theme = createMuiTheme(MUI_THEME);

    return <ThemeProvider theme={theme}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </ThemeProvider>
}

export default Providers