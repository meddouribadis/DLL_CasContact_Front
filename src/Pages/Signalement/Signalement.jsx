import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {MesSignalements, SignalementCasPage, SignalementInfectionPage, VoirSignalement} from "./SignalementPage";

function SignalementRouter() {

    let {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={MesSignalements}/>
            <Route exact path={`${path}/infection`} component={SignalementInfectionPage}/>
            <Route path={`${path}/cas-contact`} component={SignalementCasPage}/>
            <Route path={`${path}/view/:signalementId`} component={VoirSignalement}/>
        </Switch>
    );
}

export {SignalementRouter};
