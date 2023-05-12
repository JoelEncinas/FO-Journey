import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";

const getCountries = () => {
  const request = axios.get(`${baseUrl}`);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCountries,
};
