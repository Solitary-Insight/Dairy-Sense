


import api from '../../lib/Utils/ApiService.js'
import { API_DEMO_ENDPOINT } from '../../lib/Constants/App/API_ENDPOINTS.js'

export class DemoService {
    constructor() {
        this.api = api
        this.API_DEMO_ENDPOINT = API_DEMO_ENDPOINT
    }



    createDemo = async (demodata) => {
        const res = await api.post(`${API_DEMO_ENDPOINT}/create`, demodata);
        return res.data;
    };

    getAllDemos = async () => {
        const res = await api.get(`${API_DEMO_ENDPOINT}/all`);
        return res.data;
    };
    getDemoById = async (demoId) => {
        const res = await api.get(`${API_DEMO_ENDPOINT}/${demoId}`);
        return res.data;
    };
    updateDemo = async (demoId, updatedData) => {
        console.log('FARM ID TO UPDATE: ', demoId)
        const res = await api.put(`${API_DEMO_ENDPOINT}/update?demoId=${demoId}`, updatedData);
        return res.data;
    };
    deleteDemo = async (demoId) => {
        const res = await api.delete(`${API_DEMO_ENDPOINT}/delete/${demoId}`);
        return res.data;
    }
}