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