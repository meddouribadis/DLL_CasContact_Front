import React, {Fragment} from "react";
import logo from '../../Assets/univ_evvry_logo.png';
import {useSelector} from "react-redux";
import {DarkModeToggle} from "../DarkModeToggle/DarkModeToggle";

function NavBar() {

    const user = useSelector(state => state.authentication.user);

    function UserInfo() {
        if (user) {
            return (
                <div className="d-flex px-3">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdownMenuUser" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                {user.firstName} {user.lastName}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuUser">
                                <li><a className="dropdown-item" href="/profile">Mon profil</a></li>
                                <li><a className="dropdown-item" href="#">Contact</a></li>
                                <li><a className="dropdown-item" href="/login">Se déconnecter</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            );
        }
        return (
            <div className="d-flex px-3">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="/login">Connexion</a></li>
                    <li className="nav-item"><a className="nav-link" href="/register">Inscription</a></li>
                </ul>
            </div>
        );
    }

    function TeacherLinks() {
        return (
            <Fragment>
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard/classes">Mes classes</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard/signalements">Signalements</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/calendrier">Calendrier</a>
                </li>
            </Fragment>
        );
    }

    function UserLinks() {
        return (
            <Fragment>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Signalements
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a className="dropdown-item" href="/signalement/">Mes signalements</a></li>
                        <li><a className="dropdown-item" href="/signalement/infection">Je suis infecté</a></li>
                        <li><a className="dropdown-item" href="/signalement/cas-contact">Je suis cas contact</a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/calendrier">Calendrier</a>
                </li>
            </Fragment>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg site-header sticky-top">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Univ-Evry Logo" className={"img-fluid logo"}/>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Accueil</a>
                        </li>

                        {user && user.role !== 'TEACHER' &&
                        <UserLinks/>
                        }

                        {user && user.role === 'TEACHER' &&
                        <TeacherLinks/>
                        }

                        <li className="nav-item">
                            <a className="nav-link" href="/infos">Information</a>
                        </li>


                    </ul>
                </div>


                <UserInfo/>

                <DarkModeToggle/>
            </div>
        </nav>
    );
}

export {NavBar};
