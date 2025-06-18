import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-domain.com/api', // <-- change to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
