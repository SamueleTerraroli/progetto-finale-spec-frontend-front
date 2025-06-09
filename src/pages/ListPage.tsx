import { useEffect, useState } from "react";
import { fetchGPUs } from "../services/api";
import type { GPU } from "../types/types";

export default function ListPage() {
    const [gpus, setGpus] = useState<GPU[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredGPUs = gpus.filter(gpu =>
        gpu.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (!selectedCategory || gpu.category.toLowerCase() === selectedCategory.toLowerCase())
    );
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
            <input
                type="text"
                placeholder="Cerca GPU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded-md w-full mb-4"
            />

            <label htmlFor="categorySelect">Categoria:</label>
            <select
                id="categorySelect"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border p-2 rounded-md w-full mb-4"
            >
                <option value="">Tutte le categorie</option>
                <option value="Gaming">Gaming</option>
                <option value="Budget Gaming">Budget Gaming</option>
                <option value="Workstation">Workstation</option>
            </select>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGPUs.map((gpu) => (
                    <div key={gpu.id} className="border p-4 rounded-md bg-white shadow-md">
                        <strong className="block text-lg">{gpu.title}</strong>
                        <p className="text-sm text-gray-600">{gpu.brand} - {gpu.vram}GB VRAM</p>
                    </div>
                ))}
            </div>
        </div>
    );

}