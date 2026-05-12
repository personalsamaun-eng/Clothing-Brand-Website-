import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, ChevronDown, LayoutGrid, List } from "lucide-react";
import { Product } from "../types";
import { cn } from "../lib/utils";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Architectural Hoodie",
    price: 185,
    description: "Heavyweight 480GSM French Terry. Structured fit.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    category: "Outerwear"
  },
  {
    id: "2",
    name: "Technical Cargo V2",
    price: 240,
    description: "Water-resistant nylon-stretch blend.",
    image: "https://images.unsplash.com/photo-1624378439674-8a57ec57822b?q=80&w=800&auto=format&fit=crop",
    category: "Pants"
  },
  {
    id: "3",
    name: "Oversized 'Aether' Tee",
    price: 95,
    description: "Premium Peruvian cotton. Minimal branding.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
    category: "Essentials"
  },
  {
    id: "4",
    name: "Linen Utility Shirt",
    price: 160,
    description: "Technical linen blend for summer breathability.",
    image: "https://images.unsplash.com/photo-1598033106887-894709d97f3b?q=80&w=800&auto=format&fit=crop",
    category: "Shirts"
  },
  {
    id: "5",
    name: "Graphic 'System' Sweat",
    price: 120,
    description: "Screen-printed schematic graphics on ultra-soft cotton.",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop",
    category: "Basics"
  },
  {
    id: "6",
    name: "Shell Anorak",
    price: 320,
    description: "3-Layer seam-sealed hardshell for all-terrain utility.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    category: "Outerwear"
  }
];

const CATEGORIES = ["All", "Outerwear", "Pants", "Essentials", "Shirts", "Basics"];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="container mx-auto px-6">
        {/* Collection Header */}
        <div className="mb-24 flex flex-col items-center text-center">
            <h1 className="text-fluid-huge font-bold tracking-tighter opacity-10">Archive</h1>
            <div className="mt-[-2rem] md:mt-[-4rem]">
               <h2 className="text-5xl font-bold uppercase tracking-tighter">Collection 01/26</h2>
               <p className="mt-4 text-xs uppercase tracking-[0.3em] font-medium text-ink/40 italic">
                 Explore the architectural foundation of our 2026 drop.
               </p>
            </div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-24 z-40 mb-12 flex flex-col justify-between border-b border-ink/10 bg-paper py-4 md:flex-row md:items-center">
          <div className="flex space-x-8 overflow-x-auto no-scrollbar pb-4 md:pb-0">
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={cn(
                   "text-[10px] uppercase tracking-widest transition-all",
                   activeCategory === cat ? "font-black opacity-100" : "font-medium opacity-40 hover:opacity-100"
                 )}
               >
                 {cat}
               </button>
             ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4 md:mt-0 md:border-none md:pt-0">
             <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-50">
                   <Filter className="h-3 w-3" />
                   <span>Filters</span>
                </button>
                <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-50">
                   <span>Sort By</span>
                   <ChevronDown className="h-3 w-3" />
                </button>
             </div>
             
             <div className="flex items-center space-x-4 border-l border-ink/10 pl-6">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={cn("p-1", viewMode === "grid" ? "opacity-100" : "opacity-20 hover:opacity-100")}
                >
                   <LayoutGrid className="h-4 w-4" />
                </button>
                <button 
                   onClick={() => setViewMode("list")}
                   className={cn("p-1", viewMode === "list" ? "opacity-100" : "opacity-20 hover:opacity-100")}
                >
                   <List className="h-4 w-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={cn(
          "grid gap-x-4 gap-y-12",
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn("group cursor-pointer", viewMode === "list" && "flex flex-col md:flex-row gap-8 items-center")}
            >
              <Link to={`/product/${product.id}`} className={cn(viewMode === "list" ? "w-full md:w-1/3" : "block")}>
                <div className="relative aspect-[3/4] overflow-hidden bg-canvas">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {index < 2 && (
                    <div className="absolute top-4 right-4">
                       <span className="bg-ink px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-paper italic">
                         Exclusive
                       </span>
                    </div>
                  )}
                </div>
              </Link>
              
              <div className={cn("mt-6", viewMode === "list" ? "flex-1 mt-0" : "")}>
                <div className={cn("flex justify-between items-start", viewMode === "list" && "mb-4")}>
                   <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-lg font-bold uppercase tracking-tight hover:opacity-50 transition-opacity">
                           {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-xs text-ink/40 uppercase tracking-widest font-medium italic">
                        {product.category} — Edition 01
                      </p>
                   </div>
                   <p className="text-lg font-bold tracking-tight">${product.price}</p>
                </div>
                
                {viewMode === "list" && (
                   <>
                    <p className="text-sm text-ink/60 mb-6 max-w-xl">{product.description}</p>
                    <Link to={`/product/${product.id}`} className="inline-block bg-ink text-paper px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-90">
                      Quick View
                    </Link>
                   </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
           <div className="py-48 text-center">
              <p className="text-xs font-bold uppercase tracking-widest opacity-20 italic">No items found in this collection.</p>
           </div>
        )}

        {/* Newsletter In-grid teaser */}
        <div className="mt-32 border-y border-ink/5 py-12 flex flex-col items-center justify-between gap-8 md:flex-row">
           <div className="max-w-md text-center md:text-left">
              <h3 className="text-xl font-bold uppercase tracking-tighter">Never miss a drop</h3>
              <p className="text-[10px] uppercase tracking-widest text-ink/40 mt-1">Get notifications for limited archive releases.</p>
           </div>
           <Link to="/lookbook" className="bg-ink text-paper px-12 py-4 text-[10px] font-bold uppercase tracking-widest hover:opacity-90">
              Join the Registry
           </Link>
        </div>
      </div>
    </motion.div>
  );
}
