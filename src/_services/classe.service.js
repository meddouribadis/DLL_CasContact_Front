import config from 'config';
import { authHeader } from '../_helpers';

export const classeService = {
    getAll,
    getAllWithoutUsers,
    getById,
    getByName,
    postClasse,
    putClasse,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/classes`, requestOptions).then(handleResponse);
}

function getAllWithoutUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/classes/list`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/classes/${id}`, requestOptions).then(handleResponse);
}

function getByName(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}//byName/${name}`, requestOptions).then(handleResponse);
}

function postClasse(classe) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(classe)
    };

    return fetch(`${config.apiUrl}/classes`, requestOptions).then(handleResponse);
}

function putClasse(classe, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(classe)
    };

    return fetch(`${config.apiUrl}/classes/${id}`, requestOptions).then(handleResponse);
}

function update(classe) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(classe)
    };

    return fetch(`${config.apiUrl}/classe/${classe.id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/classes/${id}`, requestOptions).then(handleResponse);
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
