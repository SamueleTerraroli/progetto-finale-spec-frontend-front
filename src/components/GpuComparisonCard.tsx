import type { GPU } from "../types/types";

interface Props {
    gpu: GPU;
    otherGpu: GPU;
}

export default function GpuComparisonCard({ gpu, otherGpu }: Props) {
    // --- Calcolo del rapporto prezzo e performance ---
    const isBetterPrice =
        (gpu.price ?? Infinity) < (otherGpu.price ?? Infinity);

    const performanceScore = (gpu.boostClock ?? 0) + (gpu.clockSpeed ?? 0) + (gpu.vram ?? 0);
    const otherPerformanceScore = (otherGpu.boostClock ?? 0) + (otherGpu.clockSpeed ?? 0) + (otherGpu.vram ?? 0);

    // Badge logici:
    // "Best Choice": se la GPU è più economica E ha un punteggio prestazionale maggiore.
    const isBestOverallChoice = isBetterPrice && (performanceScore > otherPerformanceScore);
    // "Best Budget Choice": se è migliore solo nel prezzo.
    const isBestBudgetChoice = isBetterPrice && (performanceScore <= otherPerformanceScore);
    // "Best Performance": se non è più economica ma ha un punteggio prestazionale superiore.
    const isBestPerformanceChoice = (!isBetterPrice) && (performanceScore > otherPerformanceScore);

    return (
        <div className={`container mx-auto p-6 relative ${isBestOverallChoice || isBestPerformanceChoice || isBestBudgetChoice ? "bg-blue-50" : "bg-white"} rounded-lg shadow-md`}>
            <div className="max-w-2xl mx-auto p-6">
                {/* Badge assegnati in modo esclusivo */}
                {isBestOverallChoice ? (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Best Choice
                    </span>
                ) : isBestBudgetChoice ? (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Best Budget Choice
                    </span>
                ) : isBestPerformanceChoice ? (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Best Performance
                    </span>
                ) : null}

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{gpu.title}</h1>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    {gpu.category}
                </span>

                {gpu.image ? (
                    <img
                        src={gpu.image}
                        alt={gpu.title}
                        className="w-full max-w-lg mx-auto my-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full max-w-lg mx-auto my-6 bg-gray-200 text-center py-10 rounded-lg">
                        <p className="text-gray-500">Immagine non disponibile</p>
                    </div>
                )}

                {/* Prezzo */}
                <p className={`text-lg font-semibold mt-2 ${(gpu.price ?? Infinity) < (otherGpu.price ?? Infinity) ? "text-green-600" : "text-red-600"}`}>
                    Prezzo: <span className="font-normal">€{gpu.price ?? "N/A"}</span>
                </p>

                <hr className="my-2" />
                {/* Per le prestazioni, se sono uguali o migliori, assegno verde */}
                <p className={`text-lg font-semibold mt-2 ${(gpu.vram ?? 0) >= (otherGpu.vram ?? 0) ? "text-green-600" : "text-red-600"}`}>
                    VRAM: <span className="font-normal">{gpu.vram} GB</span>
                </p>
                <hr className="my-2" />
                <p className={`text-lg font-semibold mt-2 ${((gpu.clockSpeed ?? 0) >= (otherGpu.clockSpeed ?? 0)) ? "text-green-600" : "text-red-600"}`}>
                    Clock Speed: <span className="font-normal">{gpu.clockSpeed ?? "N/A"} MHz</span>
                </p>
                <hr className="my-2" />
                <p className={`text-lg font-semibold mt-2 ${((gpu.boostClock ?? 0) >= (otherGpu.boostClock ?? 0)) ? "text-green-600" : "text-red-600"}`}>
                    Boost Clock: <span className="font-normal">{gpu.boostClock ?? "N/A"} MHz</span>
                </p>
                <hr className="my-2" />
                <p className={`text-lg font-semibold mt-2 ${((gpu.cudaCores ?? 0) >= (otherGpu.cudaCores ?? 0)) ? "text-green-600" : "text-red-600"}`}>
                    CUDA Cores: <span className="font-normal">{gpu.cudaCores ?? "N/A"}</span>
                </p>
                <hr className="my-2" />
                {/* Per il TDP, "minore è meglio" */}
                <p className={`text-lg font-semibold mt-2 ${(gpu.tdp ?? Infinity) <= (otherGpu.tdp ?? Infinity) ? "text-green-600" : "text-red-600"}`}>
                    TDP: <span className="font-normal">{gpu.tdp ?? "N/A"} W</span>
                </p>

                <hr className="my-4" />
                <p className={`text-md ${gpu.description ? "" : "text-gray-500 italic"}`}>
                    {gpu.description ?? "Nessuna descrizione disponibile."}
                </p>
            </div>
        </div>
    );
}