import React from "react";
import {JotaiProvider} from "./provider";
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';

export function GlobalLayout({
                                               children
                                           }: {
    children: React.ReactNode
}) {
    return <JotaiProvider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
    </JotaiProvider>
}
