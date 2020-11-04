import React, {useEffect, useState} from "react";
import {signalementActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

function ManageSignalements() {

    const user = useSelector(state => state.authentication.user);
    const signalements = useSelector(state => state.signalements);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signalementActions.getAll());
    }, []);

    return(
        <div className="row">
            <div className="col-12">
                <h1>Vos Signalements :</h1>
                <hr/>
                {signalements.loading && <em>Chargement...</em>}
                {signalements.error && <span className="text-danger">ERROR: {signalements.error}</span>}
                {signalements.items &&
                    <table className="table">
                        <thead className={"thead-dark"}>
                        <tr>
                            <th scope="col">Date Début</th>
                            <th scope="col">Code</th>
                            <th scope="col">Nom de l'élève</th>
                            <th scope="col">Actif</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {signalements.items.map((signalement, index) =>
                            <tr key={signalement.id}>
                                <td>{new Date(signalement.dateDebut).toLocaleDateString()}</td>
                                <td>{new Date(signalement.dateFin).toLocaleDateString()}</td>
                                <td>{signalement.User.firstName} {signalement.User.lastName}</td>
                                <td>Non</td>
                                <td><Link to={{pathname: `/dashboard/classe/edit/${signalement.id}`}} className="btn btn-primary">Modifier</Link></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export { ManageSignalements }
