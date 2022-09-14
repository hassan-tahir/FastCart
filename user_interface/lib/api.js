import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});
const linstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true
});

export default instance;
export { linstance };
