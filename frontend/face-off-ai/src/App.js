import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, Footer } from "./components";
import { About, Login } from "./screens";

function App() {
  return (
    <div className="App">
        <Router>
            <NavigationBar />
            <Switch>
                <Route path="/login" exact component={() => <Login />} />
                <Route path="/about" exact component={() => <About />} />
            </Switch>
            <Footer />
      </Router>
    </div>
  );
}

export default App;
