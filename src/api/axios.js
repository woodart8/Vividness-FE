import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.vividness.co/api/v1',
  // baseURL: 'http://localhost:5000/api/v1',
})

export default apiClient;