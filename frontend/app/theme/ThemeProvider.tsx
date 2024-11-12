import { ThemeProvider } from "next-themes";

interface ThemeProviderProps {
    children : React.ReactNode;
}

const NextThemeProvider = ({children}: ThemeProviderProps) =>{
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
            {children}
        </ThemeProvider>
    )
}

export default NextThemeProvider