import { classeConstants } from '../_constants';

export function classes(state = {}, action) {
    switch (action.type) {
        case classeConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case classeConstants.GETALL_SUCCESS:
            return {
                items: action.classes
            };
        case classeConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case classeConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case classeConstants.GETBYID_SUCCESS:
            return {
                currentCourse: action.classe
            };
        case classeConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };

        case classeConstants.POST_CATEGORY_REQUEST:
            return {
                categoryCreation: true
            };
        case classeConstants.POST_CATEGORY_SUCCESS:
            return {};
        case classeConstants.POST_CATEGORY_FAILURE:
            return {
                error: action.error
            };

        case classeConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(classe =>
                    classe.id === action.id
                        ? { ...classe, deleting: true }
                        : classe
                )
            };
        case classeConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(classe => classe.id !== classe.id)
            };
        case classeConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(classe => {
                    if (classe.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = classe;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return classe;
                })
            };
        default:
            return state
    }
}
