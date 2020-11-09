import React, {useEffect, useState} from "react";
import {classeActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {history} from "../../_helpers";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

function CreateClasse() {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [classe, setClasse] = useState({
        nom: '',
        code: ''
    });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setClasse(classe => ({ ...classe, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (classe.nom && classe.code) {
            dispatch(classeActions.postClasse(classe));
        }
    }

    return (
        <div className="row">
            <div className="col">
                <form name="form" onSubmit={handleSubmit}>
                    <h1>Créer une classe</h1>
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
                        <Link to="/dashboard/classes" className="btn btn-link">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ManageClasses() {

    const user = useSelector(state => state.authentication.user);
    const classes = useSelector(state => state.classes);
    const dispatch = useDispatch();

    // Table
    const columns = [
        {
            dataField: 'id',
            text: '#',
            sort: true
        }, {
            dataField: 'nom',
            text: 'Nom',
            sort: true
        }, {
            dataField: 'students.length',
            text: 'Nombre d\'élèves',
            sort: true
        }, {
            text: "Action",
            dataField: "",
            formatter: GetActionFormat,
        }
    ];
    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(classeActions.getAll());
    }, []);

    function GetActionFormat(cell, row) {
        return (
            <div>
                <Link to={{pathname: `/dashboard/classe/edit/${row.id}`}} className="btn btn-outline-primary btn-sm ts-buttom" size="sm">
                    Modifier
                </Link>
                <Link to={{pathname: `/dashboard/user/edit/${row.id}`}} className="btn btn-outline-danger btn-sm ml-2 ts-buttom" size="sm">
                    Supprimer
                </Link>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-12">
                <h1>Vos classes :</h1>
                <hr/>
                {classes.loading && <em>Chargement des classes...</em>}
                {classes.error && <span className="text-danger">ERROR: {classes.error}</span>}
                {classes.items &&
                    <ToolkitProvider
                        keyField="id"
                        data={ classes.items }
                        columns={ columns }
                        search
                    >
                        {
                            props => (
                                <div>
                                    <SearchBar { ...props.searchProps } />
                                    <BootstrapTable
                                        { ...props.baseProps }
                                        pagination={ paginationFactory() }
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                }
            </div>

            <div className="col-12">
                <Link to={{pathname: `/dashboard/classe/create`}} className="btn btn-success">Ajouter une classe</Link>
                <button onClick={history.goBack} className="btn btn-link">Retour</button>
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

    // Table
    const columns = [
        {
            dataField: 'id',
            text: '#',
            sort: true
        }, {
            dataField: 'firstName',
            text: 'Nom',
            sort: true
        }, {
            dataField: 'lastName',
            text: 'Prénom',
            sort: true
        }, {
            dataField: 'numEtud',
            text: 'Numéro Etudiant',
            sort: true
        }, {
            dataField: '',
            text: 'Infection',
            formatter: GetInfectedFormat,
        }, {
            text: "Action",
            dataField: "",
            formatter: GetActionFormat,
        }
    ];
    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(classeActions.getById(classeId)).then((data, err) => {
            setClasse(data.classe);
        });
    }, []);

    function GetActionFormat(cell, row) {
        return (
            <div>
                <Link to={{pathname: `/dashboard/user/edit/${row.id}`}} className="btn btn-outline-primary btn-sm ts-buttom" size="sm">
                    Modifier
                </Link>
                <Link to={{pathname: `/dashboard/user/edit/${row.id}`}} className="btn btn-outline-danger btn-sm ml-2 ts-buttom" size="sm">
                    Supprimer
                </Link>
            </div>
        );
    }

    function GetInfectedFormat(cell, row) {
        console.log(cell, row);
        return (
            <div style={row.signalements.length > 0 ? {backgroundColor: '#e53939'} : {backgroundColor: '#64ea83'}}>
               {row.signalements.length > 0 ? "Oui" : "Non"}
            </div>
        );
    }

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setClasse(classe => ({ ...classe, [name]: value }));
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
                            <Link to="/dashboard/classes" className="btn btn-link">Annuler</Link>
                        </div>
                    </form>
                }
                {classe !== null && classe.students.length > 0 &&
                    <div className="list_students">
                        <h2>Liste des élèves de cette classe</h2>
                        <ToolkitProvider
                            keyField="id"
                            data={ classe.students }
                            columns={ columns }
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <SearchBar { ...props.searchProps } />
                                        <BootstrapTable
                                            { ...props.baseProps }
                                            pagination={ paginationFactory() }
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>
                }
            </div>
        </div>
    );
}

export {CreateClasse, ManageClasses, EditClasse};
