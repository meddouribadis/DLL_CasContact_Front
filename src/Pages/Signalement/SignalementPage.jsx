import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SignalementPage() {

    let { path, url } = useRouteMatch();

    return (
        <div>
            <p>Salut</p>
        </div>
    );
}

export { SignalementPage };