import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // cambia si usas un dominio o puerto distinto
});

export default api;
