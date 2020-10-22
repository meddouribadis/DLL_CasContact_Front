import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { SignalementInfectionPage } from "./SignalementPage";

function SignalementRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={SignalementInfectionPage} />
            <Route exact path={`${path}/infection`} component={SignalementInfectionPage} />
            <Route path={`${path}/cascontact`} component={SignalementInfectionPage} />
        </Switch>
    );
}

export { SignalementRouter };