"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

export default function ProductFilters({ basePath = "/products" }: { basePath?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current values from URL
  const currentMin = searchParams.get("min") || "";
  const currentMax = searchParams.get("max") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const [minPrice, setMinPrice] = useState(currentMin);
  const [maxPrice, setMaxPrice] = useState(currentMax);
  const [sortOrder, setSortOrder] = useState(currentSort);
  const applyFilters = (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) params.set("min", minPrice);
    else params.delete("min");

    if (maxPrice) params.set("max", maxPrice);
    else params.delete("max");

    params.set("sort", sortOrder);

    router.push(`${basePath}?${params.toString()}`);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("newest");
    router.push(basePath);
  };

  return (
    <div className="w-full">
      <form onSubmit={applyFilters} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
        
        {/* Rentang Harga */}
        <div className="flex flex-row items-center gap-2 flex-1 sm:flex-none">
          <div className="relative flex-1 sm:w-28">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-xs">Rp</span>
            <input 
              type="number" 
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="input pl-8 py-2 text-sm w-full"
            />
          </div>
          <span className="text-text-secondary">-</span>
          <div className="relative flex-1 sm:w-28">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-xs">Rp</span>
            <input 
              type="number" 
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input pl-8 py-2 text-sm w-full"
            />
          </div>
        </div>

        {/* Sortir */}
        <div className="flex items-center gap-2 flex-1 sm:flex-none">
          <select 
            className="input text-sm py-2 bg-white w-full sm:w-auto"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              // Auto-apply sort if screen is somewhat large
              if (window.innerWidth >= 640) {
                const params = new URLSearchParams(searchParams.toString());
                params.set("sort", e.target.value);
                router.push(`${basePath}?${params.toString()}`);
              }
            }}
          >
            <option value="newest">Terbaru</option>
            <option value="price_asc">Harga Termurah</option>
            <option value="price_desc">Harga Termahal</option>
          </select>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button type="submit" className="btn btn-primary py-2 text-sm flex-1 sm:flex-none whitespace-nowrap">Terapkan</button>
          {(currentMin || currentMax || currentSort !== "newest" || searchParams.has("brand") || searchParams.has("search")) && (
            <button type="button" onClick={clearFilters} className="btn btn-outline py-2 text-sm text-red-600 border-red-200 hover:bg-red-50 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
