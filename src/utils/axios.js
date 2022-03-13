import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://peerkart-be.herokuapp.com/api/v1',
});

export default axiosInstance;
