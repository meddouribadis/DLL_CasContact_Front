import React from "react";

function CalendarModal(props) {

    return (
        <div className={'modal fade' + props.modalClass} id="exampleModal" tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true" style={props.modalStyle}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.event.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close" onClick={props.toggle}></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Nom : {props.event.title}</li>
                            <li className="list-group-item">Professeur : {props.event.extendedProps.prof}</li>
                            <li className="list-group-item">Salle : {props.event.extendedProps.location}</li>
                            <li className="list-group-item">Heure de début : {props.event.start.toLocaleString()}</li>
                            <li className="list-group-item">Heure de fin : {props.event.end.toLocaleString()}</li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button onClick={props.toggle} type="button" className="btn btn-primary"
                                data-bs-dismiss="modal">Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {CalendarModal};
