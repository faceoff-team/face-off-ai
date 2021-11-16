import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavigationBar, Footer, HorizontalLine } from "./components";
import { About, Game, Home, Login, Profile, Settings, Leaderboard, Register, MultiplayerGame, Error404, ResetPassword, Forgot } from "./screens";
import { createTheme, ThemeProvider } from "@mui/material";

import { Provider } from 'react-redux';
import store from './store';

const light = {
    palette: {
        type: "light",
        text: {
            primary: "#080808",
            secondary: "#080808"
        },

        primary: {
            main: "#4963ae",
            contrastText: "#080808"
        },

        secondary: {
            main: "#4cc0ad",
            contrastText: "#080808"
        }
    },
};
    
const dark = {
    palette: {
        type: "dark",
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
};

function App() {

  /* const theme = createTheme({
    palette: {
        type: dark,
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
    }
  }); */
  // The light theme is used by default
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Provider store={store}>
     <div className="App">
     <ThemeProvider
        theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
     >
        <Router>
            <NavigationBar />
            <div style={{paddingBottom: "129px"}}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login" exact component={() => <Login />} />
                    <Route path="/game/:id/:title" exact component={() => <Game />} />
                    <Route path="/settings" exact component={() => <Settings />} />
                    <Route path="/home" exact component={() => <Home />} />
                    <Route path="/about" exact component={() => <About />} />
                    <Route path="/profile" exact component={() => <Profile />} />
                    <Route path="/leaderboards" exact component ={() => <Leaderboard />} />
                    <Route path="/register" exect component = {() => <Register />} />
                    <Route path="/multiplayergame" exect component = {() => <MultiplayerGame />} />
                    <Route path="/resetpassword/:hash" exect component = {() => <ResetPassword />} />
                    <Route path="/resetpassword/" exect component = {() => <ResetPassword />} />
                    <Route path="/forgot/" exect component = {() => <Forgot />} />
                    

                    <Route component={() => <Error404 />} />
                </Switch>
            </div>
            <div className="footerDiv">
                <HorizontalLine color="#f7f7f7" width="85%"/>
                <Footer/>
            </div>
      </Router>
      </ThemeProvider>
     </div>
    </Provider>
  );
}

export default App;
