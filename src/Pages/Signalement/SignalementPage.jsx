import React, {Fragment, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {documentActions, signalementActions} from "../../_actions";
import config from 'config';

// Etapes formulaires

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }

    return (
        <Fragment>
            <h3>Quelle est votre situation ?</h3>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Default radio
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                       checked/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Default checked radio
                </label>
            </div>
        </Fragment>
    )
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return (
        <Fragment>
            <div className="form-group">
                <label>Votre nom de famille</label>
                <input type="text" name="lastName" disabled value={props.user.lastName}
                       className={'form-control'}/>
            </div>
            <div className="form-group">
                <label>Votre prénom</label>
                <input type="text" name="firstName" value={props.user.firstName} disabled
                       className={'form-control'}/>
            </div>

            <div className="form-group">
                <label>Date de votre cas contact</label>
                <input type="date" name="dateDebut" value={props.signalement.dateDebut}
                       onChange={props.handleInfectionDateChange}
                       className={'form-control' + (props.submitted && !props.signalement.dateDebut ? ' is-invalid' : '')}
                       placeholder="Date de votre infection"/>
                {props.submitted && !props.signalement.dateDebut &&
                <div className="invalid-feedback">La date de cas contact est requise</div>
                }
            </div>

            <div className="form-group">
                <button className="btn btn-primary">
                    {props.signalementCreation && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Valider
                </button>
                <Link to="/" className="btn btn-link">Annuler</Link>
            </div>
        </Fragment>
    )
}

// Pages
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
        setSignalement(signalement => ({...signalement, [name]: value}));
    }

    function handleInfectionDateChange(e) {
        const target = e.target;
        const dateInfection = new Date(target.value);

        signalement.dateDebut = target.value;
        signalement.dateFin = addDays(dateInfection, 14).toISOString().split('T')[0];
    }

    function addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function handleSubmit(e) {
        e.preventDefault();

        signalement.id_user = user.id + "";
        setSubmitted(true);

        if (signalement.dateDebut && signalement.dateFin && signalement.id_user && signalement.isCasContact !== null) {
            dispatch(signalementActions.postSignalement(signalement));
        }
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-12">
                    <h1>Signaler mon infection</h1>
                    <hr/>
                </div>

                <div className="col-12">
                    <form name="form" className={"row g-3"} onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Votre nom de famille</label>
                            <input type="text" name="lastName" disabled value={user.lastName}
                                   className={'form-control'}/>
                        </div>
                        <div className="form-group">
                            <label>Votre prénom</label>
                            <input type="text" name="firstName" value={user.firstName} disabled
                                   className={'form-control'}/>
                        </div>

                        <div className="form-group">
                            <label>Date de votre infection</label>
                            <input type="date" name="dateDebut" value={signalement.dateDebut}
                                   onChange={handleInfectionDateChange}
                                   className={'form-control' + (submitted && !signalement.dateDebut ? ' is-invalid' : '')}
                                   placeholder="Date de votre infection"/>
                            {submitted && !signalement.dateDebut &&
                            <div className="invalid-feedback">La date d'infection est requise</div>
                            }
                        </div>

                        <div className="col-12">
                            <div className="form-group">
                                <button className="btn btn-primary">
                                    {signalementCreation &&
                                    <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Valider
                                </button>
                                <Link to="/" className="btn btn-link">Annuler</Link>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

function SignalementCasPage() {

    const [submitted, setSubmitted] = useState(false);
    const signalementCreation = useSelector(state => state.signalements.signalementCreation);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [currentStep, setCurrentStep] = useState(1);
    const [signalement, setSignalement] = useState({
        dateDebut: undefined,
        dateFin: undefined,
        isCasContact: true,
        id_user: '',
    });

    function _next() {
        let currentStepLocal = currentStep;
        currentStepLocal = currentStepLocal >= 2 ? 3 : currentStepLocal + 1
        setCurrentStep(currentStepLocal);
    }

    function _prev() {
        let currentStepLocal = currentStep;
        currentStepLocal = currentStepLocal <= 1 ? 1 : currentStepLocal - 1
        setCurrentStep(currentStepLocal);
    }

    function previousButton() {
        let currentStepLocal = currentStep;
        if (currentStepLocal !== 1) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={_prev}>
                    Précedent
                </button>
            )
        }
        return null;
    }

    function nextButton() {
        let currentStepLocal = currentStep;
        if (currentStepLocal < 3) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={_next}>
                    Suivant
                </button>
            )
        }
        return null;
    }

    function handleNextStep(e) {
        const value = e.target
        setCurrentStep(value);
    }

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setSignalement(signalement => ({...signalement, [name]: value}));
    }

    function handleInfectionDateChange(e) {
        const target = e.target;
        const dateInfection = new Date(target.value);

        signalement.dateDebut = target.value;
        signalement.dateFin = addDays(dateInfection, 14).toISOString().split('T')[0];
    }

    function addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function handleSubmit(e) {
        e.preventDefault();

        signalement.id_user = user.id + "";
        setSubmitted(true);

        if (signalement.dateDebut && signalement.dateFin && signalement.id_user && signalement.isCasContact !== null) {
            dispatch(signalementActions.postSignalement(signalement));
        }
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-12">
                    <h1>Signaler mon cas contact</h1>
                    <hr/>
                </div>

                <div className="col-12">
                    <form name="form" className={"row g-3"} onSubmit={handleSubmit}>
                        <Step1 submitted={submitted} signalementCreation={signalementCreation} user={user}
                               currentStep={currentStep} handleChange={handleChange} signalement={signalement}
                               handleInfectionDateChange={handleInfectionDateChange}/>
                        <Step2 submitted={submitted} signalementCreation={signalementCreation} user={user}
                               currentStep={currentStep} handleChange={handleChange} signalement={signalement}
                               handleInfectionDateChange={handleInfectionDateChange}/>

                        {previousButton()}
                        {nextButton()}
                    </form>
                </div>

            </div>
        </div>
    );
}

function MesSignalements() {
    const user = useSelector(state => state.authentication.user);
    const signalements = useSelector(state => state.signalements);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signalementActions.getByUserId(user.id));
    }, []);

    return (
        <div className="container">
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
                                <td>{signalement.isCasContact ? <p className={"btn btn-warning"}>Cas Contact</p> :
                                    <p className={"btn btn-danger"}>Infection</p>}</td>
                                <td><Link to={{pathname: `/signalement/view/${signalement.id}`}}
                                          className="btn btn-primary">Voir</Link></td>
                            </tr>
                        )}
                        </tbody>

                    </table>
                    }
                </div>
            </div>
        </div>
    )


}

function VoirSignalement() {

    let {signalementId} = useParams();
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

    function handleChangeSelect(e) {
        const {name, value} = e.target;
        documentData.type_id = value;
        documentData.signalement_id = signalement.id + '';
        documentData.user_id = user.id + '';
    }

    return (
        <div className="container">
            <div className="row">
                {signalement === null && <em>Chargement...</em>}
                {signalement !== null &&
                <div className="col-12">
                    <h1>Mon signalement</h1>
                    <hr/>
                    <div className="card">
                        <div className="card-header">
                            Signalement #{signalement.id}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Du {new Date(signalement.dateDebut).toLocaleDateString()} au {new Date(signalement.dateFin).toLocaleDateString()}</h5>
                            {signalement.isCasContact ? <p className={"btn btn-warning"}>Cas Contact</p> :
                                <p className={"btn btn-danger"}>Infection</p>}

                            {signalement.Documents.length > 0 &&
                            <div>
                                <h6>Documents :</h6>
                                <ul className="list-group">
                                    {signalement.Documents && signalement.Documents.map((document, index) =>
                                        <li key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center">
                                            {document.Ref_Doc_Type.nom} - {document.filename}
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
                                            <select
                                                className={'form-control' + (submitted && !documentData.type_id ? ' is-invalid' : '')}
                                                id="selectClasseId" name="id_classe" defaultValue={"none"}
                                                onChange={handleChangeSelect}>
                                                <option value="none" disabled hidden></option>
                                                {documents.docTypes && documents.docTypes.map((docType, index) =>
                                                    <option key={docType.id}
                                                            value={docType.id + ''}>{docType.nom}</option>
                                                )}
                                            </select>
                                            {submitted && !documentData.type_id &&
                                            <div className="invalid-feedback">Merci de préciser le type de
                                                document</div>
                                            }
                                        </div>

                                        <div className="col-12">
                                            <button disabled={!selectedFiles} className="btn btn-primary">
                                                Valider
                                            </button>
                                        </div>
                                    </form>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                }

            </div>
        </div>
    );
}

export {SignalementInfectionPage, SignalementCasPage, MesSignalements, VoirSignalement};
