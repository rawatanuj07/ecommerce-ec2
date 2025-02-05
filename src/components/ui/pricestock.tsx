"use client";
import React, { ChangeEvent, useState } from "react";

interface SizeOption {
  size: string;
  price: string;
}

export default function Pricestock() {
  const sizes: SizeOption[] = [
    { size: "Small", price: "9000" },
    { size: "Medium", price: "15000" },
    { size: "Large", price: "12000" },
  ];
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = sizes.find(
      (size) => size.size === event.target.value
    );
    if (selectedOption) {
      setSelectedPrice(selectedOption.price);
    }
    // setSelectedPrice(event.target.value);
  };
  return (
    <div>
      <select className="mb-4 p-2 border rounded" onChange={handleSizeChange}>
        <option value="">Select a size</option>
        {sizes.map((sizeOption) => (
          <option key={sizeOption.size} value={sizeOption.size}>
            {sizeOption.size} - £{sizeOption.price}
          </option>
        ))}
      </select>
      <div className="text-xl font-semibold mb-4">£{selectedPrice}</div>
    </div>
  );
}
