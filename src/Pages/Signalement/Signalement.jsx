import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import {MesSignalements, SignalementCasPage, SignalementInfectionPage} from "./SignalementPage";

function SignalementRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={MesSignalements} />
            <Route exact path={`${path}/infection`} component={SignalementInfectionPage} />
            <Route path={`${path}/cas-contact`} component={SignalementCasPage} />
        </Switch>
    );
}

export { SignalementRouter };
