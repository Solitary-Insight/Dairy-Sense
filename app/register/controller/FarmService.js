import api from '../../../lib/Utils/ApiService';
import { API_FARM_ENDPOINT } from '../../../lib/Constants/App/API_ENDPOINTS';

export class FarmService {
  constructor() {
    this.api = api;
    this.API_FARM_ENDPOINT = API_FARM_ENDPOINT;
  }

  createFarm = async (farmData) => {
    const res = await this.api.post(`${this.API_FARM_ENDPOINT}/register-stage-1`, farmData);
    return res.data;
  };

  getAllFarmsWithOwners = async () => {
    const res = await this.api.get(`${this.API_FARM_ENDPOINT}/all-farms-with-owners`);
    return res.data;
  };

  getFarmById = async (farmId) => {
    const res = await this.api.get(`${this.API_FARM_ENDPOINT}/${farmId}`);
    return res.data;
  };

  updateFarm = async (farmId, updatedData) => {
    console.log('FARM ID TO UPDATE: ', farmId);
    const res = await this.api.put(`${this.API_FARM_ENDPOINT}/update?farmId=${farmId}`, updatedData);
    return res.data;
  };

  deleteFarm = async (farmId) => {
    const res = await this.api.delete(`${this.API_FARM_ENDPOINT}/delete/${farmId}`);
    return res.data;
  };


  // INFO Updates Farm Status 
  updateFarmStatus = async ({ farm_id, setup_status }) => {
    const res = await this.api.put(`${this.API_FARM_ENDPOINT}/update_status?farm_id=${farm_id}`, { setup_status });
    return res.data;
  };

  // //INFO EXPORT FARMS DATA JSON 
  // exportFarmsData = async ({ farms_data }) => {
  //   const res = await this.api.post(`${this.API_FARM_ENDPOINT}/export/`, { farms_data });
  //   return res.data;
  // };
}
