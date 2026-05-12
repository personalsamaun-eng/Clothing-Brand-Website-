import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, ChevronRight, Share, Heart, Plus, Minus, Info } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../App";
import { cn } from "../lib/utils";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Architectural Hoodie",
    price: 185,
    description: "Our signature heavyweight hoodie. Deconstructed seams and an architectural hood structure define this essential archive piece.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    category: "Outerwear",
    details: [
      "480GSM Heavyweight French Terry",
      "Dropped shoulders",
      "Deconstructed seam detailing",
      "Tonal embroidery on left cuff",
      "100% Organic Cotton",
      "Pre-shrunk for permanent fit"
    ],
    specs: [
      { label: "Origin", value: "London, UK" },
      { label: "Material", value: "Organic French Terry" },
      { label: "Edition", value: "01/26 Limited Arkiv" }
    ]
  },
  // Adding more for internal link checks
  { id: "2", name: "Technical Cargo V2", price: 240, description: "...", image: "https://images.unsplash.com/photo-1624378439674-8a57ec57822b?q=80&w=800&auto=format&fit=crop", category: "Pants" },
  { id: "3", name: "Oversized 'Aether' Tee", price: 95, description: "...", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop", category: "Essentials" }
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"details" | "specs">("details");
  const [showError, setShowError] = useState(false);

  if (!product) return <div className="py-48 text-center uppercase tracking-widest font-bold">Product not found.</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-32"
    >
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
          <Link to="/" className="hover:opacity-100">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:opacity-100">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="opacity-100 italic">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Gallery - Vertical stacked for desktop, horizontal for mobile */}
          <div className="space-y-4">
             <div className="aspect-[3/4] overflow-hidden bg-canvas">
               <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] overflow-hidden bg-canvas">
                   <img src="https://images.unsplash.com/photo-1574015974293-817f0efebb1b?q=80&w=800&auto=format&fit=crop" className="h-full w-full object-cover grayscale opacity-80" />
                </div>
                <div className="aspect-[3/4] overflow-hidden bg-canvas">
                   <img src="https://images.unsplash.com/photo-1574015976535-37380905183d?q=80&w=800&auto=format&fit=crop" className="h-full w-full object-cover grayscale opacity-80" />
                </div>
             </div>
             <div className="mt-12 hidden lg:block">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-40">Composition & Maintenance</p>
                <p className="text-xs text-ink/60 leading-relaxed max-w-md">
                   Machine wash cold with similar colors. Dry flat. Do not bleach. This garment is designed to age purposefully with wear.
                </p>
             </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="flex items-start justify-between">
               <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 mb-2 block italic">Collection 01 / ARKV</span>
                  <h1 className="text-4xl font-bold uppercase tracking-tighter sm:text-5xl">{product.name}</h1>
               </div>
               <div className="flex space-x-2">
                  <button className="p-2 border border-ink/10 rounded-full hover:bg-canvas transition-colors"><Share className="h-4 w-4" /></button>
                  <button className="p-2 border border-ink/10 rounded-full hover:bg-canvas transition-colors"><Heart className="h-4 w-4" /></button>
               </div>
            </div>

            <p className="mt-6 text-2xl font-bold tracking-tighter">${product.price}</p>
            <p className="mt-8 text-sm text-ink/70 leading-relaxed max-w-lg">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mt-12">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Select Size</span>
                  <button className="text-[10px] font-bold uppercase tracking-widest border-b border-ink/20 hover:border-ink">Size Guide</button>
               </div>
               <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-12 w-16 border text-xs font-bold transition-all",
                        selectedSize === size 
                          ? "bg-ink border-ink text-paper" 
                          : "border-ink/10 hover:border-ink"
                      )}
                    >
                      {size}
                    </button>
                  ))}
               </div>
               <AnimatePresence>
                 {showError && (
                   <motion.p
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="mt-4 text-[10px] font-bold uppercase tracking-widest text-red-500"
                   >
                     Please select a size to continue
                   </motion.p>
                 )}
               </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="mt-12 space-y-4">
               <button
                 onClick={handleAddToCart}
                 className="group relative flex w-full items-center justify-center bg-ink py-6 text-xs font-bold uppercase tracking-[0.3em] text-paper transition-all hover:bg-ink/90 active:scale-[0.98]"
               >
                 <ShoppingBag className="mr-4 h-4 w-4" />
                 <span>Add to Registry</span>
               </button>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-canvas p-4">
                     <Plus className="h-3 w-3 opacity-40" />
                     <span className="text-[8px] font-bold uppercase tracking-widest">Klarna Available</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-canvas p-4">
                     <Plus className="h-3 w-3 opacity-40" />
                     <span className="text-[8px] font-bold uppercase tracking-widest">Global Express</span>
                  </div>
               </div>
            </div>

            {/* Tabs */}
            <div className="mt-16 border-t border-ink/10">
               <div className="flex space-x-8 border-b border-ink/5">
                  <button 
                    onClick={() => setActiveTab("details")}
                    className={cn(
                      "py-4 text-[10px] font-bold uppercase tracking-widest relative transition-all",
                      activeTab === "details" ? "opacity-100" : "opacity-30 hover:opacity-100"
                    )}
                  >
                    Details
                    {activeTab === "details" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 h-[2px] w-full bg-ink" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab("specs")}
                    className={cn(
                      "py-4 text-[10px] font-bold uppercase tracking-widest relative transition-all",
                      activeTab === "specs" ? "opacity-100" : "opacity-30 hover:opacity-100"
                    )}
                  >
                    Specs
                    {activeTab === "specs" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 h-[2px] w-full bg-ink" />}
                  </button>
               </div>
               <div className="py-8">
                  {activeTab === "details" ? (
                    <ul className="space-y-4">
                       {product.details?.map((d, i) => (
                         <li key={i} className="flex items-center space-x-4 text-xs uppercase tracking-widest font-medium text-ink/60">
                           <div className="h-1 w-1 bg-ink/20 rounded-full" />
                           <span>{d}</span>
                         </li>
                       ))}
                    </ul>
                  ) : (
                    <div className="space-y-6">
                       {product.specs?.map((s, i) => (
                         <div key={i} className="flex justify-between border-b border-ink/5 pb-2">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">{s.label}</span>
                           <span className="text-[10px] font-bold uppercase tracking-widest">{s.value}</span>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
            </div>

            {/* Trust Info */}
            <div className="mt-8 flex items-start space-x-4 border border-ink/5 p-6 bg-canvas/30 rounded-lg">
               <Info className="h-4 w-4 text-ink/40 mt-1 shrink-0" />
               <p className="text-[10px] text-ink/60 leading-relaxed uppercase tracking-widest">
                 Complimentary shipping on all archive orders above $300. Returns accepted within 14 days of delivery.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart */}
      <div className="fixed bottom-0 left-0 z-50 w-full lg:hidden border-t border-ink/10 bg-paper/90 backdrop-blur-md p-6">
          <div className="flex items-center justify-between gap-4">
             <div className="shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Total</p>
                <p className="text-xl font-bold tracking-tighter">${product.price}</p>
             </div>
             <button
               onClick={handleAddToCart}
               className="flex-1 bg-ink py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-paper active:scale-95 transition-transform"
             >
               Add to Bag
             </button>
          </div>
      </div>
    </motion.div>
  );
}
