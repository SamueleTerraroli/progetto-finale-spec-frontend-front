import { useEffect, useState, useMemo } from "react";
import { fetchGPUs } from "../services/api";
import type { GPU } from "../types/types";
import GPUCard from "../components/GPUCard";

export default function ListPage() {
    const [gpus, setGpus] = useState<GPU[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredGPUs = useMemo(() => {
        return gpus.filter(gpu =>
            gpu.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
            (!selectedCategory || gpu.category === selectedCategory)
        );
    }, [debouncedSearch, selectedCategory, gpus]);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(handler);

    }, [searchTerm])

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
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 w-full mx-auto">
                {/* Input di ricerca con larghezza dinamica */}
                <div className="w-full md:w-2/3">
                    <input
                        type="text"
                        placeholder="Cerca GPU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-2 rounded-md w-full"
                    />
                </div>
                {/* Div per raggruppare label e select */}
                <div className="flex flex-col md:flex-row items-center md:w-1/3 w-full gap-2">
                    <label htmlFor="categorySelect" className="text-lg font-semibold hidden md:block">Categoria:</label>
                    <select
                        id="categorySelect"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border p-2 rounded-md w-full"
                    >
                        <option value="">Tutte le categorie</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Budget Gaming">Budget Gaming</option>
                        <option value="Workstation">Workstation</option>
                    </select>
                </div>
            </div>

            {/* Grid per la lista delle GPU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGPUs.map((gpu) => (
                    <GPUCard key={gpu.id} gpu={gpu} />
                ))}
            </div>
        </div>
    );

}