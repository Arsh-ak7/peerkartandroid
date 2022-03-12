import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://peerkart-be.herokuapp.com',
});

export default axiosInstance;
