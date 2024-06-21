import axios from "axios";

function HttpService() {

    async function get(url: string, id?: number) {
        try {
            url = id ? `${url}/${id}` : url;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async function post(url: string, data: any) {
        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async function put(url: string, id: number, data: any) {
        try {
            url = id ? `${url}/${id}` : url;
            const response = await axios.put(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async function remove(url: string, id?: number) {
        try {
            url = id ? `${url}/${id}` : url;
            const response = await axios.delete(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return {get, post, put, remove};
}

export default HttpService();