import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://backend.nessefy.com:5223/api', // <-- change to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
