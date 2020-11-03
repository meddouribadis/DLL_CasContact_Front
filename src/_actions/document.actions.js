import { documentConstants } from '../_constants';
import { documentService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const documentActions = {
    getDocTypes,
    postDocument,
    delete: _delete
};

function postDocument(document, signalementId) {
    return dispatch => {
        dispatch(request(document));

        documentService.postDocument(document, signalementId)
            .then(
                document => {
                    dispatch(success(document));
                    dispatch(alertActions.success('Document posté avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
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
    // TO DO
}
