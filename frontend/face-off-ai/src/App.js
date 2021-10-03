import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar, About } from "./components";

function App() {
  return (
    <div className="App">
        <Router>
            <NavigationBar />
            <Switch>
                <Route path="/about" exact component={() => <About />} />
            </Switch>
      </Router>
    </div>
  );
}

export default App;
