import axios from "axios";

const AxiosBaseConfig = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_BACKEND_URL
});

export default AxiosBaseConfig;