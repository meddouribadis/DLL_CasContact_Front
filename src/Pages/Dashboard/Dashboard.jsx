import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';

//Routes
import {CreateClasse, ManageClasses, EditClasse} from "./ClasseDashboard";
import {EditUser} from "./UserDashboard";
import {EditSignalement, ManageSignalements} from "./SignalementDashboard";

// Routeur Dashboard
function DashboardRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={DashboardHome} />
            <Route exact path={`${path}/classes`} component={ManageClasses} />
            <Route path={`${path}/classe/create`} component={CreateClasse} />
            <Route path={`${path}/classe/edit/:classeId`} component={EditClasse} />

            <Route path={`${path}/user/edit/:userId`} component={EditUser} />

            <Route path={`${path}/signalements`} component={ManageSignalements} />
            <Route path={`${path}/signalement/edit/:signalementId`} component={EditSignalement} />
        </Switch>
    );
}

// Page Accueil Dashboard
function DashboardHome() {

    return (
        <div className="row">
            <div className="col">
                <h1>Tableau de bord !</h1>
                <hr/>
                <p>Vous pouvez réalisez les actions suivantes :</p>
                <Link to={{pathname: "/dashboard/classes/create"}} className="btn btn-link">Créer une classe</Link>
                <Link to={{pathname: "/dashboard/classes"}} className="btn btn-link">Gérer les classes</Link>
            </div>
        </div>
    );
}

export { DashboardRouter, DashboardHome};
