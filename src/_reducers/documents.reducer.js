import { documentConstants } from '../_constants';

export function documents(state = {}, action) {
    switch (action.type) {

        case documentConstants.POST_DOC_REQUEST:
            return {
                documentUpload: true
            };
        case documentConstants.POST_DOC_SUCCESS:
            return {
                uploadedDoc: action.document
            };
        case documentConstants.POST_DOC_FAILURE:
            return {
                error: action.error
            };

        case documentConstants.GET_DOC_TYPE_REQUEST:
            return {
                loading: true
            };
        case documentConstants.GET_DOC_TYPE_SUCCESS:
            return {
                docTypes: action.docTypes
            };
        case documentConstants.GET_DOC_TYPE_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
}
