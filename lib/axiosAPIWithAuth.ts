import axios from "axios";
import { LocalStorageKeys } from "./static-common-data";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getToken = () => {
  return typeof localStorage !== "undefined"
    ? localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)
    : "";
};
const getCurrentOrgId = () => {
  if (typeof localStorage !== "undefined") {
    const getSelectedOrgId = localStorage.getItem(LocalStorageKeys.CURRENT_ORG_ID);
    return getSelectedOrgId ? getSelectedOrgId : "";
  } else {
    return "";
  }
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
