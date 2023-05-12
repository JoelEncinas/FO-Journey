import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/name/";

const getCountries = (name) => {
  const request = axios.get(`${baseUrl}${name}`);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCountries,
};
