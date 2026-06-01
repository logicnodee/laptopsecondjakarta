"use client";

import { useState } from "react";

export default function ProductGallery({ images }: { images: { url: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="clean-card overflow-hidden h-64 sm:h-80 md:h-[500px] w-full relative bg-surface">
        <div className="flex items-center justify-center w-full h-full text-text-secondary font-medium">No Image</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="overflow-hidden aspect-square w-full relative bg-white border-y border-slate-100">
        <img 
          src={images[activeIndex].url} 
          alt={`Product image ${activeIndex + 1}`} 
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 px-4 lg:px-8 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-primary shadow-md opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
