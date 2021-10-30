import React from 'react';

const themes = {
    dark: {
        palette: {
            text: {
                primary: "#f7f7f7",
                secondary: "#f7f7f7"
            },
    
            primary: {
                main: "#4963ae",
                contrastText: "#f7f7f7"
            },
    
            secondary: {
                main: "#4cc0ad",
                contrastText: "#f7f7f7"
            }
        },
        backgroundColor: 'black',
        backgroundCard: '#25282c',
        color: 'white'
    },
    light: {
        palette: {
            text: {
                primary: "#f7f7f7",
                secondary: "#f7f7f7"
            },
    
            primary: {
                main: "#4963ae",
                contrastText: "#f7f7f7"
            },
    
            secondary: {
                main: "#4cc0ad",
                contrastText: "#f7f7f7"
            }
        },
        backgroundColor: 'white',
        backgroundCard: '#fff',
        color: 'black'
    }
}

const initialState = {
   dark: false,
   theme: themes.light,
   toggle: () => {}
}

const initialState = {
    dark: false,
    theme: themes.light,
    toggle: () => {}
}

const ThemeContext = React.createContext(initialState)

function NewThemeProvider({ children }) {
    const [dark, setDark] = React.useState(false) // Default theme is light
    
    // To toggle between dark and light modes
    const toggle = () => {
       setDark(!dark)
    }
    
    // Filter the styles based on the theme selected
    const theme = dark ? themes.dark : themes.light
    
    return (
        <ThemeContext.Provider value={{ theme, dark, toggle }}>
           {children}
        </ThemeContext.Provider>
        )
}

export { NewThemeProvider, ThemeContext }