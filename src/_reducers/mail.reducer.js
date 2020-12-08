import { mailConstants } from '../_constants';

export function mails(state = {}, action) {
    switch (action.type) {
        case mailConstants.WELCOME_MAIL_REQUEST:
            return { sendWelcomeMail: true };
        case mailConstants.WELCOME_MAIL_SUCCESS:
            return {};
        case mailConstants.WELCOME_MAIL_FAILURE:
            return {};
        default:
            return state
    }
}