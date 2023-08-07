import Axios from 'axios'

export let BASE_URL = 'http://localhost:5000/api/v1';
export let APP_URL = 'http://68.178.162.203:8080/application-test-v1.1';


const apiCalls = async (endpoint, requestData, method, toast = null, token = null,) => {
    try {
        let url_endpoit = BASE_URL + endpoint
        const response = await Axios[method](url_endpoit, requestData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        const respData = response.data
        let message = respData?.message ? respData?.message : respData?.error?.message || respData?.error || respData?.msg
        let isSucces = respData.status ? "success" : "warning"
        toast[isSucces](message)
        return respData
    } catch (error) {
        console.error(error.message);
        toast.error(error.message)

    }
};

const GETAPI = async (endpoint, token) => {
    try {
        let url_endpoit = APP_URL + endpoint
        const response = await Axios.get(url_endpoit)
        // const respData = await response
        return response.data
    } catch (error) {
        console.error(error.message);
    }
};

export {
    apiCalls,
    GETAPI
}