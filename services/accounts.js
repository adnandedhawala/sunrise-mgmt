import { getApiUrl } from "../utils/api";
import { getApplicationJsonHeader } from "../utils/authUtils";
import { handleResponse } from "../utils/handleResponse";

export const getReciepts = reciepts => {
    return fetch(getApiUrl("reciepts"), {
        method: "POST",
        headers: {
            ...getApplicationJsonHeader()
        },
        body: JSON.stringify({ data: {reciepts} })
    }).then(handleResponse);
};

export const getRecieptById = recieptId => {
    return fetch(getApiUrl("reciepts")+"?recieptId="+recieptId, {
        method: "GET",
        headers: {
            ...getApplicationJsonHeader()
        },
    }).then(handleResponse);
};