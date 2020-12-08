import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function DashCard(props) {
    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export { DashCard };