import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Component/Navbar";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to sync inventory. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Curated Collection
          </h2>
          <div className="h-1.5 w-20 bg-indigo-600 rounded-full mt-4"></div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white border border-slate-200 rounded-3xl p-5"
              >
                <div className="bg-slate-200 h-52 rounded-2xl mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-3xl p-5 hover:border-indigo-200 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-300"
              >
                <div className="relative h-56 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-white mb-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-2 group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="flex flex-col grow">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                    {product.title}
                  </h3>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        Price
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
