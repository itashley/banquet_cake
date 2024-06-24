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
import InquiryList from "./pages/Inquiry/List";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router> 
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/inquiry/add" component={FormAdd} />
        <PrivateRoute exact path="/inquiry/list" component={InquiryList} />
      </Switch>
    </Router>
  );
}

export default App;


