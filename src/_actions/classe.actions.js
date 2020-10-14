import { classeConstants } from '../_constants';
import { classeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const classeActions = {
    getAll,
    getById,
    postClasse,
    putClasse,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        classeService.getAll()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: classeConstants.GETALL_REQUEST } }
    function success(classes) { return { type: classeConstants.GETALL_SUCCESS, classes } }
    function failure(error) { return { type: classeConstants.GETALL_FAILURE, error } }
}

function getById(id) {

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            classeService.getById(id)
                .then(
                    classe => resolve(dispatch(success(classe))),
                    error => reject(dispatch(failure(error.toString())))
                );
        });
    };

    function request() { return { type: classeConstants.GETBYID_REQUEST } }
    function success(classe) { return { type: classeConstants.GETBYID_SUCCESS, classe } }
    function failure(error) { return { type: classeConstants.GETBYID_FAILURE, error } }
}

function postClasse(classe) {
    return dispatch => {
        dispatch(request(classe));

        classeService.postClasse(classe)
            .then(
                category => {
                    dispatch(success(category));
                    dispatch(alertActions.success('Classe crée avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(classe) { return { type: classeConstants.POST_CLASSE_REQUEST, classe } }
    function success(classe) { return { type: classeConstants.POST_CLASSE_SUCCESS, classe } }
    function failure(error) { return { type: classeConstants.POST_CLASSE_FAILURE, error } }
}

function putClasse(classe, id) {
    return dispatch => {
        dispatch(request(classe));

        classeService.putClasse(classe, id)
            .then(
                category => {
                    dispatch(success(category));
                    dispatch(alertActions.success('Classe mise à jour avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(classe) { return { type: classeConstants.PUT_CLASSE_REQUEST, classe } }
    function success(classe) { return { type: classeConstants.PUT_CLASSE_SUCCESS, classe } }
    function failure(error) { return { type: classeConstants.PUT_CLASSE_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        classeService.delete(id)
            .then(
                id => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: classeConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: classeConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: classeConstants.DELETE_FAILURE, id, error } }
}
