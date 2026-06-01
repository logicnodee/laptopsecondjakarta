"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

type ProductActionBarProps = {
  product: {
    id: number | string;
    title: string;
    price: number;
    stock: number;
    images?: { url: string }[];
  };
  waLink: string;
};

export default function ProductActionBar({ product, waLink }: ProductActionBarProps) {
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    
    // Check if adding this would exceed stock
    const existingItem = cartItems.find((i) => i.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    if (currentQuantity + quantity > product.stock) {
      alert(`Stok tidak mencukupi! Anda sudah memiliki ${currentQuantity} item ini di keranjang, sedangkan sisa stok hanya ${product.stock}.`);
      return;
    }
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images && product.images[0] ? product.images[0].url : "",
      quantity: quantity,
    });

    // Fly-to-cart animation
    const productImage = document.getElementById("main-product-image");
    const cartIcon = document.getElementById("navbar-cart-icon");

    if (productImage && cartIcon) {
      const imgRect = productImage.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
      const clone = productImage.cloneNode(true) as HTMLElement;
      
      clone.style.position = "fixed";
      clone.style.top = `${imgRect.top}px`;
      clone.style.left = `${imgRect.left}px`;
      clone.style.width = `${imgRect.width}px`;
      clone.style.height = `${imgRect.height}px`;
      clone.style.zIndex = "9999";
      clone.style.transition = "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      clone.style.borderRadius = "8px";
      clone.style.pointerEvents = "none";
      clone.className = "";
      
      document.body.appendChild(clone);

      requestAnimationFrame(() => {
        clone.style.top = `${cartRect.top}px`;
        clone.style.left = `${cartRect.left}px`;
        clone.style.width = "20px";
        clone.style.height = "20px";
        clone.style.opacity = "0.2";
        clone.style.transform = "scale(0.1)";
      });

      setTimeout(() => {
        if (document.body.contains(clone)) {
          document.body.removeChild(clone);
        }
      }, 600);
    }
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    
    const existingItem = cartItems.find((i) => i.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    if (currentQuantity + quantity <= product.stock) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0].url : "",
        quantity: quantity,
      });
    }
    
    router.push('/checkout');
  };

  return (
    <div className="fixed bottom-0 w-full max-w-[600px] bg-white border-t border-slate-200 p-2.5 flex flex-col gap-2 z-50 rounded-t-xl shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
      {product.stock > 1 && (
        <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-700">Jumlah Beli:</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 disabled:opacity-50"
            >
              -
            </button>
            <span className="font-bold text-slate-800 min-w-[20px] text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      )}
      
      <div className="flex gap-2 w-full">
        <button 
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-1 flex items-center justify-center border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-lg font-bold text-[13px] h-10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.stock <= 0 ? "Habis" : "+ Keranjang"}
        </button>
        <button 
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          className="flex-1 flex items-center justify-center bg-[#2b2b2b] hover:bg-black text-white rounded-lg font-bold text-[13px] h-10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Beli Sekarang
        </button>
      </div>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-[13px] transition-colors h-10">
        Konsultasi via WhatsApp
      </a>
    </div>
  );
}
