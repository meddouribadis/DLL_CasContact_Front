import React, {useEffect, useState} from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signalementActions, userActions } from "../../_actions";

function SignalementInfectionPage() {

    const [submitted, setSubmitted] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [signalement, setSignalement] = useState({
        dateDebut: '',
        dateFin: '',
        id_user: '',
        isCasContact: false
    });

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setSignalement(signalement => ({ ...signalement, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (signalement.dateDebut && signalement.dateFin && signalement.id_user) {
            dispatch(signalementActions.postSignalement(signalement));
        }
    }

    return (
        <div className="row">
            <h1>Signaler mon infection</h1>
                <hr/>

        </div>
    );
}

export { SignalementInfectionPage };