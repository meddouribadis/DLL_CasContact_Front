import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../_helpers";
import { alertActions } from "../../_actions";
import { PrivateRoute } from "../../_components";

// Pages
import { HomePage } from "../../Pages/Home";

// Components
import { Navbar } from "../Navbar";
import { FooterBar } from "../Footer";

import "./App.css";

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
      <div className="container-fluid">
        <div className="col-md-8 offset-md-2">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export { App };
