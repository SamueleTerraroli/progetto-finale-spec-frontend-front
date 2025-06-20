import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { GPU } from "../types/types";

interface FavoriteContextType {
    favorites: GPU[];
    toggleFavorite: (gpu: GPU) => void;
    isFavorite: (gpuId: number) => boolean;
    isReady: boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<GPU[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
        setIsReady(true);
    }, []);


    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (gpu: GPU) => {
        setFavorites((prev) =>
            prev.find((f) => f.id === gpu.id)
                ? prev.filter((f) => f.id !== gpu.id)
                : [...prev, gpu]
        );
    };

    const isFavorite = (gpuId: number) => {
        return favorites.some((f) => f.id === gpuId);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite, isReady }}>
            {children}
        </FavoriteContext.Provider>

    );
}

export function useFavorites() {
    const context = useContext(FavoriteContext);
    if (!context) throw new Error("errore nel context");
    return context;
}