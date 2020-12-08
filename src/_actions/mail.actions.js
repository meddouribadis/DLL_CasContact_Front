import {mailConstants} from '../_constants';
import {mailService} from '../_services';
import {alertActions } from './';
import {history} from '../_helpers';

export const mailActions = {
    sendWelcomeMail,
};

function sendWelcomeMail(to) {
    return dispatch => {
        dispatch(request({
            email: to
        }));

        mailService.sendWelcomeMail(to)
            .then(
                mail => dispatch(success(mail)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(mail) { return { type: mailConstants.WELCOME_MAIL_REQUEST, mail } }
    function success(mail) { return { type: mailConstants.WELCOME_MAIL_SUCCESS, mail } }
    function failure(error) { return { type: mailConstants.WELCOME_MAIL_FAILURE, error } }
}