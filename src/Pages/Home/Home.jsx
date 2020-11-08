import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../_helpers";
import { alertActions, signalementActions } from "../../_actions";
import { PrivateRoute } from "../../_components";

function HomePage() {
    const signalements = useSelector(state => state.signalements);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.role === 'TEACHER') dispatch(signalementActions.getAllActive());
    }, []);

    return (
        <div>
            {user === null &&
            <div className="row">
                <p>Error</p>
            </div>
            }
            {user && user.role === 'TEACHER' &&
            <div className="row">
                <div className="col-12">
                    <h1>Accueil</h1>
                    <hr/>

                    <h2>Vos cas contacts :</h2>
                    <br/>

                    <div className="list-group">
                        {signalements.loading && <em>Chargement...</em>}
                        {signalements.error && <span className="text-danger">ERROR: {signalements.error}</span>}
                        {signalements.items && signalements.items.length == 0 && <p>Bonne nouvelle, aucun cas contact !</p>}
                        {signalements.items && signalements.items.map((signalement, index) => [
                                <a href={'dashboard/signalement/edit/'+signalement.id} key={signalement.id} className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{signalement.User.firstName} {signalement.User.lastName}</h5>
                                        <small>{signalement.User.classe.nom}</small>
                                    </div>
                                    <p className="mb-1">Du {new Date(signalement.dateDebut).toLocaleDateString()} jusqu'au {new Date(signalement.dateFin).toLocaleDateString()}</p>
                                    <small>{signalement.User.numEtud}</small>
                                </a>
                            ])}
                    </div>
                </div>
                <div className="col-12">
                    <br/>
                    <h2>Tableau de bord </h2>
                    <br/>
                </div>
                <div className="col-3">
                    <a className="btn btn-primary" href="/calendrier" role="button">Calendrier</a>
                </div>
                <div className="col-3">
                    <a className="btn btn-primary" href="#" role="button">Gérer mes élèves</a>
                </div>
                <div className="col-3">
                    <a className="btn btn-warning" href="/dashboard/signalements" role="button">Signalements</a>
                </div>
                <div className="col-3">
                    <a className="btn btn-primary" href="/dashboard/classes" role="button">Gérer mes classes</a>
                </div>
            </div>
            }
            {user && user.role === 'STUDENT' &&
            <div className="row">
                <div className="col-12">
                    <h1>Accueil</h1>
                    <hr/>
                    <p>Bonjour étudiant {user.firstName} {user.lastName} !</p>
                    <h2>Vos actions :</h2>
                </div>
                <div className="col-4">
                    <a className="btn btn-danger" href="/signalement/infection" role="button">Je suis infecté</a>
                </div>
                <div className="col-4">
                    <a className="btn btn-warning" href="/signalement/cas-contact" role="button">Je suis cas contact</a>
                </div>
                <div className="col-4">
                    <a className="btn btn-primary" href="/signalement" role="button">Voir mes signalements</a>
                </div>
            </div>
            }
        </div>

    );
}

export { HomePage };
