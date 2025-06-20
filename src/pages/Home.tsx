import { useFavorites } from "../context/FavoriteContext";
import GPUCard from "../components/GPUCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGPUs } from "../services/api";
import type { GPU } from "../types/types";

export default function Home() {
    const { favorites, isReady } = useFavorites();
    const [allGpus, setAllGpus] = useState<GPU[]>([]);
    const [recommended, setRecommended] = useState<GPU[]>([]);

    useEffect(() => {
        const loadGpus = async () => {
            try {
                const data = await fetchGPUs();
                setAllGpus(data);

                // Estrai 3 casuali
                const shuffled = [...data].sort(() => 0.5 - Math.random());
                setRecommended(shuffled.slice(0, 3));
            } catch (err) {
                console.error("Errore nel caricamento delle GPU:", err);
            }
        };

        loadGpus();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">

            {/* HERO */}
            <section className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Benvenuto su GPU Store 🚀</h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Confronta schede grafiche, salva i tuoi modelli preferiti e trova la GPU perfetta per ogni esigenza.
                </p>
            </section>

            {/* STATISTICHE */}
            <section className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mb-12 justify-center">
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold text-blue-600">{allGpus.length}</p>
                    <p className="text-gray-600 text-sm">GPU disponibili</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold text-red-500">{favorites.length}</p>
                    <p className="text-gray-600 text-sm">Preferiti salvati</p>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-3xl font-bold text-purple-500">Oggi</p>
                    <p className="text-gray-600 text-sm">Ultimo aggiornamento</p>
                </div>
            </section>

            {/* CONSIGLIATE */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Consigliate per te</h2>
                {recommended.length === 0 ? (
                    <p className="text-gray-500">Caricamento consigliate...</p>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {recommended.map((gpu) => (
                            <div key={gpu.id} className="min-w-[300px] flex-shrink-0">
                                <GPUCard gpu={gpu} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* PREFERITI */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800"> Le tue GPU preferite</h2>
                    {favorites.length > 0 && (
                        <Link
                            to="/favourites"
                            className="text-sm text-blue-500 hover:underline transition"
                        >
                            Vai alla pagina preferiti
                        </Link>
                    )}
                </div>

                {!isReady ? (
                    <p className="text-gray-500">Caricamento preferiti...</p>
                ) : favorites.length === 0 ? (
                    <p className="text-gray-600 italic">
                        Nessuna GPU salvata.{" "}
                        <Link to="/list" className="text-blue-500 underline">Sfoglia ora</Link>
                    </p>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {favorites.map((gpu) => (
                            <div key={gpu.id} className="min-w-[300px] flex-shrink-0">
                                <GPUCard gpu={gpu} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* GUIDA */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">📘 Come funziona</h2>
                <div className="space-y-2 text-gray-700">
                    <p>🔍 Cerca o esplora le GPU disponibili</p>
                    <p>❤️ Aggiungi ai preferiti quelle che ti colpiscono</p>
                    <p>⚖️ Vai nella sezione “Comparator” per confrontare le prestazioni</p>
                    <p>🎯 Scegli la tua scheda ideale!</p>
                </div>
            </section>

            {/* FEEDBACK */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">🗣️ Dicono di noi</h2>
                <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4">
                    “Grazie a GPU Store ho trovato la scheda perfetta per il mio budget in pochi clic.” – <span className="not-italic font-semibold">Luca</span>
                </blockquote>
            </section>

            {/* CTA */}
            <section className="text-center">
                <Link
                    to="/list"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                    Esplora tutte le GPU
                </Link>
            </section>
        </div>
    );
}