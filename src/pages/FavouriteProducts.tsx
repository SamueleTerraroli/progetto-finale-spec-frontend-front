import { useFavorites } from "../context/FavoriteContext";
import GPUCard from "../components/GPUCard";

export default function FavouriteProducts() {
    const { favorites, isReady } = useFavorites();

    if (!isReady) return <p>Caricamento preferiti…</p>;



    if (favorites.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                Nessuna GPU nei preferiti.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {favorites.map((gpu) => (
                <GPUCard key={gpu.id} gpu={gpu} />
            ))}
        </div>
    );
}