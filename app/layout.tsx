'use client';

import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import TopLevelLayout from "./top-level-layout";

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
            <body>
                <TopLevelLayout>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </TopLevelLayout>
            </body>
            </html>
        </>
    )
}
