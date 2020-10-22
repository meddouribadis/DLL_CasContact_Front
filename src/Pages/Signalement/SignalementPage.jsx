import React, {useEffect, useState} from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signalementActions, userActions } from "../../_actions";

function SignalementInfectionPage() {

    const [submitted, setSubmitted] = useState(false);
    const signalementCreation = useSelector(state => state.signalements.signalementCreation);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [signalement, setSignalement] = useState({
        dateDebut: undefined,
        dateFin: undefined,
        isCasContact: false,
        id_user: '',
    });

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setSignalement(signalement => ({ ...signalement, [name]: value }));
    }

    function handleInfectionDateChange(e) {
        const target = e.target;
        const dateInfection = new Date(target.value);

        signalement.dateDebut = target.value;
        signalement.dateFin = addDays(dateInfection, 14).toISOString().split('T')[0];

        console.log(signalement);
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function handleSubmit(e) {
        e.preventDefault();

        signalement.id_user = user.id+"";
        setSubmitted(true);

        if (signalement.dateDebut && signalement.dateFin && signalement.id_user && signalement.isCasContact !== null) {
            dispatch(signalementActions.postSignalement(signalement));
        }
    }

    return (
        <div className="row">

            <div className="col-12">
                <h1>Signaler mon infection</h1>
                <hr/>
            </div>

            <div className="col-12">
                <form name="form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Votre nom de famille</label>
                        <input type="text" name="lastName" disabled value={user.lastName} className={'form-control'} />
                    </div>
                    <div className="form-group">
                        <label>Votre prénom</label>
                        <input type="text" name="firstName" value={user.firstName} disabled className={'form-control'} />
                    </div>

                    <div className="form-group">
                        <label>Date de votre infection</label>
                        <input type="date" name="dateDebut" value={signalement.dateDebut} onChange={handleInfectionDateChange} className={'form-control' + (submitted && !signalement.dateDebut ? ' is-invalid' : '')} placeholder="Date de votre infection" />
                        {submitted && !signalement.dateDebut &&
                        <div className="invalid-feedback">La date d'infection est requise</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">
                            {signalementCreation && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Valider
                        </button>
                        <Link to="/" className="btn btn-link">Annuler</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}

export { SignalementInfectionPage };