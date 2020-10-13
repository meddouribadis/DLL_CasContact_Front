import React, {useEffect, useState} from "react";
import {categoryActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function CreateClasse() {

    return (
        <div className="row">
            <p>CreateClassePage</p>
        </div>
    );
}

function ManageClasses() {

    return (
        <div className="row">
            <p>ManageClassePage</p>
        </div>
    );
}

export {CreateClasse,ManageClasses};
