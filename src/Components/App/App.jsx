import React, {useEffect} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CookieConsent from "react-cookie-consent";

import {history} from "../../_helpers";
import {alertActions} from "../../_actions";
import {PrivateRoute, SecuredRoute} from "../../_components";

// Pages
import {Cookies, HomePage, latestNews} from "../../Pages/Home";
import {LoginPage} from "../../Pages/Login";
import {RegisterPage} from "../../Pages/Register";

// Components
import {NavBar} from "../NavBar";
import {Footer} from "../Footer";

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
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/cookies" component={Cookies}/>
                    <Route path="/infos" component={latestNews}/>
                    <PrivateRoute path="/signalement" component={SignalementRouter}/>
                    <PrivateRoute path="/profile" component={ProfileRouter}/>

                    <SecuredRoute path="/calendrier" component={CalendrierPage}/>
                    <SecuredRoute path="/dashboard" component={DashboardRouter}/>

                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>

            <Footer/>
            <CookieConsent
                style={{
                    background: "rgb(50 50 50 / 80%)",
                    backdropFilter: "saturate(180%) blur(20px)",
                    padding: "2rem"
                }}
                buttonText="J'accepte"
                buttonStyle={{color: "#0c0c0c", fontSize: "1.3rem", padding: ".8rem", borderRadius: "5px"}}
            >
                Ce site utilise des cookies pour le fonctionnement des boutons de partage sur les réseaux sociaux et la
                mesure d’audience des pages. En poursuivant votre navigation, vous acceptez leurs utilisations. <a
                href="/cookies">En savoir plus</a>
            </CookieConsent>

        </div>
    );
}

export {App};
