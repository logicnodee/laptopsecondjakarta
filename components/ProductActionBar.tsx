"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

type ProductActionBarProps = {
  product: {
    id: number | string;
    title: string;
    price: number;
    images?: { url: string }[];
  };
  waLink: string;
};

export default function ProductActionBar({ product, waLink }: ProductActionBarProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // 1. Add item to global cart
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images && product.images[0] ? product.images[0].url : "",
      quantity: 1,
    });

    // 2. Fly-to-cart animation
    const productImage = document.getElementById("main-product-image");
    const cartIcon = document.getElementById("navbar-cart-icon");

    if (productImage && cartIcon) {
      // Get coordinates
      const imgRect = productImage.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      // Create clone
      const clone = productImage.cloneNode(true) as HTMLElement;
      
      // Initial styles
      clone.style.position = "fixed";
      clone.style.top = `${imgRect.top}px`;
      clone.style.left = `${imgRect.left}px`;
      clone.style.width = `${imgRect.width}px`;
      clone.style.height = `${imgRect.height}px`;
      clone.style.zIndex = "9999";
      clone.style.transition = "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      clone.style.borderRadius = "8px";
      clone.style.pointerEvents = "none";
      
      // Remove any unwanted classes that might interfere
      clone.className = "";
      
      document.body.appendChild(clone);

      // Trigger animation next frame
      requestAnimationFrame(() => {
        clone.style.top = `${cartRect.top}px`;
        clone.style.left = `${cartRect.left}px`;
        clone.style.width = "20px";
        clone.style.height = "20px";
        clone.style.opacity = "0.2";
        clone.style.transform = "scale(0.1)";
      });

      // Cleanup clone after animation completes
      setTimeout(() => {
        if (document.body.contains(clone)) {
          document.body.removeChild(clone);
        }
      }, 600);
    }
  };

  return (
    <div className="fixed bottom-0 w-full max-w-[600px] bg-white border-t border-slate-200 p-2.5 flex flex-col gap-2 z-50 rounded-t-xl shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="flex gap-2 w-full">
        <button 
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-lg font-bold text-[13px] h-10 transition-colors"
        >
          + Keranjang
        </button>
        <Link href={`/checkout/${product.id}`} className="flex-1 flex items-center justify-center bg-[#2b2b2b] hover:bg-black text-white rounded-lg font-bold text-[13px] h-10 transition-colors">
          Beli Sekarang
        </Link>
      </div>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-[13px] transition-colors h-10">
        Konsultasi via WhatsApp
      </a>
    </div>
  );
}
