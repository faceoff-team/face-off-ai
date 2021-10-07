import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, Footer, HorizontalLine } from "./components";
import { About, Game, Home, Login, Profile } from "./screens";

function App() {
  return (
    <div className="App">
        <Router>
            <NavigationBar />
            <Switch>
                <Route path="/login" exact component={() => <Login />} />
                <Route path="/game" exact component={() => <Game />} />
                <Route path="/home" exact component={() => <Home />} />
                <Route path="/about" exact component={() => <About />} />
                <Route path="/profile" exact component={() => <Profile />} />
            </Switch>
            <HorizontalLine color="#f7f7f7" width="85%"/>
            <Footer />
      </Router>
    </div>
  );
}

export default App;
