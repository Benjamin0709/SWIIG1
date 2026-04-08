import api from "./apiClient";

export const createUser = async (userData) => {
  try {
    const response = await api.post("/api/user", userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/api/user");   
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
};

export const editUser = async (id, updatedData) => { 
  try {
    const response = await api.put(`/api/user/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error al editar el usuario:", error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return null;
  }
};

export const getProfile = async (id) => {
  try {
    const response = await api.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return null;
  }
};

export const loginUserApi = async (loginData) => {
  try {
    const response = await api.post("/api/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
};

export const getVerifyUser = async () => {
  try {
    const response = await api.get("/api/verifyUser");
    return response.data;
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    return null;
  }
};
