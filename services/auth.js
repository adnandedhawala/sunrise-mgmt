import { getApiUrl } from "../utils/api";
import { clearAuthToken, getApplicationJsonHeader } from "../utils/authUtils";
import { handleResponse } from "../utils/handleResponse";

export const login = loginInfo => {
    return fetch(getApiUrl("login"), {
        method: "POST",
        headers: {
            ...getApplicationJsonHeader()
        },
        body: JSON.stringify({ data: loginInfo })
    }).then(handleResponse);
};

export const verifyUser = token => {
    return fetch(getApiUrl("verify"), {
        method: "POST",
        headers: {
            ...getApplicationJsonHeader()
        },
        body: JSON.stringify({ data: {token} })
    }).then(handleResponse);
};

export const logout = () => {
    clearAuthToken();
};