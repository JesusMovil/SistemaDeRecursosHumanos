import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/rrhh-app"
});

export default api;