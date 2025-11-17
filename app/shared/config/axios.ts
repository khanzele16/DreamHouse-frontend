import axios from "axios";

const config = axios.create({
  baseURL: "https://api.dreamhouse05.com/api/",
});

export default config;