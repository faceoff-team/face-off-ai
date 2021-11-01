import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavigationBar, Footer, HorizontalLine } from "./components";
import { About, Game, Home, Login, Profile, Settings, Leaderboard, Register, MultiplayerGame, Error404 } from "./screens";
import { createTheme, ThemeProvider } from "@mui/material";
import { dark } from '@mui/material/styles/createPalette';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  const theme = createTheme({
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
  });

  return (
    <Provider store={store}>
     <div className="App">
        <ThemeProvider theme={theme}>
        <Router>
            <NavigationBar />
            <div style={{paddingBottom: "129px"}}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/login" exact component={() => <Login />} />
                    <Route path="/game" exact component={() => <Game />} />
                    <Route path="/settings" exact component={() => <Settings />} />
                    <Route path="/home" exact component={() => <Home />} />
                    <Route path="/about" exact component={() => <About />} />
                    <Route path="/profile" exact component={() => <Profile />} />
                    <Route path="/leaderboards" exact component ={() => <Leaderboard />} />
                    <Route path="/register" exect component = {() => <Register />} />
                    <Route path="/multiplayergame" exect component = {() => <MultiplayerGame />} />

                    <Route component={() => <Error404 />} />
                </Switch>
            </div>
            <div className="footerDiv">
                <HorizontalLine color="#f7f7f7" width="85%"/>
                <Footer darkMode={true}/>
            </div>
      </Router>
      </ThemeProvider>
     </div>
    </Provider>
  );
}

export default App;
