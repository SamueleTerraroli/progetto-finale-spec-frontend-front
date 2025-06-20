import React from "react";
import type { GPU } from "../types/types";
import { useFavorites } from "../context/FavoriteContext";

const GPUCard: React.FC<{ gpu: GPU }> = React.memo(({ gpu }) => {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className="relative border p-4 rounded-md bg-white shadow-md">
            <strong className="block text-lg">{gpu.title}</strong>
            <p className="text-sm text-gray-600">{gpu.brand} - {gpu.vram}GB VRAM</p>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(gpu);
                }}
                className={`absolute top-2 right-2 text-xl transition-transform duration-200 ${isFavorite(gpu.id) ? "scale-110 text-red-500" : "text-gray-400"
                    } hover:scale-110`}
            >
                {isFavorite(gpu.id) ? "❤️" : "🤍"}
            </button>
        </div>
    );
});

export default GPUCard;