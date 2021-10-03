import logo from './logo.svg';
import './App.css';
import NavigationBar from "./components/";

function App() {
  return (
    <div className="App">
      <Router>
          <NavigationBar />
      </Router>
    </div>
  );
}

export default App;
