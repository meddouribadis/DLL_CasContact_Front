import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../_helpers";
import { alertActions } from "../../_actions";
import { PrivateRoute, SecuredRoute } from "../../_components";

// Pages
import { HomePage } from "../../Pages/Home";
import { LoginPage } from "../../Pages/Login";
import { RegisterPage } from "../../Pages/Register";

// Components
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

import "./App.css";
import {DashboardRouter} from "../../Pages/Dashboard";
import {SignalementRouter} from "../../Pages/Signalement";
import {ProfileRouter} from "../../Pages/Profile";
import {CalendrierPage} from "../../Pages/Calendrier";


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
        </div>
      </div>

      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute path="/signalement" component={SignalementRouter} />
          <PrivateRoute path="/profile" component={ProfileRouter} />

          <SecuredRoute path="/calendrier" component={CalendrierPage} />
          <SecuredRoute path="/dashboard" component={DashboardRouter} />

          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>

      <Footer/>

    </div>
  );
}

export { App };
