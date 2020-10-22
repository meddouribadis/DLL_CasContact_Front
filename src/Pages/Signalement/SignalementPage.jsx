import React, {useEffect, useState} from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signalementActions } from "../../_actions";

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

function MesSignalements(){
    const user = useSelector(state => state.authentication.user);
    const signalements = useSelector(state => state.signalements);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signalementActions.getByUserId(user.id));
    }, []);

    return(
        <div className="row">
            <div className="col-12">
                <h1>Mes signalements</h1>
                <hr/>
                {signalements.loading && <em>Chargement...</em>}
                {signalements.error && <span className="text-danger">ERROR: {signalements.error}</span>}
                {signalements.items &&
                <table className="table">
                    <thead className={"thead-dark"}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date de Début</th>
                        <th scope="col">Date de Fin</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {signalements.items.map((signalement, index) =>
                        <tr key={signalement.id}>
                            <th scope="row">{signalement.id}</th>
                            <td>{new Date(signalement.dateDebut).toLocaleDateString()}</td>
                            <td>{new Date(signalement.dateFin).toLocaleDateString()}</td>
                            <td>{signalement.isCasContact ? <p className={"btn btn-warning"}>Cas Contact</p> : <p className={"btn btn-danger"}>Infection</p>}</td>
                            <td><Link to={{pathname: `/dashboard/classe/edit/${signalement.id}`}} className="btn btn-primary">Voir</Link></td>
                        </tr>
                    )}
                    </tbody>

                </table>
                }
            </div>
        </div>
    )


}

export { SignalementInfectionPage, MesSignalements };