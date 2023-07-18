import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 200000,
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return console.log(error);
  }
);

export default instance;
