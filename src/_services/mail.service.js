import config from 'config';
import { authHeader } from '../_helpers';

export const mailService = {
    sendWelcomeMail,
    sendSignalementMail,
};

function sendWelcomeMail(to) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: to })
    };

    return fetch(`${config.apiUrl}/mail`, requestOptions)
        .then(handleResponse)
        .then(mail => {
            return mail;
        });
}

function sendSignalementMail(to) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: to })
    };

    return fetch(`${config.apiUrl}/mail/signalement`, requestOptions)
        .then(handleResponse)
        .then(mail => {
            return mail;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
