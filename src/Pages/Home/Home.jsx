import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../_helpers";
import { alertActions, userActions } from "../../_actions";
import { PrivateRoute } from "../../_components";

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div>
            {user.role === 'TEACHER' &&
            <div className="row">
                <div className="col-12">
                    <h1>Accueil</h1>
                    <hr/>

                    <h2>Vos cas contacts :</h2>
                    <br/>
                    <div className="list-group">
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Badis Meddouri</h5>
                                <small>M2 MIAGE APP</small>
                            </div>
                            <p className="mb-1">Du 13/10 jusqu'au 20/10</p>
                            <small>Donec id elit non mi porta.</small>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Anis Kassy</h5>
                                <small>M2 MIAGE APP</small>
                            </div>
                            <p className="mb-1">Du 13/10 jusqu'au 20/10</p>
                            <small>Donec id elit non mi porta.</small>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Jayson Bouceaud</h5>
                                <small>M2 MIAGE APP</small>
                            </div>
                            <p className="mb-1">Du 13/10 jusqu'au 20/10</p>
                            <small>Donec id elit non mi porta.</small>
                        </a>
                    </div>
                </div>
                <div className="col-12">
                    <br/>
                    <h2>Tableau de bord </h2>
                    <br/>
                </div>
                <div className="col-4">
                    <a className="btn btn-primary" href="#" role="button">Calendrier</a>
                </div>
                <div className="col-4">
                    <a className="btn btn-primary" href="#" role="button">Gérer mes élèves</a>
                </div>
                <div className="col-4">
                    <a className="btn btn-primary" href="/dashboard/classe/manage" role="button">Gérer mes classes</a>
                </div>
            </div>
            }
            {user.role === 'STUDENT' &&
            <div className="row">
                <div className="col-12">
                    <h1>Accueil</h1>
                    <hr/>

                    <h2>Vos actions :</h2>
                    <p>Bonjour étudiant</p>
                </div>
            </div>
            }
        </div>

    );
}

export { HomePage };
