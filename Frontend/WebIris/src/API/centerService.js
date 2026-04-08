import api from "./apiClient";

export const getCenters = async() => {
    try {
        const response = await api.get("/api/centers");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los centros médicos:", error);
        return [];
    }
};

export const createCenters = async(centersData) => {
    try {
        const response = await api.post("/api/centers", centersData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el centro médico:", error);
        return null;
    }
};