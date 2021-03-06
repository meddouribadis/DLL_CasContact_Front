import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions, classeActions } from '../../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        numEtud: '',
        email: '',
        password: '',
        id_classe: ''
    });
    const classes = useSelector(state => state.classes);
    const [submitted, setSubmitted] = useState(false);
    const [mailValidate, setMailValidate] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
        dispatch(classeActions.getAllWithoutUsers());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
        isValidEmail(user.email);
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
        user.id_classe = value;
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

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password && user.numEtud && user.email && user.id_classe && mailValidate) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>S'enregistrer</h2>
            <form name="form" className={"row g-3"} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Votre prénom</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange}
                           className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')}
                           placeholder="Votre prénom"/>
                    {submitted && !user.firstName &&
                    <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Votre nom de famille</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange}
                           className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')}
                           placeholder="Votre nom"/>
                    {submitted && !user.lastName &&
                    <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} placeholder="Nom d'utilisateur" />
                    {submitted && !user.username &&
                    <div className="invalid-feedback">Le champ utilisateur doit être renseigné</div>
                    }
                </div>
                <div className="form-group">
                    <label>eMail</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && (!user.email || !mailValidate) ? ' is-invalid' : '')} aria-describedby="emailHelp" placeholder="Votre email" />
                    <small id="emailHelp" className="form-text text-muted">Nous ne partagerons jamais votre mail avec des tiers.</small>
                    {submitted && !user.email &&
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
                    {submitted && !user.id_classe &&
                    <div className="invalid-feedback">Merci d'indiquer votre classe</div>
                    }
                </div>
                <div className="form-group">
                    <label>Numéro étudiant</label>
                    <input type="text" name="numEtud" value={user.numEtud} onChange={handleChange} className={'form-control' + (submitted && !user.numEtud ? ' is-invalid' : '')} placeholder="Numéro étudiant" />
                    {submitted && !user.numEtud &&
                    <div className="invalid-feedback">Numéro étudiant</div>
                    }
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} placeholder="Mot de passe"/>
                    {submitted && !user.password &&
                    <div className="invalid-feedback">Password is required</div>
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
    );
}

export { RegisterPage };
