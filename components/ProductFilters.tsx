"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current values from URL
  const currentMin = searchParams.get("min") || "";
  const currentMax = searchParams.get("max") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const [minPrice, setMinPrice] = useState(currentMin);
  const [maxPrice, setMaxPrice] = useState(currentMax);
  const [sortOrder, setSortOrder] = useState(currentSort);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const applyFilters = (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) params.set("min", minPrice);
    else params.delete("min");

    if (maxPrice) params.set("max", maxPrice);
    else params.delete("max");

    params.set("sort", sortOrder);

    router.push(`/products?${params.toString()}`);
    setIsMobileOpen(false);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("newest");
    router.push("/products");
    setIsMobileOpen(false);
  };

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden flex items-center gap-2 btn btn-outline py-2 px-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        <span className="text-sm font-medium">Filter & Urutkan</span>
      </button>

      {/* Desktop Toolbar & Mobile Dropdown */}
      <div className={`
        ${isMobileOpen ? 'flex' : 'hidden'} 
        lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-4 
        absolute lg:static top-full right-0 mt-2 lg:mt-0 
        bg-white lg:bg-transparent p-4 lg:p-0 
        shadow-xl lg:shadow-none border border-border lg:border-none rounded-xl lg:rounded-none
        z-50 min-w-[280px] lg:min-w-0
      `}>
        <form onSubmit={applyFilters} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 w-full">
          
          {/* Rentang Harga */}
          <div className="flex flex-row items-center gap-2">
            <div className="relative flex-1 lg:w-32">
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
            <div className="relative flex-1 lg:w-32">
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
          <div className="flex items-center gap-2">
            <select 
              className="input text-sm py-2 bg-white w-full lg:w-auto"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                // On desktop, auto-apply sort
                if (window.innerWidth >= 1024) {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("sort", e.target.value);
                  router.push(`/products?${params.toString()}`);
                }
              }}
            >
              <option value="newest">Terbaru</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>
          </div>

          <div className="flex gap-2 mt-2 lg:mt-0">
            <button type="submit" className="btn btn-primary py-2 text-sm flex-1 lg:flex-none whitespace-nowrap">Terapkan</button>
            {(currentMin || currentMax || currentSort !== "newest") && (
              <button type="button" onClick={clearFilters} className="btn btn-outline py-2 text-sm text-red-600 border-red-200 hover:bg-red-50 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
