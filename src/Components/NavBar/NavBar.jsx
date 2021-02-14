import React, {Fragment} from "react";
import logo from '../../Assets/univ_evvry_logo.png';
import {useSelector} from "react-redux";
import {DarkModeToggle} from "../DarkModeToggle/DarkModeToggle";

function NavBar() {

    const user = useSelector(state => state.authentication.user);

    function UserInfo() {
        if (user) {
            return (
                <div className="dropdown show">
                    <a className="py-2 d-none d-md-inline-block dropdown-toggle" href="#" role="button"
                       id="dropdownMenuUser"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.firstName}
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuUser">
                        <a className="dropdown-item" href="/profile">Mon profil</a>
                        <a className="dropdown-item" href="#">Contact</a>
                        <a className="dropdown-item" href="/login">Se déconnecter</a>
                    </div>
                </div>
            );
        }
        return (
            <Fragment>
                <a className="py-2 d-none d-md-inline-block" href="/login">Connexion</a>
                <a className="py-2 d-none d-md-inline-block" href="/register">Inscription</a>
            </Fragment>
        );
    }

    function TeacherLinks() {
        return (
            <Fragment>
                <a className="py-2 d-none d-md-inline-block" href="/dashboard/classes">Mes classes</a>
                <a className="py-2 d-none d-md-inline-block" href="/dashboard/signalements">Signalements</a>
                <a className="py-2 d-none d-md-inline-block" href="/calendrier">Calendrier</a>
            </Fragment>
        );
    }

    function CollapsingNavBar() {
        return(
            <div className="navbar-collapse collapse" id="collapsingNavbar">
                <ul className="navbar-nav mx-auto text-center">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Accueil</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/infos">Information</a>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <nav className="navbar site-header sticky-top">
            <button className="navbar-toggler m-auto d-block d-sm-none" type="button" data-toggle="collapse" data-target="#collapsingNavbar"
                    aria-controls="collapsingNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div
                className="container d-flex flex-column flex-md-row justify-content-between align-items-center"
                id="mainNavbar">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="" className={"img-fluid logo"}/>
                </a>

                <a className="top-link py-2 d-none d-md-inline-block" href="/">Accueil</a>

                {user && user.role !== 'TEACHER' &&
                <div className="dropdown show">
                    <a className="py-2 d-none d-md-inline-block dropdown-toggle" href="#" role="button"
                       id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">Signalements</a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="/signalement/">Mes signalements</a>
                        <a className="dropdown-item" href="/signalement/infection">Je suis infecté</a>
                        <a className="dropdown-item" href="/signalement/cas-contact">Je suis cas contact</a>
                    </div>
                </div>
                }

                {user && user.role === 'TEACHER' &&
                <TeacherLinks/>
                }

                <a className="top-link py-2 d-none d-md-inline-block" href="/infos">Information</a>
                <UserInfo/>
                <DarkModeToggle/>
            </div>
            <CollapsingNavBar/>
        </nav>
    );
}

export {NavBar};
