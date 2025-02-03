"use client";
import React from "react";
import { Slider } from "@nextui-org/react";
import { useFilterStore } from "@/app/priceFilterStore";

export default function ProductFilter() {
  const { priceRange, setPriceRange } = useFilterStore();

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        className="max-w-4xl "
        formatOptions={{ style: "currency", currency: "USD" }}
        label="Select a budget"
        maxValue={1000}
        minValue={0}
        step={50}
        value={priceRange}
        onChange={(value) => {
          // Ensure value is a tuple [number, number]
          if (Array.isArray(value) && value.length === 2) {
            setPriceRange([value[0], value[1]] as [number, number]);
          }
        }}
        classNames={{
          filler: "bg-gradient-to-r mt-2 from-stone-400 to-stone-700",
          track: "h-2 w-full", // Apply gradient to filler
          thumb:
            "w-8 h-8 mt-2 bg-stone-600 rounded-full cursor-pointer transition-transform ease-in-out duration-300",
        }}
      />
      <p className="text-default-500 font-medium text-small">
        Selected budget:{" "}
        {Array.isArray(priceRange) &&
          priceRange.map((b) => `$${b}`).join(" – ")}
      </p>
    </div>
  );
}
