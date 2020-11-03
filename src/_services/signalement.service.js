import config from 'config';
import { authHeader } from '../_helpers';

export const signalementService = {
    getAll,
    getAllActive,
    getById,
    getByUserId,
    postSignalement,
    putSignalement,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/signalements`, requestOptions).then(handleResponse);
}

function getAllActive() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/signalements/allActive`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/signalements/${id}`, requestOptions).then(handleResponse);
}

function getByUserId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/signalements/byUser/${id}`, requestOptions).then(handleResponse);
}

function postSignalement(signalement) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(signalement)
    };

    return fetch(`${config.apiUrl}/signalements`, requestOptions).then(handleResponse);
}

function putSignalement(signalement, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(signalement)
    };

    return fetch(`${config.apiUrl}/signalements/${id}`, requestOptions).then(handleResponse);
}

function update(signalement) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(signalement)
    };

    return fetch(`${config.apiUrl}/signalement/${signalement.id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/signalements/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
