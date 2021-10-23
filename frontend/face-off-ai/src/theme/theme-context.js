import React from 'react';

const initialState = {
   dark: false,
   theme: themes.light,
   toggle: () => {}
 }
 
const ThemeContext = React.createContext(initialState)

const themes = {
    dark: {
        backgroundColor: 'black',
        backgroundCard: '#25282c',
        color: 'white'
      },
     light: {
       backgroundColor: 'white',
       backgroundCard: '#fff',
       color: 'black'
     }
}