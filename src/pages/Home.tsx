import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { Product } from "../types";

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Architectural Hoodie",
    price: 185,
    description: "Heavyweight 480GSM French Terry. Structured fit with dropped shoulders.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    category: "Outerwear"
  },
  {
    id: "2",
    name: "Technical Cargo V2",
    price: 240,
    description: "Water-resistant nylon-stretch blend. Modular pocket system.",
    image: "https://images.unsplash.com/photo-1624378439674-8a57ec57822b?q=80&w=800&auto=format&fit=crop",
    category: "Pants"
  },
  {
    id: "3",
    name: "Oversized 'Aether' Tee",
    price: 95,
    description: "Premium Peruvian cotton. High-ribbed collar. Minimal branding.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
    category: "Essentials"
  }
];

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper"
    >
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-ink pt-20">
        <div className="absolute inset-0 opacity-60">
           <img 
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop" 
            className="h-full w-full object-cover grayscale brightness-50"
            alt="Hero Background"
           />
        </div>
        
        <div className="container relative mx-auto flex h-full flex-col justify-end px-6 pb-32">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-fluid-huge font-bold tracking-tighter text-paper uppercase">
              Precision <br /> 
              <span className="text-paper/40">Essentials</span>
            </h1>
            <div className="mt-8 flex flex-col items-start gap-8 md:flex-row md:items-center">
              <p className="max-w-md text-lg text-paper/80 font-light leading-relaxed">
                Elevating everyday streetwear through architectural precision and sustainable luxury. Designed in London, crafted for the global archive.
              </p>
              <Link
                to="/shop"
                className="group flex items-center space-x-4 bg-paper px-10 py-5 text-xs font-bold uppercase tracking-widest text-ink hover:bg-paper/90 transition-all"
              >
                <span>Explore Drop 01</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 right-6 hidden md:block">
           <p className="text-[10px] text-paper/40 uppercase tracking-[0.3em] vertical-rl rotate-180">
             Collection 2026 / 01 — London Origin
           </p>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-ink/5 bg-canvas py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-8 md:flex-nowrap">
            <div className="flex items-center space-x-4">
              <Truck className="h-5 w-5 text-ink/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Global Express Delivery</span>
            </div>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="h-5 w-5 text-ink/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Lifetime Quality Guarantee</span>
            </div>
            <div className="flex items-center space-x-4">
              <RefreshCcw className="h-5 w-5 text-ink/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Archive Swap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 flex items-end justify-between">
            <h2 className="text-4xl font-bold tracking-tighter">New Arrivals</h2>
            <Link to="/shop" className="group flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:opacity-50">
              <span>View All</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {FEATURED_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-canvas">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-ink px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-paper">
                         {product.category}
                       </span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tight">{product.name}</h3>
                      <p className="mt-1 text-xs text-ink/50 uppercase tracking-widest">{product.category}</p>
                    </div>
                    <p className="text-sm font-bold tracking-tight">${product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle / Story */}
      <section className="bg-canvas py-32 overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <div className="relative">
                 <div className="aspect-[4/5] overflow-hidden bg-ink">
                    <img 
                      src="https://images.unsplash.com/photo-1510442221142-491410712211?q=80&w=1000&auto=format&fit=crop" 
                      alt="Aether Story" 
                      className="h-full w-full object-cover grayscale contrast-125"
                    />
                 </div>
                 <div className="absolute -bottom-12 -right-12 hidden md:block bg-paper p-12 shadow-2xl max-w-xs">
                    <p className="text-xs uppercase tracking-widest leading-relaxed font-medium italic">
                      "We don't follow trends. We deconstruct them and build something permanent."
                    </p>
                 </div>
              </div>
              <div className="space-y-8">
                 <h2 className="text-fluid-huge font-bold tracking-tighter uppercase opacity-10 leading-none lg:-ml-24">
                   Since <br /> 2026
                 </h2>
                 <div className="max-w-md">
                    <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">The Archive Philosophy</h3>
                    <p className="text-ink/60 leading-relaxed mb-6">
                       Aether was born out of a frustration with the disposable nature of modern fashion. We believe your wardrobe should follow the principles of architecture: structural integrity, meaningful aesthetics, and enduring value.
                    </p>
                    <Link
                      to="/about"
                      className="inline-block border-b-2 border-ink pb-1 text-xs font-bold uppercase tracking-widest hover:opacity-50"
                    >
                      Read Our Story
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-32 border-t border-ink/5">
        <div className="container mx-auto px-6">
           <div className="flex flex-col items-center text-center space-y-12">
              <div className="flex space-x-1">
                 {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-ink" />)}
              </div>
              <blockquote className="max-w-3xl text-3xl font-display font-medium tracking-tight uppercase leading-tight italic">
                "The attention to detail in the Architectural hoodie is unlike anything I've seen in luxury streetwear. The weight, the fit, the finish—it's perfect."
              </blockquote>
              <div className="flex flex-col items-center">
                 <span className="text-xs font-bold uppercase tracking-[0.2em]">Marcus Thorne</span>
                 <span className="text-[10px] text-ink/40 uppercase tracking-widest mt-1">Creative Director, NYC</span>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
}
