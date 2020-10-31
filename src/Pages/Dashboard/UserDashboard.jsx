import React, {useEffect, useState} from "react";
import {classeActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

function EditUser() {

    const dispatch = useDispatch();
    let { userId } = useParams();
    const users = useSelector(state => state.users);
    const [user, setUser] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(userActions.getById(userId)).then((data, err) => {
            setUser(data.user);
            console.log(data.user);
        });
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (user.nom && user.code) {
            dispatch(userActions.putClasse(user, userId));
        }
    }

    return (
        <div className="row">
            <div className="col">
                {users.loading && <em>Chargement...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {user !== null &&
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
                            <div className="invalid-feedback">L'email est requis'</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Numéro étudiant</label>
                            <input type="text" name="email" value={user.numEtud} onChange={handleChange}
                                   className={'form-control' + (submitted && !user.numEtud ? ' is-invalid' : '')}
                                   placeholder="Nom de famille"/>
                            {submitted && !user.numEtud &&
                            <div className="invalid-feedback">L'email est requis'</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Numéro étudiant</label>
                            <input type="text" name="email" value={user.numEtud} onChange={handleChange}
                                   className={'form-control' + (submitted && !user.numEtud ? ' is-invalid' : '')}
                                   placeholder="Nom de famille"/>
                            {submitted && !user.numEtud &&
                            <div className="invalid-feedback">L'email est requis'</div>
                            }
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export {EditUser};
