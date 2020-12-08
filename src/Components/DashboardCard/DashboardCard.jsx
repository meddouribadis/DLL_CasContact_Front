import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function DashCard(props) {
    return (
            <div className={`card ${ props.className }`}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    {props.children}
                </div>
            </div>
    );
}

export { DashCard };