import axios from "axios";

const API_URL = "http://localhost:3001/gpus";

export const fetchGPUs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Eroore nel recupero delle GPU", error);
        return [];
    }
}

export const fetchGPUByID = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Errore nel recupero della GPU', error);
        return null;
    }
}