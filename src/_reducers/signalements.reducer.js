import { signalementConstants } from '../_constants';

export function signalements(state = {}, action) {
    switch (action.type) {
        case signalementConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case signalementConstants.GETALL_SUCCESS:
            return {
                items: action.signalements
            };
        case signalementConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.GETALLACTIVE_REQUEST:
            return {
                loading: true
            };
        case signalementConstants.GETALLACTIVE_SUCCESS:
            return {
                items: action.signalements
            };
        case signalementConstants.GETALLACTIVE_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.GETBYUSERID_REQUEST:
            return {
                loading: true
            };
        case signalementConstants.GETBYUSERID_SUCCESS:
            return {
                items: action.signalements
            };
        case signalementConstants.GETBYUSERID_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case signalementConstants.GETBYID_SUCCESS:
            return {
                currentSignalement: action.signalement
            };
        case signalementConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.POST_SIGNALEMENT_REQUEST:
            return {
                signalementCreation: true
            };
        case signalementConstants.POST_SIGNALEMENT_SUCCESS:
            return {};
        case signalementConstants.POST_SIGNALEMENT_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.PUT_SIGNALEMENT_REQUEST:
            return {
                signalementUpdate: true
            };
        case signalementConstants.PUT_SIGNALEMENT_SUCCESS:
            return {
                currentSignalement: action.signalement
            };
        case signalementConstants.PUT_SIGNALEMENT_FAILURE:
            return {
                error: action.error
            };

        case signalementConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(signalement =>
                    signalement.id === signalement.id
                        ? { ...signalement, deleting: true }
                        : signalement
                )
            };
        case signalementConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(signalement => signalement.id !== signalement.id)
            };
        case signalementConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(signalement => {
                    if (signalement.id === signalement.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = classe;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return signalement;
                })
            };
        default:
            return state
    }
}
