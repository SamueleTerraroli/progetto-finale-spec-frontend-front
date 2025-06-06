import { useEffect, useState } from "react";
import { fetchGPUs } from "../services/api";
import type { GPU } from "../types/types";

export default function ListPage() {
    const [gpus, setGpus] = useState<GPU[]>([]);

    useEffect(() => {
        const getGPUs = async () => {
            try {
                const data = await fetchGPUs();
                setGpus(data);

            } catch (error) {
            }
        };
        getGPUs();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Lista GPU</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gpus.map((gpu) => (
                    <div key={gpu.id} className="border p-4 rounded-md bg-white shadow-md">
                        <strong className="block text-lg">{gpu.title}</strong>
                        <p className="text-sm text-gray-600">{gpu.brand} - {gpu.vram}GB VRAM</p>
                    </div>
                ))}
            </div>
        </div>
    );

}