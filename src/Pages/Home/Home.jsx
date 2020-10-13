import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../_helpers";
import { alertActions } from "../../_actions";
import { PrivateRoute } from "../../_components";

function HomePage() {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    return (
        <div className="main">
            <p>Home</p>
        </div>
    );
}

export { HomePage };
