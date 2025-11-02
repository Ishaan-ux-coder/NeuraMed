import React, { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "fidget-cube", name: "Fidget Cube", price: 12.99, image: "https://placehold.co/300x220/d1c4e9/FFFFFF?text=Fidget+Cube" },
  { id: "infinity-spinner", name: "Infinity Spinner", price: 19.99, image: "https://placehold.co/300x220/e0f7fa/333333?text=Spinner" },
  { id: "aroma-candles", name: "Aroma Candles", price: 15.5, image: "https://placehold.co/300x220/fff3e0/333333?text=Aroma+Candles" },
  { id: "weighted-blanket", name: "Weighted Blanket", price: 59.0, image: "https://placehold.co/300x220/e1f5fe/333333?text=Weighted+Blanket" },
  { id: "mind-journal", name: "Mindfulness Journal", price: 9.99, image: "https://placehold.co/300x220/f3e8ff/333333?text=Mind+Journal" },
  { id: "tea-pack", name: "Herbal Tea Pack", price: 8.99, image: "https://placehold.co/300x220/e8f5e9/333333?text=Herbal+Tea" },
];

export default function ShopPage() {
  const [cart, setCart] = useState<Record<string, number>>({});

  function addToCart(p: Product) {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
  }

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-purple-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Calming Tools</h1>
          <div className="text-slate-700">Cart: <span className="font-semibold">{cartCount}</span></div>
        </div>
        <p className="text-slate-600 mb-10">Discover curated tools designed to help you relax, focus, and feel better daily.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow border border-purple-100 flex flex-col overflow-hidden">
              <div className="h-44 bg-gray-50 flex items-center justify-center">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-slate-800">{p.name}</h3>
                <p className="text-lg font-medium text-slate-700 mt-1">${p.price.toFixed(2)}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <button onClick={() => addToCart(p)} className="w-full px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Add to Cart</button>
                  <a href="#" className="w-full text-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
