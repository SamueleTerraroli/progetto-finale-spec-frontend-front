import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { GPU } from "../types/types";

interface FavoriteContextType {
    favorites: GPU[];
    toggleFavorite: (gpu: GPU) => void;
    isFavorite: (gpuId: number) => boolean;
    isReady: boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<GPU[]>([]);
    const [isReady, setIsReady] = useState(false);

    //  Carica i preferiti da localStorage al primo rendering
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setFavorites(parsed);
            } catch {
                console.warn("Dati preferiti non validi nel localStorage");
            }
        }
        setIsReady(true);
    }, []);

    //  Salva ogni volta che cambia
    useEffect(() => {
        if (isReady) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites, isReady]);

    const toggleFavorite = (gpu: GPU) => {
        setFavorites((prev) => {
            const isAlreadyFav = prev.some((item) => item.id === gpu.id);
            const updated = isAlreadyFav
                ? prev.filter((item) => item.id !== gpu.id)
                : [...prev, gpu];
            return updated;
        });
    };

    const isFavorite = (gpuId: number) => favorites.some((gpu) => gpu.id === gpuId);

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite, isReady }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoriteProvider");
    }
    return context;
};