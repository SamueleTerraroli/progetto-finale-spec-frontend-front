import { useParams } from "react-router-dom";
import { fetchGPUByID } from "../services/api";
import { useState, useEffect } from "react";
import type { GPU } from "../types/types";
import { Link } from "react-router-dom";

export default function DetailRecord() {
    const { id } = useParams();
    const numericId = id ? String(id) : "";
    const [gpu, setGpu] = useState<GPU | null>(null);

    useEffect(() => {
        const getGpu = async () => {
            try {
                const data = await fetchGPUByID(numericId);
                setGpu(data.gpu);
            } catch (error) {
                console.error('Errore nel recupero della GPU', error)
            }
        }
        getGpu();
    }, [numericId]);

    if (!gpu) return (
        <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
    );

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
                    Prezzo: <span className="font-normal">€{gpu.price}</span>
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    VRAM: <span className="font-normal">{gpu.vram} GB</span>
                </p>
                <hr className="my-2" />
                <p className="text-lg font-semibold text-gray-700 mt-2">
                    Categoria: <span className="font-normal">{gpu.category}</span>
                </p>

                {/* Descrizione */}
                <hr className="my-4" />
                <p className={`text-md ${gpu.description ? "" : "text-gray-500 italic"}`}>
                    {gpu.description ?? "Nessuna descrizione disponibile."}
                </p>

                {/* Bottoni */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                    <Link to="/list">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600 transition">
                            Torna alla lista
                        </button>
                    </Link>
                    <button className="px-6 py-3 border border-blue-500 text-blue-500 rounded-md text-lg font-semibold hover:bg-blue-500 hover:text-white transition">
                        Aggiungi ai preferiti
                    </button>
                </div>
            </div>
        </div>
    );


}