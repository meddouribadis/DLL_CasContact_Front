import React, {useEffect, useState} from "react";
import {documentActions, signalementActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import config from 'config';
import {history} from "../../_helpers";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function ManageSignalements() {

    const user = useSelector(state => state.authentication.user);
    const signalements = useSelector(state => state.signalements);
    const dispatch = useDispatch();

    // Table
    const columns = [
        {
            dataField: 'dateDebut',
            text: 'Date début',
            sort: true
        }, {
            dataField: 'dateFin',
            text: 'Date fin',
            sort: true
        }, {
            dataField: 'User.lastName',
            text: 'Nom de l\'élève',
            sort: true
        }, {
            text: "Action",
            dataField: "",
            formatter: GetActionFormat,
        }
    ];
    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(signalementActions.getAll());
    }, []);

    function GetActionFormat(cell, row) {
        return (
            <div>
                <Link to={{pathname: `/dashboard/signalement/edit/${row.id}`}} className="btn btn-outline-primary btn-sm ts-buttom" size="sm">
                    Voir
                </Link>
            </div>
        );
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Vos Signalements :</h1>
                    <hr/>
                    {signalements.loading && <em>Chargement...</em>}
                    {signalements.error && <span className="text-danger">ERROR: {signalements.error}</span>}
                    {signalements.items &&
                    <ToolkitProvider
                        keyField="id"
                        data={ signalements.items }
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
                <div className="col-12 mt-3">
                    <button onClick={history.goBack} className="btn btn-primary">Retour</button>
                </div>

            </div>
        </div>
    )
}

function EditSignalement() {
    let { signalementId } = useParams();
    const dispatch = useDispatch();

    //Stores
    const user = useSelector(state => state.authentication.user);
    const documents = useSelector(state => state.documents);

    // Hooks
    const [submitted, setSubmitted] = useState(false);
    const [signalement, setSignalement] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [documentData, setDocumentData] = useState({
        user_id: '',
        signalement_id: '',
        type_id: '',
    });

    useEffect(() => {
        dispatch(documentActions.getDocTypes());
        dispatch(signalementActions.getById(signalementId)).then((data, err) => {
            setSignalement(data.signalement);
        });
    }, []);

    function selectFile(e) {
        const target = e.target;
        setSelectedFiles(target.files);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let currentFile = selectedFiles[0];
        setCurrentFile(currentFile);

        setSubmitted(true);
        if (selectedFiles && documentData.user_id && documentData.type_id && documentData.signalement_id) {
            dispatch(documentActions.postDocument(currentFile, documentData)).then((data, err) => {
                dispatch(signalementActions.getById(signalementId)).then((data, err) => {
                    setSignalement(data.signalement);
                });
            });
            setSelectedFiles(undefined);
        }
    }

    function handleDelete(id){
        if (id) {
            dispatch(documentActions.delete(id)).then((data, err) => {
                dispatch(signalementActions.getById(signalementId)).then((data, err) => {
                    setSignalement(data.signalement);
                });
            });
        }
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
        documentData.type_id = value;
        documentData.signalement_id = signalement.id+'';
        documentData.user_id = user.id+'';
    }

    return (
        <div className="container">
            <div className="row">
                {signalement === null && <em>Chargement...</em>}
                {signalement !== null &&
                <div className="col-12">
                    <h1>Signalement #{signalement.id}</h1>
                    <hr/>
                    <div className="card">
                        <div className="card-header">
                            Signalement #{signalement.id} - {signalement.User.firstName} {signalement.User.lastName}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Du {new Date(signalement.dateDebut).toLocaleDateString()} au {new Date(signalement.dateFin).toLocaleDateString()}</h5>
                            <p>{signalement.User.firstName} {signalement.User.lastName} - {signalement.User.numEtud}</p>
                            <p><a href={`mailto:${signalement.User.email}`}>{signalement.User.email}</a></p>
                            {signalement.isCasContact ? <p className={"btn btn-warning"}>Cas Contact</p> : <p className={"btn btn-danger"}>Infection</p>}
                            {signalement.Documents.length === 0 &&
                            [
                                <h6>Documents :</h6>,
                                <p>Aucun document n'est associé à ce signalement</p>
                            ]
                            }
                            {signalement.Documents.length > 0 &&
                            <div>
                                <h6>Documents :</h6>
                                <ul className="list-group">
                                    {signalement.Documents && signalement.Documents.map((document, index) =>
                                        <li key={document.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {document.Ref_Doc_Type.nom} - {document.filename}
                                            <button className="btn badge btn-danger badge-danger badge-pill"
                                                    onClick={() => handleDelete(document.id)}>Supprimer
                                            </button>
                                            <a href={`${config.apiUrl}/documents/files/${document.filename}`}
                                               className="badge badge-primary badge-pill" target="_blank">Voir</a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            }
                            <hr/>
                            <p className="card-text">Vous pouvez effectuer ces actions :</p>
                            <p>
                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#uploadDocs" aria-expanded="false"
                                        aria-controls="uploadDocs">
                                    Uploader des documents
                                </button>
                            </p>
                            <div className="collapse" id="uploadDocs">
                                <div className="card card-body">
                                    <h6>Envoyer un justificatif :</h6>
                                    {documents.docTypes &&
                                    <form name="form" className={"row g-3"} onSubmit={handleSubmit}>

                                        <div className="input-group">
                                            <div>
                                                <input type="file" onChange={selectFile} className="form-control"
                                                       id="inputGroupFile01"
                                                       aria-describedby="inputGroupFileAddon01"/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="form-group">
                                            <label>Type de fichier</label>
                                            <select className={'form-control' + (submitted && !documentData.type_id ? ' is-invalid' : '')} id="selectClasseId" name="id_classe" defaultValue={"none"} onChange={handleChangeSelect}>
                                                <option value="none" disabled hidden></option>
                                                {documents.docTypes && documents.docTypes.map((docType, index) =>
                                                    <option key={docType.id} value={docType.id+''}>{docType.nom}</option>
                                                )}
                                            </select>
                                            {submitted && !documentData.type_id &&
                                            <div className="invalid-feedback">Merci de préciser le type de document</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <button disabled={!selectedFiles} className="btn btn-primary">
                                                Valider
                                            </button>
                                        </div>
                                    </form>
                                    }
                                </div>
                            </div>
                            <button onClick={history.goBack} className="btn btn-link">Annuler</button>
                        </div>
                    </div>
                </div>
                }

            </div>
        </div>
    );
}

export { ManageSignalements, EditSignalement }
