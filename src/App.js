import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";
import FormAdd from "./pages/Inquiry/Add"
// import Report from "./pages/Report";
// import PublicRoute from "./utils/PublicRoute";
// import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router> 
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/inquiry/add" component={FormAdd} />
      </Switch>
    </Router>
   
  );
}

export default App;
