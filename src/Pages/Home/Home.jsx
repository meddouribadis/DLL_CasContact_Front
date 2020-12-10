import React, {Fragment, useEffect} from "react";
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../_helpers";
import { alertActions, signalementActions } from "../../_actions";
import {DashCard} from "../../Components/DashboardCard";


function LandingPage(){
    return(
        <Fragment>
            <div className="container-fluid landing-bg">
                <div className="container">
                    <div className="row align-items-center landing">
                        <div className="col-6">
                            <h1 className="page-header-title">Bienvenue sur Cas Covid Contact</h1>
                            <p className="page-header-text mb-5">SIgnalez rapidement si vous êtes infecté, cas contact ou autre. Retrouvez également les dernières informations concernant le COVID à l'université d'Evry.</p>
                            <a className="btn btn-lg btn-success font-weight-500 mr-3" href="/login">Se connecter
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="feather feather-arrow-right ml-2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid" src="https://sb-ui-kit-pro.startbootstrap.com/assets/img/illustrations/windows.svg"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <h3>Les dernières informations</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </Fragment>

    )
}

function StudentHomePage(){
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    return(
        <div className="container">
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
        </div>
    )
}

function TeacherHomePage(){
    const signalements = useSelector(state => state.signalements);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signalementActions.getAllActive());
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Accueil</h1>
                    <hr/>

                    <h3>Vos cas contacts</h3>
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
                    <h3>Tableau de bord </h3>
                    <br/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 col-sm-6 col-12 mb-3">
                    <DashCard title={"Calendrier"} className={"h-100"}>
                        <p className="card-text">Visualisez rapidement les signalements reçu sur notre calendrier.</p>
                        <a className="btn btn-primary" href="/calendrier" role="button">Calendrier</a>
                    </DashCard>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-3">
                    <DashCard title={"Elèves"} className={"h-100"}>
                        <p className="card-text">Gérer facilement et rapidement vos élèves.</p>
                        <a className="btn btn-primary" href="#" role="button">Gérer mes élèves</a>
                    </DashCard>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-3">
                    <DashCard title={"Signalements"} className={"h-100"}>
                        <p className="card-text">Accéder aux derniers signalements, cas-contact et documents reçus.</p>
                        <a className="btn btn-warning" href="/dashboard/signalements" role="button">Signalements</a>
                    </DashCard>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-3">
                    <DashCard title={"Classes"} className={"h-100"}>
                        <p className="card-text">Gérer facilement et rapidement vos élèves.</p>
                        <a className="btn btn-primary" href="/dashboard/classes" role="button">Gérer mes classes</a>
                    </DashCard>
                </div>
                <div className="col-md-3 col-sm-6 col-12 mb-3">
                    <DashCard title={"Documents"} className={"h-100"}>
                        <p className="card-text">Retrouvez et gérer les documents envoyez par vos élèves.</p>
                        <a className="btn btn-primary" href="/dashboard/classes" role="button">Voir</a>
                    </DashCard>
                </div>
                <div className="col-12">
                    <a href="/dashboard">Accéder au Dashboard</a>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h3 className={"my-3"}>Informez vos élèves</h3>
                </div>
                <div className="col-sm-6 col-12 mb-3">
                    <DashCard title={"Je suis cas contact"} className={"h-100"}>
                        <p className="card-text">Visualisez rapidement les signalements reçu sur notre calendrier.</p>
                        <a className="btn btn-warning" href="/signalement/cas-contact" role="button">Signaler</a>
                    </DashCard>
                </div>
                <div className="col-sm-6 col-12 mb-3">
                    <DashCard title={"Je suis infecté"} className={"h-100"}>
                        <p className="card-text">Gérer facilement et rapidement vos élèves.</p>
                        <a className="btn btn-danger" href="/signalement/infection" role="button">Signaler</a>
                    </DashCard>
                </div>
            </div>

        </div>
    )
}

function HomePage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    return (
        <div>
            {!user &&
                <LandingPage/>
            }
            {user && user.role === 'TEACHER' &&
                <TeacherHomePage/>
            }
            {user && user.role === 'STUDENT' &&
                <StudentHomePage/>
            }
        </div>
    );
}

export { HomePage };
