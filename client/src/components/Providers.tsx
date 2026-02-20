'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="data-theme" defaultTheme="light">
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
}
