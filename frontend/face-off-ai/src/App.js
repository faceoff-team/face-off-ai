import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, Footer, HorizontalLine } from "./components";
import { About, Game, Home, Login, Profile } from "./screens";
import { createTheme, ThemeProvider } from "@mui/material";
import { dark } from '@mui/material/styles/createPalette';

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#4963ae"
        },

        secondary: {
            main: "#4cc0ad"
        }
    }
})

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
        <Router>
            <NavigationBar />
            <Switch>
                <Route path="/login" exact component={() => <Login />} />
                <Route path="/game" exact component={() => <Game />} />
                <Route path="/settings" exact component={() => <Game />} />
                <Route path="/home" exact component={() => <Home />} />
                <Route path="/about" exact component={() => <About />} />
                <Route path="/profile" exact component={() => <Profile />} />
            </Switch>
            <HorizontalLine color="#f7f7f7" width="85%"/>
            <Footer darkMode={true}/>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
