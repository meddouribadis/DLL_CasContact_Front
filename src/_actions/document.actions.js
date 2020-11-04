import { documentConstants } from '../_constants';
import { documentService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const documentActions = {
    getDocTypes,
    postDocument,
    delete: _delete
};

function postDocument(document, documentData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request(document));

            documentService.postDocument(document, documentData)
                .then(
                    document => {
                        resolve(dispatch(success(document)));
                        dispatch(alertActions.success('Document posté avec succès'));
                    },
                    error => {
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                );
        });
    };

    function request(document) { return { type: documentConstants.POST_DOC_REQUEST, document } }
    function success(document) { return { type: documentConstants.POST_DOC_SUCCESS, document } }
    function failure(error) { return { type: documentConstants.POST_DOC_FAILURE, error } }
}

function getDocTypes() {
    return dispatch => {
        dispatch(request());

        documentService.getDocTypes()
            .then(
                docTypes => dispatch(success(docTypes)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: documentConstants.GET_DOC_TYPE_REQUEST } }
    function success(docTypes) { return { type: documentConstants.GET_DOC_TYPE_SUCCESS, docTypes } }
    function failure(error) { return { type: documentConstants.GET_DOC_TYPE_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request(id));

            documentService.delete(id)
                .then(
                    id => resolve(dispatch(success(id))),
                    error => reject(dispatch(failure(id, error.toString()))),
                );
        });
    };

    function request(id) { return { type: documentConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: documentConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: documentConstants.DELETE_FAILURE, id, error } }
}
