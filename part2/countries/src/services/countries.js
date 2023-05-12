import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";

const getCountries = () => {
  const request = axios.get(`${baseUrl}`);
  return request.then((response) => response.data);
};

const getWeather = async (city) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}`;

  const request = axios.get(`${weatherUrl}`);
  return await request
    .then((response) => response.data)
    .catch(() => {
      return "error";
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCountries,
  getWeather,
};
