import { useState, useEffect } from "react";
import { fetchGPUs } from "../services/api";
import type { GPU } from "../types/types";
import GpuComparisonCard from "../components/GpuComparisonCard";

export default function Comparator() {
    const [gpuList, setGpuList] = useState<GPU[]>([]);
    const [gpu1, setGpu1] = useState<GPU | null>(null);
    const [gpu2, setGpu2] = useState<GPU | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchGPUs();
            setGpuList(data);
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Confronto GPU</h1>

            <div className="flex justify-center gap-4 mb-6">
                <select
                    className="border p-2 rounded-lg"
                    aria-label="Seleziona la prima GPU"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const selectedGpu = gpuList.find(gpu => gpu.id === parseInt(e.target.value, 10)) ?? null;
                        setGpu1(selectedGpu);
                    }}
                >
                    <option value="">Seleziona una GPU</option>
                    {gpuList.map((gpu) => (
                        <option key={gpu.id} value={gpu.id}>{gpu.title}</option>
                    ))}
                </select>

                <select
                    className="border p-2 rounded-lg"
                    aria-label="Seleziona la seconda GPU"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const selectedGpu2 = gpuList.find(gpu => gpu.id === parseInt(e.target.value, 10)) ?? null;
                        setGpu2(selectedGpu2);
                    }}
                >
                    <option value="">Seleziona una GPU</option>
                    {gpuList.map((gpu) => (
                        <option key={gpu.id} value={gpu.id}>{gpu.title}</option>
                    ))}
                </select>
            </div>

            {gpu1 && gpu2 && (
                <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <GpuComparisonCard gpu={gpu1} otherGpu={gpu2} />
                    <GpuComparisonCard gpu={gpu2} otherGpu={gpu1} />
                </div>
            )}
        </div>
    );
}