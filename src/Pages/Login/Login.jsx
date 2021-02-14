import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-12 py-5 text-center">
                    <h3>Se connecter</h3>
                    <form className={"row g-3 mt-4"} name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="username" placeholder={"Nom d'utilisateur"} value={username}
                                   onChange={handleChange}
                                   className={'form-control' + (submitted && !username ? ' is-invalid' : '')}/>
                            {submitted && !username &&
                            <div className="invalid-feedback">Username is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder={"Mot de passe"} value={password}
                                   onChange={handleChange}
                                   className={'form-control' + (submitted && !password ? ' is-invalid' : '')}/>
                            {submitted && !password &&
                            <div className="invalid-feedback">Le mot de passe est requis</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Se connecter
                            </button>
                            <Link to="/register" className="btn btn-link">S'inscrire</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { LoginPage };
