import React, {useEffect, useState} from "react";
import {classeActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function CreateClasse() {

    return (
        <div className="row">
            <p>CreateClassePage</p>
        </div>
    );
}

function ManageClasses() {

    const user = useSelector(state => state.authentication.user);
    const classes = useSelector(state => state.classes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(classeActions.getAll());
    }, []);

    return (
        <div className="row">
            <div className="col">
                <h1>Vos classes :</h1>
                <hr/>
                {classes.loading && <em>Chargement des classes...</em>}
                {classes.error && <span className="text-danger">ERROR: {classes.error}</span>}
                {classes.items &&
                <table className="table">
                    <thead className={"thead-dark"}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Code</th>
                        <th scope="col">Nombre d'élèves</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {classes.items.map((classe, index) =>
                        <tr>
                            <th scope="row">{classe.id}</th>
                            <td>{classe.nom}</td>
                            <td>{classe.code}</td>
                            <td>{classe.code}</td>
                            <td><Link to={{pathname: `/dashboard/course/edit/${classe.id}`}} className="btn btn-primary">Modifier</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}


export {CreateClasse,ManageClasses};
