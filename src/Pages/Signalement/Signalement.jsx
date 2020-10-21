import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {SignalementPage} from "./SignalementPage";

function SignalementRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={SignalementPage} />
            <Route exact path={`${path}/infection`} component={SignalementPage} />
            <Route path={`${path}/cascontact`} component={SignalementPage} />
        </Switch>
    );
}

export { SignalementRouter };