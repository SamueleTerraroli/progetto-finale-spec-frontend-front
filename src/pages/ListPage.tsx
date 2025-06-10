import { useEffect, useState, useMemo } from "react";
import { fetchGPUs } from "../services/api";
import type { GPU } from "../types/types";
import GPUCard from "../components/GPUCard";

export default function ListPage() {
    const [gpus, setGpus] = useState<GPU[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOption, setSortOption] = useState("prezzo-crescente"); //prezzo crescente di default


    const sortedAndFilteredGPUs = useMemo(() => {
        return [...gpus]
            .filter(gpu =>
                gpu.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
                (!selectedCategory || gpu.category === selectedCategory)
            )
            .sort((a, b) => {
                if (sortOption === "price-crescente") return a.price - b.price;
                if (sortOption === "price-decrescente") return b.price - a.price;
                if (sortOption === "vram-crescente") return a.vram - b.vram;
                if (sortOption === "vram-decrescente") return b.vram - a.vram;
                return 0;
            });
    }, [debouncedSearch, selectedCategory, sortOption, gpus]);

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

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // Ritardo di 500ms per evitare troppi aggiornamenti

        return () => clearTimeout(handler);
    }, [searchTerm]);

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
            {/* Dropdown di ordinamento */}
            <div className="flex justify-end mb-4">
                <label htmlFor="sortSelect" className="text-lg font-semibold mr-2">Ordina per:</label>
                <select
                    id="sortSelect"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border p-2 rounded-md"
                >
                    <option value="price-crescente">Prezzo crescente</option>
                    <option value="price-decrescente">Prezzo decrescente</option>
                    <option value="vram-crescente">VRAM crescente</option>
                    <option value="vram-decrescente">VRAM decrescente</option>
                </select>
            </div>


            {/* Grid per la lista delle GPU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedAndFilteredGPUs.map((gpu) => (
                    <GPUCard key={gpu.id} gpu={gpu} />
                ))}
            </div>
        </div>
    );

}