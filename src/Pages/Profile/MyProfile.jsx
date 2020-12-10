import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {userActions} from "../../_actions";

function OldProfil() {

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
        <div className="container-xl">
            <div className="gutter-condensed gutter-lg flex-column flex-md-row d-flex">

                <div className="col col-12 col-md-3 mb-4 mb-md-0">
                    <div className="">
                        <a className="tooltipped tooltipped-s d-block mb-4" aria-label="Change your avatar" href="https://github.com/account">
                            <img style={{height: "auto"}} alt="" width="260" height="260" className="avatar avatar-user width-full border bg-white"
                                 src="https://avatars0.githubusercontent.com/u/37505772?s=460&amp;u=2e828a3cf87c0fc4cb7f36bdab4fcb2fdcdcde6a&amp;v=4"
                            />
                        </a>
                        <div className="name">
                            <h5>{user.firstName} {user.lastName}</h5>
                            <h6>{user.role}</h6>
                            <p>{user.username}</p>
                        </div>
                        <hr/>
                        <div className="edit">
                            <button className={"btn btn-primary btn-block mb-3 js-profile-editable-edit-button"}>Modifier</button>
                        </div>
                        <div className="details">
                                <p className="vcard-detail pt-1 css-truncate css-truncate-target hide-sm hide-md"
                                    itemProp="homeLocation" show_title="false" aria-label="Home location: Paris, FR">
                                    <svg className="mr-1 octicon octicon-location" viewBox="0 0 16 16" version="1.1"
                                         width="16" height="16" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                              d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path>
                                    </svg>
                                    <span className="p-label">Université d'Evry</span>
                                </p>
                                <p itemProp="email" aria-label="Email: meddouri.badis@gmail.com"
                                    className="vcard-detail pt-1 css-truncate css-truncate-target ">
                                    <svg className="mr-1 octicon octicon-mail" viewBox="0 0 16 16" version="1.1" width="16"
                                         height="16" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                              d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path>
                                    </svg>
                                    <a className="u-email link-gray-dark "
                                       href="mailto:meddouri.badis@gmail.com">{user.email}</a>
                                </p>
                        </div>
                        <hr/>
                        <div className="useful-links">
                            <p><a href="#">Accueil</a></p>
                            <p><a href="#">UEVE</a></p>
                            <p><a href="#">Paris Saclay</a></p>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 col-12 col-md-9 mb-4 mb-md-0">
                    sqdqsd
                </div>

            </div>
        </div>
    );
}

export { MonProfil };
