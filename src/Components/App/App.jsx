import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../_helpers";
import { alertActions } from "../../_actions";
import { PrivateRoute } from "../../_components";

// Pages
import { HomePage } from "../../Pages/Home";
import { LoginPage } from "../../Pages/Login";
import { RegisterPage } from "../../Pages/Register";

// Components
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

import "./App.css";
import {DashboardRouter} from "../../Pages/Dashboard";


function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className={"main"}>

      <NavBar/>

      <div className="container-fluid">
        <div className="col-md-8 offset-md-2">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/dashboard" component={DashboardRouter} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </div>
      </div>

      <Footer/>

    </div>
  );
}

export { App };
