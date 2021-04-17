import './App.css';
import Forme from './components/Forme';
import Overview from './components/Overview'
import Nav from './components/Nav'
import Container  from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container fluid="md">
        <Router>
          <Nav/>
          <h1> Bienvenue sur Twitter </h1>
          <Switch>
            <Route path="/add"> <Forme /> </Route>
            <Route path="/" exact> <Overview /> </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
