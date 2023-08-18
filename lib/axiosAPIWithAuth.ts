import axios from "axios";
import { CookieKeys } from "./static-common-data";
import Cookies from "js-cookie";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getToken = () => {

  return Cookies.get(CookieKeys.ACCESS_TOKEN);
};
const getCurrentOrgId = () => {
  return Cookies.get(CookieKeys.CURRENT_ORG_ID);
};

const axiosAPIWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    "x-org-id": `${getCurrentOrgId()}`,
  },
});

axiosAPIWithAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Log the user out here
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosAPIWithAuth;
