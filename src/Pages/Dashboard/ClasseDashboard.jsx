import React, {useEffect, useState} from "react";
import {classeActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

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
            <div className="col-12">
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
                            <td><Link to={{pathname: `/dashboard/classe/edit/${classe.id}`}} className="btn btn-primary">Modifier</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}

function EditClasse() {

    const user = useSelector(state => state.authentication.user);
    const classes = useSelector(state => state.classes);
    const dispatch = useDispatch();
    let { classeId } = useParams();

    const [classe, setClasse] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(classeActions.getById(classeId)).then((data, err) => {
            setClasse(data.classe);
        });
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setClasse(classe => ({ ...classe, [name]: value }));
        console.log(classe);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (classe.nom && classe.code) {
            dispatch(classeActions.putClasse(classe, classeId));
        }
    }

    return (
        <div className="row">
            <div className="col">
                {classes.loading && <em>Chargement...</em>}
                {classes.error && <span className="text-danger">ERROR: {classes.error}</span>}
                {classe !== null &&
                    <form name="form" onSubmit={handleSubmit}>
                        <h1>Modifier la classe : {classe.nom}</h1>
                        <hr/>

                        <div className="form-group">
                            <label>Nom de la classe</label>
                            <input type="text" name="nom" value={classe.nom} onChange={handleChange}
                                   className={'form-control' + (submitted && !classe.nom ? ' is-invalid' : '')}
                                   placeholder="Nom de la classe"/>
                            {submitted && !classe.nom &&
                            <div className="invalid-feedback">Le nom de classe est requis</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Code de la classe</label>
                            <input type="text" name="code" value={classe.code} onChange={handleChange}
                                   className={'form-control' + (submitted && !classe.code ? ' is-invalid' : '')}
                                   placeholder="Nom de la classe"/>
                            {submitted && !classe.code &&
                            <div className="invalid-feedback">Le code de classe est requis</div>
                            }
                        </div>

                        <br/>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                Valider
                            </button>
                            <Link to="/dashboard/classe/manage" className="btn btn-link">Annuler</Link>
                        </div>
                    </form>
                }
                {classe !== null &&
                    <div className="list_students">
                        <h2>Liste des élèves de cette classe</h2>
                        <table className="table">
                            <thead className={"thead-dark"}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Code</th>
                                <th scope="col">Numéro Etudiant</th>
                                <th scope="col">Infection</th>
                                <th scope="col">Action</th>

                            </tr>
                            </thead>

                            <tbody>
                            {classe.students.map((student, index) =>
                                <tr>
                                    <th scope="row">{student.id}</th>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.numEtud}</td>
                                    <td style={{backgroundColor: '#64ea83'}}>Non</td>
                                    <td>
                                        <Link to={{pathname: `/dashboard/classe/edit/${student.id}`}} className="btn btn-primary">Modifier</Link>
                                        <Link to={{pathname: `/dashboard/classe/edit/${student.id}`}} className="btn btn-danger">Retirer</Link>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}


export {CreateClasse,ManageClasses, EditClasse};
