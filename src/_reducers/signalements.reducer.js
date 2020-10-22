import { signalementConstants } from '../_constants';

export function classes(state = {}, action) {
    switch (action.type) {
        case signalementConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case signalementConstants.GETALL_SUCCESS:
            return {
                items: action.classes
            };
        case signalementConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case signalementConstants.GETBYID_SUCCESS:
            return {
                currentCourse: action.classe
            };
        case signalementConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.POST_SIGNALEMENT_REQUEST:
            return {
                classeCreation: true
            };
        case signalementConstants.POST_SIGNALEMENT_SUCCESS:
            return {};
        case signalementConstants.POST_SIGNALEMENT_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.PUT_SIGNALEMENT_REQUEST:
            return {
                classeUpdate: true
            };
        case signalementConstants.PUT_SIGNALEMENT_SUCCESS:
            return {
                currentCourse: action.classe
            };
        case signalementConstants.PUT_SIGNALEMENT_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(classe =>
                    classe.id === action.id
                        ? { ...classe, deleting: true }
                        : classe
                )
            };
        case signalementConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(classe => classe.id !== classe.id)
            };
        case signalementConstants.DELETE_FAILURE:
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
