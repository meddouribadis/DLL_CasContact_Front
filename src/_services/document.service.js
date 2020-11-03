import config from 'config';
import { authHeader } from '../_helpers';

export const documentService = {
    getDocTypes,
    postDocument,
    delete: _delete
};

function getDocTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/documents/types`, requestOptions).then(handleResponse);
}

function postDocument(document, documentData) {

    const formData = new FormData();
    formData.append('file', document);
    formData.append('UserId', documentData.user_id);
    formData.append('SignalementId', documentData.signalement_id);
    formData.append('RefDocTypeId', documentData.type_id);

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: formData
    };

    return fetch(`${config.apiUrl}/documents/upload`, requestOptions).then(handleResponse);
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
