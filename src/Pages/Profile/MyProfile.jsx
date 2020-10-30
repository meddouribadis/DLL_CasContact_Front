import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {userActions} from "../../_actions";

function MonProfil() {

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
        <div className="container emp-profile">
            <h1>Mon profil</h1>
            <hr/>
            <form method="post">
                <div className="row">
                    <div className="col-4 col-md-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="profile-img">
                                    <img
                                        className={"img-fluid"}
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                        alt=""/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <hr/>
                                <div className="profile-work">
                                    <h6>Liens utiles</h6>
                                    <a href="">Emploi du temps</a><br/>
                                    <a href="">COVID Gouv</a><br/>
                                    <a href="">UEVE</a><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-6">
                        <div className="row profile-head">
                            <div className="col-10">
                                <h5>{user.firstName} {user.lastName}</h5>
                                <h6>{user.role}</h6>
                                <p className="proile-rating">Université d'Evry</p>
                            </div>
                            <div className="col-2">
                                <a href="" className="btn btn-dark">Modifier</a>
                            </div>
                        </div>
                        <div className="row tabs">
                            <div className="col-12">
                                <hr/>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                           role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"
                                           role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row user-info">
                            <div className="col-12">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel"
                                         aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Nom</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.firstName} {user.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Numéro étudiant</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.numEtud}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Role</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>Your Bio</label><br/>
                                                <p>Your detail description</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}

export { MonProfil };
