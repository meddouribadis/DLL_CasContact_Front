import React, {useEffect, useState} from "react";
import {classeActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {history} from "../../_helpers";

function EditUser() {

    const dispatch = useDispatch();
    let { userId } = useParams();
    const users = useSelector(state => state.users);
    const classes = useSelector(state => state.classes);
    const [user, setUser] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(userActions.getById(userId)).then((data, err) => {
            setUser(data.user);
            console.log(data.user);
        });
        dispatch(classeActions.getAllWithoutUsers());
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
        user.id_classe = value;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.numEtud && user.email && user.id_classe) {
            dispatch(userActions.update(user));
        }
    }

    return (
        <div className="row">
            <div className="col">
                {(users.loading || classes.loading) && <em>Chargement...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {classes.error && <span className="text-danger">ERROR: {classes.error}</span>}
                {user !== null && classes.items &&
                    <form name="form" onSubmit={handleSubmit}>
                        <h1>Modifier un utilisateur : {user.firstName}</h1>
                        <hr/>

                        <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" name="firstName" value={user.firstName} onChange={handleChange}
                                   className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')}
                                   placeholder="Prénom"/>
                            {submitted && !user.firstName &&
                            <div className="invalid-feedback">Le nom de classe est requis</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" name="lastName" value={user.lastName} onChange={handleChange}
                                   className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')}
                                   placeholder="Nom de famille"/>
                            {submitted && !user.lastName &&
                            <div className="invalid-feedback">Le nom de famille est requis</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Adresse mail</label>
                            <input type="text" name="email" value={user.email} onChange={handleChange}
                                   className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')}
                                   placeholder="Nom de famille"/>
                            {submitted && !user.email &&
                            <div className="invalid-feedback">L'email est requis</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Numéro étudiant</label>
                            <input type="text" name="email" value={user.numEtud} onChange={handleChange}
                                   className={'form-control' + (submitted && !user.numEtud ? ' is-invalid' : '')}
                                   placeholder="Nom de famille"/>
                            {submitted && !user.numEtud &&
                            <div className="invalid-feedback">Le numéro étudiant est requis</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input type="text" name="username" value={user.username} onChange={handleChange}
                                   className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')}
                                   placeholder="Nom de famille"/>
                            {submitted && !user.username &&
                            <div className="invalid-feedback">Le nom d'utilisateur est requis</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Votre classe</label>
                            <select className={'form-control' + (submitted && !user.id_classe ? ' is-invalid' : '')} id="selectClasseId" name="id_classe" defaultValue={user.id_classe+""} onChange={handleChangeSelect}>
                                <option value="none" disabled hidden></option>
                                {classes.items && classes.items.map((classe, index) =>
                                    <option key={classe.code} value={classe.id+''}>{classe.code}</option>
                                )}
                            </select>
                            {submitted && !user.id_classe &&
                            <div className="invalid-feedback">Merci d'indiquer votre classe</div>
                            }
                        </div>

                        <br/>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                Valider
                            </button>
                            <button onClick={history.goBack} className="btn btn-link">Annuler</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export {EditUser};
