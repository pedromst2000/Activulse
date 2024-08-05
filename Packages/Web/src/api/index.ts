import axios, { AxiosInstance } from "axios";
import apiConfig from "../config/api.config";

const api: AxiosInstance = axios.create(apiConfig);

export default api;
