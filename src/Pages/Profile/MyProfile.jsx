import React, {useEffect, useState} from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {classeActions, userActions} from "../../_actions";

function MonProfil() {

    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const classes = useSelector(state => state.classes);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    //Objects
    const [submitted, setSubmitted] = useState(false);
    const [mailValidate, setMailValidate] = useState(false);
    const [userForm, setUser] = useState(user);

    useEffect(() => {
        dispatch(userActions.getAll());
        dispatch(classeActions.getAllWithoutUsers());
    }, []);

    // handleChanges and form
    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
        isValidEmail(user.email);
        console.log(userForm);
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
        user.id_classe = value;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password && user.numEtud && user.email && user.id_classe && mailValidate) {
            dispatch(userActions.register(user));
        }
    }

    function isValidEmail(email) {
        const regex = new RegExp("^[a-zA-Z0-9._%+-]+@etud\\.univ-evry+\\.fr$");
        if(regex.test(email)){
            console.log('True5 mail');
            setMailValidate(true);
        }
        else {
            console.log('False mail');
            setMailValidate(false);
        }
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
                            <button className={"btn btn-primary btn-block mb-3 js-profile-editable-edit-button"}>Modifier l'avatar</button>
                        </div>
                        <div className="details">
                                <p className="vcard-detail pt-1 css-truncate css-truncate-target hide-sm hide-md"
                                    itemProp="homeLocation" show_title="false" aria-label="Home location: Paris, FR">
                                    <svg className="mr-1 octicon octicon-location" viewBox="0 0 16 16" version="1.1"
                                         width="16" height="16" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path>
                                    </svg>
                                    <span className="p-label">Université d'Evry</span>
                                </p>
                                <p itemProp="email" aria-label="Email: meddouri.badis@gmail.com"
                                    className="vcard-detail pt-1 css-truncate css-truncate-target ">
                                    <svg className="mr-1 octicon octicon-mail" viewBox="0 0 16 16" version="1.1" width="16"
                                         height="16" aria-hidden="true">
                                        <path fillRule="evenodd"
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

                <div className="flex-shrink-0 col-12 col-md-9 mb-4 mb-md-0 pt-5 px-5">
                    <h3>Mon profil</h3>
                    <hr/>

                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Votre prénom</label>
                            <input type="text" name="firstName" value={userForm.firstName} onChange={handleChange} className={'form-control' + (submitted && !userForm.firstName ? ' is-invalid' : '')} placeholder="Votre prénom" />
                            {submitted && !userForm.firstName &&
                            <div className="invalid-feedback">Le prénom est requis</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Votre nom de famille</label>
                            <input type="text" name="lastName" value={userForm.lastName} onChange={handleChange} className={'form-control' + (submitted && !userForm.lastName ? ' is-invalid' : '')} placeholder="Votre nom" />
                            {submitted && !userForm.lastName &&
                            <div className="invalid-feedback">Le nom de famille est requis</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input type="text" name="username" value={userForm.username} onChange={handleChange} className={'form-control' + (submitted && !userForm.username ? ' is-invalid' : '')} placeholder="Nom d'utilisateur" />
                            {submitted && !userForm.username &&
                            <div className="invalid-feedback">Le champ utilisateur doit être renseigné</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>eMail</label>
                            <input type="text" name="email" value={userForm.email} onChange={handleChange} className={'form-control' + (submitted && (!userForm.email || !mailValidate) ? ' is-invalid' : '')} aria-describedby="emailHelp" placeholder="Votre email" />
                            <small id="emailHelp" className="form-text text-muted">Nous ne partagerons jamais votre mail avec des tiers.</small>
                            {submitted && !userForm.email &&
                            <div className="invalid-feedback">Le champ Email doit être renseigné</div>
                            }
                            {submitted && !mailValidate &&
                            <div className="invalid-feedback">Votre Email doit être un mail universitaire</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Votre classe</label>
                            <select className={'form-control' + (submitted && !user.id_classe ? ' is-invalid' : '')} id="selectClasseId" name="id_classe" defaultValue={"none"} onChange={handleChangeSelect}>
                                <option value="none" disabled hidden></option>
                                {classes.items && classes.items.map((classe, index) =>
                                    <option key={classe.code} value={classe.id+''}>{classe.code}</option>
                                )}
                            </select>
                            {submitted && !userForm.id_classe &&
                            <div className="invalid-feedback">Merci d'indiquer votre classe</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Numéro étudiant</label>
                            <input type="text" name="numEtud" value={user.numEtud} onChange={handleChange} className={'form-control' + (submitted && !userForm.numEtud ? ' is-invalid' : '')} placeholder="Numéro étudiant" />
                            {submitted && !userForm.numEtud &&
                            <div className="invalid-feedback">Numéro étudiant</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Valider
                            </button>
                            <Link to="/login" className="btn btn-link">Annuler</Link>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
}

export { MonProfil };
