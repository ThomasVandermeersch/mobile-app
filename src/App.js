import './App.css';
import Forme from './components/Forme';
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import SearchUser from './components/SearchUser'
import Container  from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthProvider } from './components/Auth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Container fluid="md">
        <AuthProvider>
          <Router>
            <Switch>
              <PrivateRoute path="/add" component={Forme}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={SignUp}/>
              <PrivateRoute path="/userProfile/:name" component={UserProfile}/>
              <PrivateRoute path="/searchUser" component={SearchUser}/>

              <PrivateRoute path="/" component={Home}/>
            </Switch>
          </Router>
        </AuthProvider>
      </Container>
    </div>
  );
}

export default App;
