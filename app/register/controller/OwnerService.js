import api from "../../../lib/Utils/ApiService";
import { API_OWNER_ENDPOINT } from "../../../lib/Constants/App/API_ENDPOINTS";

export class OwnerService {
  constructor() {
    this.api = api;
    this.API_OWNER_ENDPOINT = API_OWNER_ENDPOINT;
  }

  // Create a new owner
  createOwner = async (ownerData) => {
    const res = await this.api.post(`${this.API_OWNER_ENDPOINT}/register`, ownerData);
    return res.data;
  };

  // Get all owners
  getAllOwners = async () => {
    const res = await this.api.get(`${this.API_OWNER_ENDPOINT}/all`);
    return res.data;
  };

  // Get a specific owner by ID
  getOwnerById = async (ownerId) => {
    const res = await this.api.get(`${this.API_OWNER_ENDPOINT}/${ownerId}`);
    return res.data;
  };

  // Update owner by ID
  updateOwner = async (ownerId, updatedData) => {
    const res = await this.api.put(`${this.API_OWNER_ENDPOINT}/update/${ownerId}`, updatedData);
    return res.data;
  };

  // Delete owner by ID
  deleteOwner = async (ownerId) => {
    const res = await this.api.delete(`${this.API_OWNER_ENDPOINT}/delete/${ownerId}`);
    return res.data;
  };

  // Validate owner session via cookies
  validateCookies = async () => {
    const res = await this.api.post(`${this.API_OWNER_ENDPOINT}/validate`, {});
    return res;
  };

  // Email + Password based Signin
  signin = async (email, password) => {
    const res = await this.api.post(`${this.API_OWNER_ENDPOINT}/signin`,  email, password );
    return res.data;
  };

  // OTP validation
  validateOwnerOtp = async ({ otp }) => {
    const res = await this.api.post(`${this.API_OWNER_ENDPOINT}/validate-otp`, { otp });
    return res;
  };

  // forgot password
  forgetPassword = async ({ email }) => {
    const res = await this.api.post(`${this.API_OWNER_ENDPOINT}/forgot-password`, { email });
    return res;
  };



  // reset password
  resetPassword = async ({ token,password }) => {
    const res = await this.api.post(`${this.API_OWNER_ENDPOINT}/reset-password`, { token,password });
    return res;
  };

   
}
