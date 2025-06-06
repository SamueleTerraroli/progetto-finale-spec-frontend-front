export type GPU = {
    id: number;
    title: string;
    category: string;
    brand: string;
    vram: number;
    clockSpeed: number;
    boostClock: number;
    cudaCores?: number;
    tdp: number;
    price: number;
};