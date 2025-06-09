import React from "react";
import type { GPU } from "../types/types";

const GPUCard: React.FC<{ gpu: GPU }> = React.memo(({ gpu }) => (
    <div className="border p-4 rounded-md bg-white shadow-md">
        <strong className="block text-lg">{gpu.title}</strong>
        <p className="text-sm text-gray-600">{gpu.brand} - {gpu.vram}GB VRAM</p>
    </div>
));


export default GPUCard;