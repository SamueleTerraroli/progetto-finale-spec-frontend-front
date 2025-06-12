import { useState, useEffect } from "react";
import { fetchGPUs } from "../services/api";
import type { GPU } from "../types/types";
import { Link } from "react-router-dom";

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

            {/* Selettore GPU */}
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

            {/* Layout affiancato per il confronto */}
            {gpu1 && gpu2 && (
                <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <GpuComparisonCard gpu={gpu1} />
                    <GpuComparisonCard gpu={gpu2} />
                </div>
            )}
        </div>
    );
}

function GpuComparisonCard({ gpu }: { gpu: GPU }) {

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">

                {/* Titolo e Badge Categoria */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{gpu.title}</h1>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    {gpu.category}
                </span>

                {/* Immagine con effetti visivi */}
                {gpu.image ? (
                    <img
                        src={gpu.image}
                        alt={gpu.title}
                        className="w-full max-w-lg mx-auto my-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="w-full max-w-lg mx-auto my-6 bg-gray-200 text-center py-10 rounded-lg">
                        <p className="text-gray-500">Immagine non disponibile</p>
                    </div>
                )}

                {/* Informazioni Tecniche */}
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    Prezzo: <span className="font-normal">€{gpu.price ?? "N/A"}</span>
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    VRAM: <span className="font-normal">{gpu.vram} GB</span>
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    Clock Speed: <span className="font-normal">{gpu.clockSpeed ?? "N/A"} MHz</span>
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    Boost Clock: <span className="font-normal">{gpu.boostClock ?? "N/A"} MHz</span>
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    CUDA Cores: <span className="font-normal">{gpu.cudaCores ?? "N/A"}</span>
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    TDP: <span className="font-normal">{gpu.tdp ?? "N/A"} W</span>
                </p>

                {/* Descrizione */}
                <hr className="my-4" />
                <p className={`text-md ${gpu.description ? "" : "text-gray-500 italic"}`}>
                    {gpu.description ?? "Nessuna descrizione disponibile."}
                </p>

                {/* Bottone */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">

                    <button className="px-6 py-3 border border-blue-500 text-blue-500 rounded-md text-lg font-semibold hover:bg-blue-500 hover:text-white transition">
                        Aggiungi ai preferiti
                    </button>
                </div>
            </div>
        </div>
    );


}