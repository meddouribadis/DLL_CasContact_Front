import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { MonProfil } from "./MyProfile";

function ProfileRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={MonProfil} />
        </Switch>
    );
}

export { ProfileRouter };