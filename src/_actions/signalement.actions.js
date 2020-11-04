import { signalementConstants } from '../_constants';
import { signalementService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const signalementActions = {
    getAll,
    getAllActive,
    getById,
    getByUserId,
    postSignalement,
    putSignalement,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        signalementService.getAll()
            .then(
                signalements => dispatch(success(signalements)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: signalementConstants.GETALL_REQUEST } }
    function success(signalements) { return { type: signalementConstants.GETALL_SUCCESS, signalements } }
    function failure(error) { return { type: signalementConstants.GETALL_FAILURE, error } }
}

function getAllActive() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            signalementService.getAllActive()
                .then(
                    signalements => resolve(dispatch(success(signalements))),
                    error => reject(dispatch(failure(error.toString())))
                );
        });
    };

    function request() { return { type: signalementConstants.GETALLACTIVE_REQUEST } }
    function success(signalements) { return { type: signalementConstants.GETALLACTIVE_SUCCESS, signalements } }
    function failure(error) { return { type: signalementConstants.GETALLACTIVE_FAILURE, error } }
}

function getById(id) {

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            signalementService.getById(id)
                .then(
                    signalement => resolve(dispatch(success(signalement))),
                    error => reject(dispatch(failure(error.toString())))
                );
        });
    };

    function request() { return { type: signalementConstants.GETBYID_REQUEST } }
    function success(signalement) { return { type: signalementConstants.GETBYID_SUCCESS, signalement } }
    function failure(error) { return { type: signalementConstants.GETBYID_FAILURE, error } }
}

function getByUserId(id) {

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            signalementService.getByUserId(id)
                .then(
                    signalements => resolve(dispatch(success(signalements))),
                    error => reject(dispatch(failure(error.toString())))
                );
        });
    };

    function request() { return { type: signalementConstants.GETBYUSERID_REQUEST } }
    function success(signalements) { return { type: signalementConstants.GETBYUSERID_SUCCESS, signalements } }
    function failure(error) { return { type: signalementConstants.GETBYUSERID_FAILURE, error } }
}

function postSignalement(signalement) {
    return dispatch => {
        dispatch(request(signalement));

        signalementService.postSignalement(signalement)
            .then(
                signalement => {
                    dispatch(success(signalement));
                    dispatch(alertActions.success('Signalement crée avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(signalement) { return { type: signalementConstants.POST_SIGNALEMENT_REQUEST, signalement } }
    function success(signalement) { return { type: signalementConstants.POST_SIGNALEMENT_SUCCESS, signalement } }
    function failure(error) { return { type: signalementConstants.POST_SIGNALEMENT_FAILURE, error } }
}

function putSignalement(signalement, id) {
    return dispatch => {
        dispatch(request(signalement));

        signalementService.putSignalement(signalement, id)
            .then(
                category => {
                    dispatch(success(category));
                    dispatch(alertActions.success('Signalement mise à jour avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(signalement) { return { type: signalementConstants.PUT_SIGNALEMENT_REQUEST, signalement } }
    function success(signalement) { return { type: signalementConstants.PUT_SIGNALEMENT_SUCCESS, signalement } }
    function failure(error) { return { type: signalementConstants.PUT_SIGNALEMENT_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        signalementService.delete(id)
            .then(
                id => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: signalementConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: signalementConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: signalementConstants.DELETE_FAILURE, id, error } }
}
