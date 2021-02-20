import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';

//Routes
import {CreateClasse, ManageClasses, EditClasse} from "./ClasseDashboard";
import {EditUser, ManageUsers} from "./UserDashboard";
import {EditSignalement, ManageSignalements} from "./SignalementDashboard";
import {DashCard} from "../../Components/DashboardCard";
import {ShowCovidStatistics} from "../Home/Statistics";

// Routeur Dashboard
function DashboardRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={DashboardHome} />
            <Route exact path={`${path}/classes`} component={ManageClasses} />
            <Route path={`${path}/classe/create`} component={CreateClasse} />
            <Route path={`${path}/classe/edit/:classeId`} component={EditClasse} />

            <Route path={`${path}/users`} component={ManageUsers}/>
            <Route path={`${path}/user/edit/:userId`} component={EditUser}/>

            <Route path={`${path}/signalements`} component={ManageSignalements} />
            <Route path={`${path}/signalement/edit/:signalementId`} component={EditSignalement}/>
            <Route path={`${path}/statistics`} component={ShowCovidStatistics}/>
        </Switch>
    );
}

// Page Accueil Dashboard
function DashboardHome() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Tableau de bord !</h2>
                    <hr/>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <DashCard title={"Elèves"} className={"h-100"}>
                        <p className="card-text">Gérer facilement et rapidement vos élèves.</p>
                        <div className="d-flex flex-row flex-wrap justify-content-between">
                            <Link to={{pathname: "/dashboard/users"}}
                                  className="btn btn-outline-primary btn-sm mb-1 ts-buttom">Gérer les
                                utilisateurs</Link>
                        </div>
                    </DashCard>
                </div>

                <div className="col-4">
                    <DashCard title={"Classes"} className={"h-100"}>
                        <p className="card-text">Gérer facilement et rapidement vos classes.</p>
                        <div className="d-flex flex-row flex-wrap justify-content-between">
                            <Link to={{pathname: "/dashboard/classes"}}
                                  className="btn btn-outline-primary btn-sm mb-1 ts-buttom">Gérer les classes</Link>
                            <Link to={{pathname: "/dashboard/classes/create"}}
                                  className="btn btn-outline-success btn-sm mb-1 ts-buttom">Créer une classe</Link>
                            <Link to={{pathname: "/dashboard/classes"}}
                                  className="btn btn-outline-danger btn-sm mb-1 ts-buttom">Supprimer une classe</Link>
                        </div>
                    </DashCard>
                </div>

                <div className="col-4">
                    <DashCard title={"Signalements"} className={"h-100"}>
                        <p className="card-text">Gérer facilement et rapidement vos signalements.</p>
                        <div className="d-flex flex-row flex-wrap justify-content-between">
                            <Link to={{pathname: "/dashboard/signalements"}}
                                  className="btn btn-outline-primary btn-sm mb-1 ts-buttom">Voir les signalements</Link>
                        </div>
                    </DashCard>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-6">
                    <DashCard title={"Document"} className={"h-100"}>
                        <p className="card-text">Gérer facilement et rapidement vos documents.</p>
                        <div className="d-flex flex-row flex-wrap justify-content-between">
                            <Link to={{pathname: "/calendrier"}}
                                  className="btn btn-outline-primary btn-sm mb-1 ts-buttom">Voir les documents
                                reçus</Link>
                        </div>
                    </DashCard>
                </div>

                <div className="col-6">
                    <DashCard title={"Calendrier"} className={"h-100"}>
                        <p className="card-text">Obtenez rapidement un coup d'oeil à votre calendrier.</p>
                        <div className="d-flex flex-row flex-wrap justify-content-between">
                            <Link to={{pathname: "/calendrier"}}
                                  className="btn btn-outline-primary btn-sm mb-1 ts-buttom">Calendrier des
                                signalements</Link>
                        </div>
                    </DashCard>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <h3>Actions rapides</h3>
                    <hr/>
                </div>

                <div className="col-12">
                    <Link to={{pathname: "/dashboard/classes/create"}} className="btn btn-primary ms-1">Créer une
                        classe</Link>
                    <Link to={{pathname: "/dashboard/classes"}} className="btn btn-primary ms-1">Gérer les
                        classes</Link>
                    <Link to={{pathname: "/dashboard/users"}} className="btn btn-primary ms-1">Gérer les
                        utilisateurs</Link>
                </div>
            </div>
        </div>
    );
}

export { DashboardRouter, DashboardHome};
