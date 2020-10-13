import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';

//Routes
import {CreateClasse, ManageClasses} from "./ClasseDashboard";

// Routeur Dashboard
function DashboardRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={DashboardHome} />
            <Route exact path={`${path}/classe/create`} component={CreateClasse} />
            <Route exact path={`${path}/classe/manage`} component={ManageClasses} />
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
                <Link to={{pathname: "/dashboard/classe/create"}} className="btn btn-link">Créer une classe</Link>
                <Link to={{pathname: "/dashboard/classe/manage"}} className="btn btn-link">Gérer les classes</Link>
                <Link to={{pathname: "/dashboard/create-category"}} className="btn btn-link">Créer une catégorie</Link>
                <Link to={{pathname: "/dashboard/manage-categories"}} className="btn btn-link">Gérer les catégories</Link>
            </div>
        </div>
    );
}

export { DashboardRouter, DashboardHome};
